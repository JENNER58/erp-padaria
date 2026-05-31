import { supabase } from '../lib/supabase'
import { criarNotificacaoAutomatica } from './notificacaoService'

export async function fecharMes() {
  try {
    const mesAtual = new Date().toISOString().slice(0,7)

    const { data: producoes } = await supabase
      .from('producao')
      .select('*')
      .eq('mes_referencia', mesAtual)

    const { data: financeiro } = await supabase
      .from('financeiro')
      .select('*')

    const { data: pix } = await supabase
      .from('pix_pagamentos')
      .select('*')

    const faturamento = producoes?.reduce(
      (total,item) => total + Number(item.valor_total || 0),
      0
    ) || 0

    const receitas = financeiro?.filter(i => i.tipo==='entrada')
      .reduce((t,i)=> t + Number(i.valor||0),0) || 0

    const despesas = financeiro?.filter(i => i.tipo==='saida')
      .reduce((t,i)=> t + Number(i.valor||0),0) || 0

    const saldo = receitas - despesas
    const pixPendentes = pix?.filter(i=>i.status==='pendente').length || 0

    // Verifica se já existe fechamento para o mês
    const { data: jaFechado } = await supabase
      .from('fechamentos')
      .select('*')
      .eq('mes_referencia', mesAtual)

    if(jaFechado?.length > 0){
      return { sucesso:false, mensagem:'Já existe um fechamento para este mês.', total:faturamento }
    }

    // Salva o fechamento
    const { data, error } = await supabase
      .from('fechamentos')
      .insert([{
        mes_referencia: mesAtual,
        faturamento,
        receitas,
        despesas,
        saldo,
        pix_pendentes: pixPendentes
      }])
      .select()

    if(error){ console.log(error); return { sucesso:false, mensagem:'Erro ao salvar fechamento.', total: faturamento } }

    // Cria notificação automática
    await criarNotificacaoAutomatica(
      `📊 Fechamento realizado

Mês: ${mesAtual}
Faturamento: R$ ${faturamento.toFixed(2)}
Receitas: R$ ${receitas.toFixed(2)}
Despesas: R$ ${despesas.toFixed(2)}
Saldo: R$ ${saldo.toFixed(2)}
PIX Pendentes: ${pixPendentes}`
    )

    return { sucesso:true, total:faturamento, mensagem:'Fechamento realizado com sucesso!' }

  } catch(error){
    console.log(error)
    return { sucesso:false, mensagem:'Erro inesperado ao fechar mês.', total:0 }
  }
}

export async function listarFechamentos(){
  const { data, error } = await supabase
    .from('fechamentos')
    .select('*')
    .order('criado_em',{ascending:false})
  if(error) { console.log(error); return [] }
  return data
}