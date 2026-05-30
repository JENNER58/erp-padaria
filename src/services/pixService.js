import { supabase } from '../lib/supabase'

export async function salvarPix(dados) {

  const { data, error } = await supabase
    .from('pix_pagamentos')
    .insert([dados])

  if (error) {
    console.log(error)
    return null
  }

  return data
}

export async function listarPix() {

  const { data, error } = await supabase
    .from('pix_pagamentos')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.log(error)
    return []
  }

  return data
}