import { supabase } from '../lib/supabase'

export async function salvarNotificacao(dados) {

  const { data, error } = await supabase
    .from('notificacoes')
    .insert([dados])

  if(error) {

    console.log(
      'ERRO salvarNotificacao:',
      error
    )

    return null

  }

  console.log(
    'NOTIFICACAO MANUAL SALVA:',
    data
  )

  return data

}

export async function listarNotificacoes() {

  const { data, error } = await supabase
    .from('notificacoes')
    .select('*')
    .order('id', { ascending:false })

  if(error) {

    console.log(
      'ERRO listarNotificacoes:',
      error
    )

    return []

  }

  return data

}

export async function criarNotificacaoAutomatica(
  mensagem,
  telefone = 'Sistema'
) {

  const { data, error } = await supabase
    .from('notificacoes')
    .insert([
      {
        telefone,
        mensagem,
        status: 'pendente'
      }
    ])

  if(error) {

    console.log(
      'ERRO NOTIFICACAO:',
      error
    )

    alert(
      'Erro ao salvar notificação'
    )

    return null

  }

  console.log(
    'NOTIFICACAO AUTOMATICA SALVA:',
    data
  )

  return data

}