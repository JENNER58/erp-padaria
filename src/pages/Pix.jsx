import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import { listarPix } from '../services/pixService'
import { fecharMes } from '../services/fechamentoService'

export default function Pix() {

  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(false)

  async function carregarPix() {
    const dados = await listarPix()
    if (dados) setLista(dados)
  }

  useEffect(() => {
    carregarPix()
  }, [])

  async function executarFechamento() {
    setLoading(true)
    try {
      const resultado = await fecharMes()

      if (!resultado) {
        alert('Erro inesperado ao fechar mês.')
        setLoading(false)
        return
      }

      if (resultado.sucesso) {
        alert(`Cobrança criada: R$ ${resultado.total.toFixed(2)}`)
        await carregarPix()
      } else {
        alert(resultado.mensagem)
      }

    } catch (error) {
      console.log(error)
      alert('Erro ao processar fechamento.')
    }
    setLoading(false)
  }

  return (
    <Layout>

      <h1 style={titulo}>
        💳 PIX
      </h1>

      <button
        onClick={executarFechamento}
        style={botao}
        disabled={loading}
      >
        {loading ? 'Processando...' : '📦 Fechar Mês'}
      </button>

      <div style={card}>

        <h2>
          Cobranças Geradas
        </h2>

        {lista.length === 0 && <p>Nenhuma cobrança encontrada.</p>}

        {lista.map(item => (
          <div key={item.id} style={linha}>

            <div>
              <strong>{item.descricao}</strong>
              <p>R$ {Number(item.valor).toFixed(2)}</p>
            </div>

            <div>
              <p>Status: <strong>{item.status}</strong></p>
              <p>Venc: {item.vencimento}</p>
            </div>

          </div>
        ))}

      </div>

    </Layout>
  )
}

const titulo = { color:'#fff', marginBottom:'20px' }

const botao = {
  background:'#2563eb',
  color:'#fff',
  border:'none',
  padding:'14px 20px',
  borderRadius:'10px',
  cursor:'pointer',
  marginBottom:'20px'
}

const card = {
  background:'#1e293b',
  padding:'25px',
  borderRadius:'20px',
  color:'#fff'
}

const linha = {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  background:'#0f172a',
  padding:'15px',
  borderRadius:'10px',
  marginTop:'10px'
}