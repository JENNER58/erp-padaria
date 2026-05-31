import { supabase } from '../lib/supabase'

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

export async function salvarTransacao(dados) {

  const { data, error } = await supabase
    .from('financeiro')
    .insert([dados])

  if(error) {
    console.log(error)
    return null
  }

  return data
}

export async function calcularResumo() {

  const { data, error } = await supabase
    .from('financeiro')
    .select('*')

  if(error) {

    console.log(error)

    return {
      receita:0,
      despesa:0,
      saldo:0
    }

  }

  let receita = 0
  let despesa = 0

  data.forEach(item => {

    if(item.tipo === 'entrada') {

      receita += Number(
        item.valor || 0
      )

    }

    if(item.tipo === 'saida') {

      despesa += Number(
        item.valor || 0
      )

    }

  })

  return {

    receita,

    despesa,

    saldo:
      receita - despesa

  }

}