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

    const { data: financeiro } =
      await supabase
        .from('financeiro')
        .select('*')

    const { data: notificacoes } =
      await supabase
        .from('notificacoes')
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

    const receitas =
      financeiro
        ?.filter(
          item =>
            item.tipo === 'entrada'
        )
        .reduce(
          (total,item) =>
            total + Number(item.valor || 0),
          0
        ) || 0

    const despesas =
      financeiro
        ?.filter(
          item =>
            item.tipo === 'saida'
        )
        .reduce(
          (total,item) =>
            total + Number(item.valor || 0),
          0
        ) || 0

    const saldo =
      receitas - despesas

    return {

      faturamento,

      producaoTotal,

      usuarios:
        usuarios?.length || 0,

      pixPendentes,

      receitas,

      despesas,

      saldo,

      producoes:
        producoes || [],

      financeiro:
        financeiro || [],

      pix:
        pix || [],

      notificacoes:
        notificacoes || []

    }

  } catch(error) {

    console.log(error)

    return {

      faturamento:0,
      producaoTotal:0,
      usuarios:0,
      pixPendentes:0,
      receitas:0,
      despesas:0,
      saldo:0,

      producoes:[],
      financeiro:[],
      pix:[],
      notificacoes:[]

    }

  }

}