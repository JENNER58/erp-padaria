import { supabase } from "../lib/supabase";

export async function carregarDashboard() {

  try {

    //----------------------------
    // PRODUÇÃO
    //----------------------------

    const { data: producao } = await supabase
      .from("producao")
      .select("*");

    //----------------------------
    // PIX
    //----------------------------

    const { data: pix } = await supabase
      .from("pix_pagamentos")
      .select("*");

    //----------------------------
    // FINANCEIRO
    //----------------------------

    const { data: financeiro } = await supabase
      .from("financeiro")
      .select("*");

    //----------------------------
    // NOTIFICAÇÕES
    //----------------------------

    const { data: notificacoes } = await supabase
      .from("notificacoes")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);

    //----------------------------
    // TOTAL PRODUÇÃO
    //----------------------------

    const totalProduzido =
      (producao || []).reduce(
        (total, item) =>
          total + Number(item.quantidade || 0),
        0
      );

    //----------------------------
    // RECEITA
    //----------------------------

    const receitaMes =
      (financeiro || [])
        .filter(i => i.tipo === "entrada")
        .reduce(
          (total, item) =>
            total + Number(item.valor || 0),
          0
        );

    //----------------------------
    // PIX PENDENTES
    //----------------------------

    const pixPendentes =
      (pix || []).filter(
        i => i.status === "pendente"
      ).length;

    //----------------------------
    // PIX PAGOS
    //----------------------------

    const pixRecebidos =
      (pix || []).filter(
        i => i.status === "pago"
      ).length;

    return {

      totalProduzido,

      receitaMes,

      pixPendentes,

      pixRecebidos,

      producao,

      financeiro,

      pix,

      notificacoes

    };

  } catch (erro) {

    console.log(erro);

    return {

      totalProduzido: 0,

      receitaMes: 0,

      pixPendentes: 0,

      pixRecebidos: 0,

      producao: [],

      financeiro: [],

      pix: [],

      notificacoes: []

    };

  }

}