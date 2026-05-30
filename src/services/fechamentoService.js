import { supabase } from '../lib/supabase'

export async function fecharMes() {

  try {

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        sucesso: false,
        mensagem: 'Usuário não autenticado'
      }
    }

    const hoje = new Date()

    const mesReferencia =
      `${hoje.getFullYear()}-${String(
        hoje.getMonth() + 1
      ).padStart(2, '0')}`

    // VERIFICA SE JÁ EXISTE COBRANÇA

    const {
      data: cobrancasExistentes,
      error: erroBusca
    } = await supabase
      .from('pix_pagamentos')
      .select('id, usuario_id, mes_referencia')
      .eq('usuario_id', user.id)
      .eq('mes_referencia', mesReferencia)

    if (erroBusca) {
      throw erroBusca
    }

    if (
      cobrancasExistentes &&
      cobrancasExistentes.length > 0
    ) {

      return {
        sucesso: false,
        mensagem:
          'Já existe uma cobrança para este mês.'
      }

    }

    // BUSCA PRODUÇÕES DO MÊS

    const {
      data: producoes,
      error: erroProducao
    } = await supabase
      .from('producao')
      .select('*')
      .eq('usuario_id', user.id)
      .eq('mes_referencia', mesReferencia)

    if (erroProducao) {
      throw erroProducao
    }

    if (!producoes || producoes.length === 0) {

      return {
        sucesso: false,
        mensagem:
          'Nenhuma produção encontrada.'
      }

    }

    // SOMA TOTAL

    const total = producoes.reduce(
      (acc, item) =>
        acc + Number(item.valor_total),
      0
    )

    // VENCIMENTO +7 DIAS

    const vencimento = new Date()

    vencimento.setDate(
      vencimento.getDate() + 7
    )

    // CRIA COBRANÇA

    const {
      error: erroInsert
    } = await supabase
      .from('pix_pagamentos')
      .insert([{
        descricao:
          `Produção ${mesReferencia}`,

        valor: total,

        status: 'pendente',

        usuario_id: user.id,

        vencimento:
          vencimento
            .toISOString()
            .split('T')[0],

        mes_referencia:
          mesReferencia
      }])

    if (erroInsert) {
      throw erroInsert
    }

    // MARCA PRODUÇÕES

    await supabase
      .from('producao')
      .update({
        status_pagamento: 'fechado'
      })
      .eq('usuario_id', user.id)
      .eq('mes_referencia', mesReferencia)

    return {
      sucesso: true,
      total
    }

  } catch (error) {

    console.error(error)

    return {
      sucesso: false,
      mensagem:
        error.message ||
        'Erro ao fechar mês'
    }

  }

}