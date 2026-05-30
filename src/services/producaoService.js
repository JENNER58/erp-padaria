import { supabase } from '../lib/supabase'

export async function salvarProducao(dados) {

  const { data, error } = await supabase
    .from('producao')
    .insert([dados])

  if(error) {
    console.log(error)
    return null
  }

  return data
}

export async function listarProducoes() {

  const { data, error } = await supabase
    .from('producao')
    .select('*')
    .order('id', { ascending:false })

  if(error) {
    console.log(error)
    return []
  }

  return data
}