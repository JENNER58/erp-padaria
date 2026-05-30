import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'

export default function Financeiro() {

  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState('entrada')
  const [valor, setValor] = useState('')
  const [lancamentos, setLancamentos] = useState([])

  async function carregarLancamentos() {

    const { data, error } = await supabase
      .from('financeiro')
      .select('*')
      .order('id', { ascending: false })

    if (!error) {
      setLancamentos(data)
    }

  }

  async function salvarLancamento() {

    if (!descricao || !valor) {

      alert('Preencha todos os campos')

      return

    }

    const { error } = await supabase
      .from('financeiro')
      .insert([
        {
          descricao,
          tipo,
          valor: Number(valor),
          status: 'pendente'
        }
      ])

    if (error) {

      alert(error.message)

      return

    }

    alert('✅ Registro financeiro salvo')

    setDescricao('')
    setValor('')

    carregarLancamentos()

  }

  useEffect(() => {

    carregarLancamentos()

  }, [])

  return (

    <Layout>

      <h1 style={titulo}>
        💰 Financeiro
      </h1>

      <div style={card}>

        <h2>
          Novo Lançamento
        </h2>

        <input
          placeholder='Descrição'
          value={descricao}
          onChange={(e) =>
            setDescricao(e.target.value)
          }
          style={input}
        />

        <select
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value)
          }
          style={input}
        >
          <option value='entrada'>
            Entrada
          </option>

          <option value='saida'>
            Saída
          </option>
        </select>

        <input
          type='number'
          placeholder='Valor'
          value={valor}
          onChange={(e) =>
            setValor(e.target.value)
          }
          style={input}
        />

        <button
          onClick={salvarLancamento}
          style={botao}
        >
          Salvar
        </button>

      </div>

      <div style={card}>

        <h2>
          Lançamentos
        </h2>

        {lancamentos.map((item) => (

          <div
            key={item.id}
            style={linha}
          >

            <strong>
              {item.descricao}
            </strong>

            <span>
              {item.tipo}
            </span>

            <span>
              R$ {item.valor}
            </span>

            <span>
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </Layout>

  )

}

const titulo = {

  marginBottom:'30px',

  color:'#fff'

}

const card = {

  background:'#1e293b',

  padding:'25px',

  borderRadius:'20px',

  marginBottom:'20px',

  display:'flex',

  flexDirection:'column',

  gap:'15px',

  color:'#fff'

}

const input = {

  padding:'12px',

  borderRadius:'10px',

  border:'none'

}

const botao = {

  background:'#16a34a',

  color:'#fff',

  border:'none',

  padding:'12px',

  borderRadius:'10px',

  cursor:'pointer'

}

const linha = {

  display:'flex',

  justifyContent:'space-between',

  background:'#0f172a',

  padding:'12px',

  borderRadius:'10px',

  marginBottom:'10px'

}