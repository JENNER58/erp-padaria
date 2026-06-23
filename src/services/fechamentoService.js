import { supabase } from '../lib/supabase'
import { criarNotificacaoAutomatica } from './notificacaoService'

export async function fecharMes() {

  try {

    const mesAtual =
      new Date().toISOString().slice(0,7)

    //---------------------------------------------------
    // PRODUÇÃO
    //---------------------------------------------------

    const { data: producoes } =
      await supabase
        .from('producao')
        .select('*')
        .eq('mes_referencia', mesAtual)

    //---------------------------------------------------
    // FINANCEIRO
    //---------------------------------------------------

    const { data: financeiro } =
      await supabase
        .from('financeiro')
        .select('*')

    //---------------------------------------------------
    // PIX
    //---------------------------------------------------

    const { data: pix } =
      await supabase
        .from('pix_pagamentos')
        .select('*')

    //---------------------------------------------------
    // TOTAIS
    //---------------------------------------------------

    const faturamento =
      producoes?.reduce(
        (total,item)=>
          total + Number(item.valor_total || 0),
        0
      ) || 0

    const receitas =
      financeiro
        ?.filter(i=>i.tipo==="entrada")
        .reduce(
          (t,i)=>t+Number(i.valor||0),
          0
        ) || 0

    const despesas =
      financeiro
        ?.filter(i=>i.tipo==="saida")
        .reduce(
          (t,i)=>t+Number(i.valor||0),
          0
        ) || 0

    const saldo =
      receitas-despesas

    const pixPendentes =
      pix
        ?.filter(i=>i.status==="pendente")
        .length || 0

    //---------------------------------------------------
    // SALVA FECHAMENTO
    //---------------------------------------------------

    const {
      data: fechamento,
      error: erroFechamento
    } =
      await supabase
        .from("fechamentos")
        .insert([{

          mes_referencia:
            mesAtual,

          faturamento,

          receitas,

          despesas,

          saldo,

          pix_pendentes:
            pixPendentes

        }])
        .select()
        .single()

    if (erroFechamento) {

      console.log(erroFechamento)

      return null

    }

    //---------------------------------------------------
    // VERIFICA MENSALIDADE
    //---------------------------------------------------

    const {
      data: mensalidadeExistente
    } =
      await supabase
        .from("mensalidades")
        .select("*")
        .eq("competencia",mesAtual)
        .maybeSingle()

    //---------------------------------------------------
    // CRIA MENSALIDADE
    //---------------------------------------------------

    if (!mensalidadeExistente) {

      const valorMensalidade = 125

      await supabase
        .from("mensalidades")
        .insert([{

          competencia:
            mesAtual,

          descricao:
            `Produção ${mesAtual}`,

          valor:
            valorMensalidade,

          vencimento:
            new Date().toISOString().slice(0,10),

          status:
            "aberta"

        }])

    }

    //---------------------------------------------------
    // NOTIFICAÇÃO
    //---------------------------------------------------

    await criarNotificacaoAutomatica(

`📊 Fechamento realizado

Mês: ${mesAtual}

Faturamento:
R$ ${faturamento.toFixed(2)}

Receitas:
R$ ${receitas.toFixed(2)}

Despesas:
R$ ${despesas.toFixed(2)}

Saldo:
R$ ${saldo.toFixed(2)}

PIX Pendentes:
${pixPendentes}`

    )

    return fechamento

  }

  catch(error){

    console.log(error)

    return null

  }

}

export async function listarFechamentos(){

  const {
    data,
    error
  } =
    await supabase
      .from("fechamentos")
      .select("*")
      .order(
        "criado_em",
        {
          ascending:false
        }
      )

  if(error){

    console.log(error)

    return []

  }

  return data

}