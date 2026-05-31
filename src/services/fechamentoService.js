import { supabase } from '../lib/supabase'

export async function fecharMes() {

  try {

    const mesAtual =
      new Date()
        .toISOString()
        .slice(0,7)

    const { data: producoes } =
      await supabase
        .from('producao')
        .select('*')
        .eq('mes_referencia', mesAtual)

    const totalProduzido =
      producoes?.reduce(
        (total, item) =>
          total + Number(item.valor_total || 0),
        0
      ) || 0

    return {
      sucesso: true,
      mes: mesAtual,
      totalProduzido
    }

  } catch(error) {

    console.log(error)

    return {
      sucesso: false
    }

  }

}