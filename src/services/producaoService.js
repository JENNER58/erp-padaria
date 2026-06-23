import { supabase } from '../lib/supabase'

export async function salvarProducao(dados) {

  const competencia =
    new Date().toISOString().slice(0, 7)

  const { data, error } = await supabase
    .from('producao')
    .insert([
      {
        produto: dados.produto,
        quantidade: Number(dados.quantidade),
        valor_unitario: Number(dados.valor_unitario),
        valor_total: Number(dados.valor_total),
        competencia: competencia,
        observacao: dados.observacao || null
      }
    ])
    .select()

  if (error) {
    console.error(error)
    return null
  }

  return data[0]
}

export async function listarProducoes() {

  const { data, error } = await supabase
    .from('producao')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}
