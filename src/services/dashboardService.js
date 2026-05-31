import { supabase } from '../lib/supabase'

export async function carregarDashboard() {

  try {

    const mesAtual =
      new Date()
        .toISOString()
        .slice(0,7)

    const { data: producoes } =
      await supabase
        .from('producao')
        .select('*')
        .eq(
          'mes_referencia',
          mesAtual
        )

    const { data: pix } =
      await supabase
        .from('pix_pagamentos')
        .select('*')

    const { data: usuarios } =
      await supabase
        .from('profiles')
        .select('*')

    const faturamento =
      producoes?.reduce(
        (total,item) =>
          total + Number(item.valor_total || 0),
        0
      ) || 0

    const producaoTotal =
      producoes?.reduce(
        (total,item) =>
          total + Number(item.quantidade || 0),
        0
      ) || 0

    const pixPendentes =
      pix?.filter(
        item =>
          item.status === 'pendente'
      ).length || 0

    return {

      faturamento,

      producaoTotal,

      usuarios:
        usuarios?.length || 0,

      pixPendentes

    }

  } catch(error) {

    console.log(error)

    return {

      faturamento:0,
      producaoTotal:0,
      usuarios:0,
      pixPendentes:0

    }

  }

}