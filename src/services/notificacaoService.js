import { supabase } from '../lib/supabase'

export async function salvarNotificacao(dados) {

  const { data, error } = await supabase
    .from('notificacoes')
    .insert([dados])

  if(error) {
    console.log(error)
    return null
  }

  return data
}

export async function listarNotificacoes() {

  const { data, error } = await supabase
    .from('notificacoes')
    .select('*')
    .order('id', { ascending:false })

  if(error) {
    console.log(error)
    return []
  }

  return data
}