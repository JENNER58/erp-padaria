import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import {
  salvarProducao,
  listarProducoes
} from '../services/producaoService'

import { criarNotificacaoAutomatica } from '../services/notificacaoService'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function Producao() {

  const [tipoPao, setTipoPao] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [valorUnitario, setValorUnitario] = useState('')

  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(false)

  async function carregarProducoes() {

    const dados = await listarProducoes()

    if (dados) {
      setLista(dados)
    }

  }

  useEffect(() => {

    carregarProducoes()

  }, [])

  async function salvar() {

    if (!tipoPao || !quantidade || !valorUnitario) {

      alert('Preencha todos os campos')
      return

    }

    setLoading(true)

    const valorTotal =
      Number(quantidade) *
      Number(valorUnitario)

    await salvarProducao({

      tipo_pao: tipoPao,
      quantidade: Number(quantidade),
      valor_unitario: Number(valorUnitario),
      valor_total: valorTotal

    })

    await criarNotificacaoAutomatica(
`🏭 Produção registrada

Tipo: ${tipoPao}
Quantidade: ${quantidade}
Valor Total: R$ ${valorTotal.toFixed(2)}`
    )

    setTipoPao('')
    setQuantidade('')
    setValorUnitario('')

    await carregarProducoes()

    setLoading(false)

  }

  function gerarPDF() {

    const pdf = new jsPDF()

    pdf.setFontSize(20)

    pdf.text(
      'ERP Padaria',
      14,
      20
    )

    pdf.setFontSize(12)

    pdf.text(
      'Relatório de Produção',
      14,
      30
    )

    pdf.text(
      `Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
      14,
      40
    )

    const totalGeral =
      lista.reduce(
        (acc, item) =>
          acc + Number(item.valor_total || 0),
        0
      )

    autoTable(pdf, {

      startY: 55,

      head: [[
        'Tipo de Pão',
        'Quantidade',
        'Valor Total'
      ]],

      body: lista.map(item => [

        item.tipo_pao,

        item.quantidade,

        `R$ ${Number(item.valor_total).toFixed(2)}`

      ])

    })

    pdf.text(
      `Total Geral: R$ ${totalGeral.toFixed(2)}`,
      14,
      pdf.lastAutoTable.finalY + 15
    )

    pdf.save(
      'Relatorio-Producao.pdf'
    )

  }

  return (

    <Layout>

      <h1 style={titulo}>
        🏭 Produção
      </h1>

      <div style={card}>

        <input
          type="text"
          placeholder="Tipo do pão"
          value={tipoPao}
          onChange={(e)=>setTipoPao(e.target.value)}
          style={input}
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e)=>setQuantidade(e.target.value)}
          style={input}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Valor Unitário"
          value={valorUnitario}
          onChange={(e)=>setValorUnitario(e.target.value)}
          style={input}
        />

        <button
          onClick={salvar}
          style={botao}
          disabled={loading}
        >
          {loading
            ? 'Salvando...'
            : 'Salvar Produção'}
        </button>

      </div>

      <button
        style={botaoPdf}
        onClick={gerarPDF}
      >
        📄 Gerar Relatório PDF
      </button>

      <div style={listaCard}>

        <h2>
          📋 Produções Cadastradas
        </h2>

        {
          lista.length === 0 &&
          <p>Nenhuma produção cadastrada.</p>
        }

        {
          lista.map(item => (

            <div
              key={item.id}
              style={linha}
            >

              <span>
                🍞 {item.tipo_pao}
              </span>

              <span>
                Qtd: {item.quantidade}
              </span>

              <span>
                R$ {Number(item.valor_total).toFixed(2)}
              </span>

            </div>

          ))
        }

      </div>

    </Layout>

  )

}

const titulo = {
  color:'#fff',
  marginBottom:'20px'
}

const card = {
  background:'#1e293b',
  padding:'25px',
  borderRadius:'20px',
  display:'flex',
  flexDirection:'column',
  gap:'15px',
  maxWidth:'500px'
}

const input = {
  padding:'14px',
  borderRadius:'10px',
  border:'none',
  outline:'none'
}

const botao = {
  background:'#16a34a',
  color:'#fff',
  border:'none',
  padding:'14px',
  borderRadius:'10px',
  cursor:'pointer',
  fontWeight:'bold'
}

const botaoPdf = {
  background:'#2563eb',
  color:'#fff',
  border:'none',
  padding:'14px',
  borderRadius:'10px',
  cursor:'pointer',
  marginTop:'20px',
  marginBottom:'20px'
}

const listaCard = {
  marginTop:'20px',
  background:'#1e293b',
  padding:'25px',
  borderRadius:'20px',
  color:'#fff'
}

const linha = {
  display:'flex',
  justifyContent:'space-between',
  padding:'12px',
  marginTop:'10px',
  background:'#0f172a',
  borderRadius:'10px'
}