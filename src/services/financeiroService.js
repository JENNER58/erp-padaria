import { supabase } from '../lib/supabase'

export async function salvarFinanceiro(dados) {

  const { data, error } = await supabase
    .from('financeiro')
    .insert([dados])

  if(error) {
    console.log(error)
    return null
  }

  return data
}

export async function listarFinanceiro() {

  const { data, error } = await supabase
    .from('financeiro')
    .select('*')
    .order('id', { ascending:false })

  if(error) {
    console.log(error)
    return []
  }

  return data
}