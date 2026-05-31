import { supabase } from '../lib/supabase'

export async function fecharMes() {

  try {

    const mesAtual =
      new Date()
        .toISOString()
        .slice(0,7)

    const { data: producoes } =
      await supabase
        .from('producao')
        .select('*')
        .eq('mes_referencia', mesAtual)

    const { data: financeiro } =
      await supabase
        .from('financeiro')
        .select('*')

    const { data: pix } =
      await supabase
        .from('pix_pagamentos')
        .select('*')

    const faturamento =
      producoes?.reduce(
        (total,item) =>
          total + Number(item.valor_total || 0),
        0
      ) || 0

    const receitas =
      financeiro
        ?.filter(
          item => item.tipo === 'entrada'
        )
        .reduce(
          (total,item) =>
            total + Number(item.valor || 0),
          0
        ) || 0

    const despesas =
      financeiro
        ?.filter(
          item => item.tipo === 'saida'
        )
        .reduce(
          (total,item) =>
            total + Number(item.valor || 0),
          0
        ) || 0

    const saldo =
      receitas - despesas

    const pixPendentes =
      pix?.filter(
        item => item.status === 'pendente'
      ).length || 0

    const { data, error } =
      await supabase
        .from('fechamentos')
        .insert([{

          mes_referencia: mesAtual,

          faturamento,

          receitas,

          despesas,

          saldo,

          pix_pendentes:
            pixPendentes

        }])
        .select()

    if(error) {

      console.log(error)

      return null

    }

    return data[0]

  } catch(error) {

    console.log(error)

    return null

  }

}

export async function listarFechamentos() {

  const { data, error } =
    await supabase
      .from('fechamentos')
      .select('*')
      .order(
        'criado_em',
        { ascending:false }
      )

  if(error) {

    console.log(error)

    return []

  }

  return data

}