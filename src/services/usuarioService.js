import { supabase } from '../lib/supabase'

export async function salvarUsuario(dados) {

  const { data, error } = await supabase
    .from('usuarios')
    .insert([dados])

  if(error) {
    console.log(error)
    return null
  }

  return data
}

export async function listarUsuarios() {

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('id', { ascending:false })

  if(error) {
    console.log(error)
    return []
  }

  return data
}