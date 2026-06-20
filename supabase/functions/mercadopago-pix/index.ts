import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {

    const { mensalidade_id } = await req.json();

    if (!mensalidade_id) {
      return Response.json(
        {
          erro: "mensalidade_id é obrigatório"
        },
        { status: 400 }
      );
    }

    const accessToken = Deno.env.get("MP_ACCESS_TOKEN");
    const appUrl = Deno.env.get("APP_URL");
    const serviceRole = Deno.env.get("SERVICE_ROLE_KEY");

    if (!accessToken || !appUrl || !serviceRole) {
      return Response.json(
        {
          erro: "Secrets não configurados"
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      appUrl,
      serviceRole
    );

    //--------------------------------------------------
    // BUSCA A MENSALIDADE
    //--------------------------------------------------

    const {
      data: mensalidade,
      error: erroMensalidade
    } = await supabase
      .from("mensalidades")
      .select("*")
      .eq("id", mensalidade_id)
      .single();

    if (erroMensalidade || !mensalidade) {
      return Response.json(
        {
          erro: "Mensalidade não encontrada",
          detalhes: erroMensalidade
        },
        { status: 404 }
      );
    }

    //--------------------------------------------------
    // JÁ POSSUI PIX
    //--------------------------------------------------

    if (mensalidade.pix_pagamento_id) {
      return Response.json(
        {
          erro: "Esta mensalidade já possui um PIX gerado."
        },
        {
          status: 400
        }
      );
    }

    //--------------------------------------------------
    // CRIA PAGAMENTO PIX
    //--------------------------------------------------

    const mpResponse = await fetch(
      "https://api.mercadopago.com/v1/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": crypto.randomUUID()
        },
        body: JSON.stringify({
          transaction_amount: Number(mensalidade.valor),

          description:
            mensalidade.descricao ??
            `Mensalidade ${mensalidade.competencia}`,

          payment_method_id: "pix",

          payer: {
            email: "jenner@gmail.com"
          }
        })
      }
    );

    const mp = await mpResponse.json();

    if (!mpResponse.ok) {
      return Response.json(
        {
          erro_mercadopago: true,
          detalhes: mp
        },
        {
          status: mpResponse.status
        }
      );
    }

    //--------------------------------------------------
    // QR CODE
    //--------------------------------------------------

    const transaction =
      mp.point_of_interaction?.transaction_data;

    if (!transaction) {
      return Response.json(
        {
          erro: "Mercado Pago não retornou o QR Code.",
          detalhes: mp
        },
        {
          status: 500
        }
      );
    }

    const qrCode =
      transaction.qr_code;

    const ticketUrl =
      transaction.ticket_url;

    //--------------------------------------------------
    // SALVA PIX
    //--------------------------------------------------

    const {
      data: pix,
      error: erroPix
    } = await supabase
      .from("pix_pagamentos")
      .insert({
        descricao: mensalidade.descricao,

        valor: mensalidade.valor,

        status: "pendente",

        codigo_pix: qrCode,

        qr_code: qrCode,

        codigo_pix_copia_cola: qrCode,

        ticket_url: ticketUrl,

        mercadopago_id: String(mp.id),

        usuario_id: mensalidade.usuario_id,

        mes_referencia: mensalidade.competencia,

        mensalidade_id: mensalidade.id
      })
      .select()
      .single();

    if (erroPix) {
      return Response.json(
        {
          erro_banco: true,
          detalhes: erroPix
        },
        {
          status: 500
        }
      );
    }

    //--------------------------------------------------
    // ATUALIZA MENSALIDADE
    //--------------------------------------------------

    const { error: erroAtualizacao } =
      await supabase
        .from("mensalidades")
        .update({
          pix_pagamento_id: pix.id,

          status: "pendente",

          atualizado_em: new Date().toISOString()
        })
        .eq(
          "id",
          mensalidade.id
        );

    if (erroAtualizacao) {
      return Response.json(
        {
          erro: "PIX criado, porém não foi possível atualizar a mensalidade.",
          detalhes: erroAtualizacao
        },
        {
          status: 500
        }
      );
    }

    //--------------------------------------------------
    // RETORNO
    //--------------------------------------------------

    return Response.json({
      sucesso: true,

      mensalidade,

      pix
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        erro: true,
        mensagem:
          error instanceof Error
            ? error.message
            : String(error)
      },
      {
        status: 500
      }
    );

  }
});
