import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    const paymentId =
      body?.data?.id ||
      body?.id;

    if (!paymentId) {
      return Response.json({
        ok: true,
        mensagem: "Sem payment_id",
      });
    }

    const accessToken =
      Deno.env.get("MP_ACCESS_TOKEN");

    const appUrl =
      Deno.env.get("APP_URL");

    const serviceRole =
      Deno.env.get("SERVICE_ROLE_KEY");

    if (
      !accessToken ||
      !appUrl ||
      !serviceRole
    ) {
      return Response.json(
        {
          erro: "Secrets não configurados",
        },
        {
          status: 500,
        },
      );
    }

    const supabase = createClient(
      appUrl,
      serviceRole,
    );

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const payment =
      await mpResponse.json();

    if (!mpResponse.ok) {
      return Response.json(
        {
          erro: "Erro Mercado Pago",
          detalhes: payment,
        },
        {
          status: 500,
        },
      );
    }

    //--------------------------------------------------
    // PAGAMENTO APROVADO
    //--------------------------------------------------

    if (payment.status === "approved") {

      const { data: pix, error: erroPix } =
        await supabase
          .from("pix_pagamentos")
          .update({
            status: "pago",
            data_pagamento:
              payment.date_approved ??
              new Date().toISOString(),
          })
          .eq(
            "mercadopago_id",
            String(payment.id),
          )
          .select()
          .single();

      if (erroPix) {
        return Response.json(
          {
            erro_banco: true,
            detalhes: erroPix,
          },
          {
            status: 500,
          },
        );
      }

      if (pix?.mensalidade_id) {

        const { error: erroMensalidade } =
          await supabase
            .from("mensalidades")
            .update({
              status: "paga",
              atualizado_em:
                new Date().toISOString(),
            })
            .eq(
              "id",
              pix.mensalidade_id,
            );

        if (erroMensalidade) {
          return Response.json(
            {
              erro: "Erro ao atualizar mensalidade.",
              detalhes: erroMensalidade,
            },
            {
              status: 500,
            },
          );
        }

      }

    }

    //--------------------------------------------------
    // PAGAMENTO CANCELADO
    //--------------------------------------------------

    if (payment.status === "cancelled") {

      await supabase
        .from("pix_pagamentos")
        .update({
          status: "cancelado",
        })
        .eq(
          "mercadopago_id",
          String(payment.id),
        );

    }

    //--------------------------------------------------
    // RETORNO
    //--------------------------------------------------

    return Response.json({
      sucesso: true,
      payment_id: payment.id,
      status: payment.status,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        erro: true,
        mensagem:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      },
    );

  }
});
