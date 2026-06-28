import { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {
  fecharMes,
  listarFechamentos
} from '../../services/fechamentoService'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function FechamentoMensal() {

  const [lista, setLista] = useState([])

  async function carregar() {

    const dados =
      await listarFechamentos()

    setLista(dados || [])

  }

  function gerarPDF(item) {

    const pdf = new jsPDF()

    pdf.setFontSize(20)

    pdf.text(
      'ERP Padaria',
      14,
      20
    )

    pdf.setFontSize(12)

    pdf.text(
      'Relatório de Fechamento Mensal',
      14,
      30
    )

    pdf.text(
      `Mês de Referência: ${item.mes_referencia}`,
      14,
      40
    )

    pdf.text(
      `Emitido em: ${new Date().toLocaleDateString('pt-BR')}`,
      14,
      48
    )

    autoTable(pdf, {
      startY: 60,

      head: [
        ['Indicador', 'Valor']
      ],

      body: [
        [
          'Faturamento',
          `R$ ${Number(item.faturamento).toFixed(2)}`
        ],
        [
          'Receitas',
          `R$ ${Number(item.receitas).toFixed(2)}`
        ],
        [
          'Despesas',
          `R$ ${Number(item.despesas).toFixed(2)}`
        ],
        [
          'Saldo',
          `R$ ${Number(item.saldo).toFixed(2)}`
        ],
        [
          'PIX Pendentes',
          String(item.pix_pendentes)
        ]
      ]
    })

    pdf.save(
      `Fechamento-${item.mes_referencia}.pdf`
    )

  }

  async function executarFechamento() {

    const resultado =
      await fecharMes()

    if (resultado) {

      alert(
        'Fechamento realizado com sucesso!'
      )

      carregar()

    }

  }

  useEffect(() => {

    carregar()

  }, [])

  return (

    <Layout>

      <h1 style={titulo}>
        📊 Fechamento Mensal
      </h1>

      <button
        style={botao}
        onClick={executarFechamento}
      >
        Fechar Mês
      </button>

      <div style={card}>

        {lista.map(item => (

          <div
            key={item.id}
            style={linha}
          >

            <div>

              <h3>
                {item.mes_referencia}
              </h3>

              <p>
                Faturamento:
                R$ {Number(item.faturamento).toFixed(2)}
              </p>

              <p>
                Receitas:
                R$ {Number(item.receitas).toFixed(2)}
              </p>

              <p>
                Despesas:
                R$ {Number(item.despesas).toFixed(2)}
              </p>

              <p>
                Saldo:
                R$ {Number(item.saldo).toFixed(2)}
              </p>

              <p>
                PIX Pendentes:
                {item.pix_pendentes}
              </p>

            </div>

            <button
              style={botaoPdf}
              onClick={() => gerarPDF(item)}
            >
              📄 PDF
            </button>

          </div>

        ))}

      </div>

    </Layout>

  )

}

const titulo = {
  color: '#fff'
}

const botao = {
  background: '#16a34a',
  color: '#fff',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  cursor: 'pointer',
  marginBottom: '20px'
}

const card = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
}

const linha = {
  background: '#1e293b',
  color: '#fff',
  padding: '20px',
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const botaoPdf = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '10px',
  cursor: 'pointer'
}