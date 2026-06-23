
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import { listarPix } from '../services/pixService'
import { fecharMes } from '../services/fechamentoService'
import { listarProducoes } from '../services/producaoService'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function Pix() {

  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(false)

  async function carregarPix() {

    const dados = await listarPix()

    if (dados) {
      setLista(dados)
    }

  }

  useEffect(() => {
    carregarPix()
  }, [])

  async function executarFechamento() {

    setLoading(true)

    try {

      const resultado = await fecharMes()

      if (!resultado) {
        alert('Erro ao realizar fechamento.')
        setLoading(false)
        return
      }

      alert('Fechamento realizado com sucesso!')

      await carregarPix()

    } catch (error) {

      console.log(error)

      alert('Erro ao processar fechamento.')

    }

    setLoading(false)

  }

  async function gerarPDFPix() {

  const pdf = new jsPDF()

  const producoes = await listarProducoes()

  const mesReferencia =
    lista[0]?.mes_referencia || null

  const totalUnidades =
    (producoes || [])
      .filter(
        item =>
          item.mes_referencia === mesReferencia
      )
      .reduce(
        (total, item) =>
          total + Number(item.quantidade || 0),
        0
      )

  const totalPago =
    lista
      .filter(
        item =>
          String(item.status || '').toLowerCase() === 'pago'
      )
      .reduce(
        (total, item) =>
          total + Number(item.valor || 0),
        0
      )

  const totalPendente =
    lista
      .filter(
        item =>
          String(item.status || '').toLowerCase() === 'pendente'
      )
      .reduce(
        (total, item) =>
          total + Number(item.valor || 0),
        0
      )

  const valorTotal =
    lista.reduce(
      (total, item) =>
        total + Number(item.valor || 0),
      0
    )

  pdf.setFontSize(20)
  pdf.text('ERP Padaria', 14, 20)

  pdf.setFontSize(12)
  pdf.text('Relatório Financeiro PIX', 14, 32)

  pdf.text(
    `Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
    14,
    42
  )

  autoTable(pdf, {
    startY: 55,

    head: [[
      'Descrição',
      'Unidades Produzidas',
      'Valor',
      'Status',
      'Vencimento'
    ]],

    body: lista.map(item => ([

      item.descricao || '',

      totalUnidades,

      `R$ ${Number(item.valor || 0).toFixed(2)}`,

      item.status || '',

      item.vencimento || ''

    ]))
  })

  const posY =
    (pdf.lastAutoTable?.finalY || 70) + 15

  pdf.text(
    `Total de Cobranças: ${lista.length}`,
    14,
    posY
  )

  pdf.text(
    `Total Pago: R$ ${totalPago.toFixed(2)}`,
    14,
    posY + 10
  )

  pdf.text(
    `Total Pendente: R$ ${totalPendente.toFixed(2)}`,
    14,
    posY + 20
  )

  pdf.text(
    `Valor Total: R$ ${valorTotal.toFixed(2)}`,
    14,
    posY + 30
  )

  pdf.save(
    `Relatorio-PIX-${new Date().toISOString().slice(0, 10)}.pdf`
  )
}

  return (

    <Layout>

      <h1 style={titulo}>
        💳 PIX
      </h1>

      <div style={{ marginBottom: '20px' }}>

        <button
          onClick={executarFechamento}
          style={botao}
          disabled={loading}
        >
          {
            loading
              ? 'Processando...'
              : '📦 Fechar Mês'
          }
        </button>

        <button
          onClick={gerarPDFPix}
          style={botaoPdf}
        >
          📄 Relatório PIX PDF
        </button>

      </div>

      <div style={card}>

        <h2>
          Cobranças Geradas
        </h2>

        {
          lista.length === 0 &&
          <p>Nenhuma cobrança encontrada.</p>
        }

        {
          lista.map(item => (

            <div
              key={item.id}
              style={linha}
            >

              <div>

                <strong>
                  {item.descricao}
                </strong>

                <p>
                  R$ {Number(item.valor || 0).toFixed(2)}
                </p>

              </div>

              <div>

                <p>
                  Status:
                  <strong>
                    {' '}{item.status}
                  </strong>
                </p>

                <p>
                  Venc: {item.vencimento}
                </p>

              </div>

            </div>

          ))
        }

      </div>

    </Layout>

  )

}

const titulo = {
  color: '#fff',
  marginBottom: '20px'
}

const botao = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '14px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  marginRight: '10px'
}

const botaoPdf = {
  background: '#16a34a',
  color: '#fff',
  border: 'none',
  padding: '14px 20px',
  borderRadius: '10px',
  cursor: 'pointer'
}

const card = {
  background: '#1e293b',
  padding: '25px',
  borderRadius: '20px',
  color: '#fff'
}

const linha = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#0f172a',
  padding: '15px',
  borderRadius: '10px',
  marginTop: '10px'
}

