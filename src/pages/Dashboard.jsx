import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import {
  carregarDashboard
} from '../services/dashboardService'

export default function Dashboard() {

  const [dados,setDados] =
    useState({

      faturamento:0,
      producaoTotal:0,
      usuarios:0,
      pixPendentes:0,
      receitas:0,
      despesas:0,
      saldo:0

    })

  async function carregar() {

    const resultado =
      await carregarDashboard()

    setDados(resultado)

  }

  useEffect(() => {

    carregar()

  }, [])

  return (

    <Layout>

      <h1 style={titulo}>
        📊 Dashboard
      </h1>

      <p style={subtitulo}>
        Dados reais do ERP Padaria
      </p>

      <div style={grid}>

        <div style={cardAzul}>

          <h3>
            💰 Faturamento
          </h3>

          <h1>
            R$ {dados.faturamento.toFixed(2)}
          </h1>

        </div>

        <div style={cardVerde}>

          <h3>
            🏭 Produção
          </h3>

          <h1>
            {dados.producaoTotal}
          </h1>

          <p>
            unidades produzidas
          </p>

        </div>

        <div style={cardRoxo}>

          <h3>
            👥 Usuários
          </h3>

          <h1>
            {dados.usuarios}
          </h1>

        </div>

        <div style={cardLaranja}>

          <h3>
            💳 PIX Pendentes
          </h3>

          <h1>
            {dados.pixPendentes}
          </h1>

        </div>

        <div style={cardReceita}>

          <h3>
            📈 Receitas
          </h3>

          <h1>
            R$ {dados.receitas.toFixed(2)}
          </h1>

        </div>

        <div style={cardDespesa}>

          <h3>
            📉 Despesas
          </h3>

          <h1>
            R$ {dados.despesas.toFixed(2)}
          </h1>

        </div>

        <div style={cardSaldo}>

          <h3>
            💵 Saldo Atual
          </h3>

          <h1>
            R$ {dados.saldo.toFixed(2)}
          </h1>

        </div>

      </div>

    </Layout>

  )

}

const titulo = {

  color:'#fff',
  marginBottom:'10px'

}

const subtitulo = {

  color:'#94a3b8',
  marginBottom:'30px'

}

const grid = {

  display:'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(250px,1fr))',

  gap:'20px'

}

const baseCard = {

  padding:'25px',

  borderRadius:'20px',

  color:'#fff',

  boxShadow:
    '0 10px 20px rgba(0,0,0,0.3)'

}

const cardAzul = {

  ...baseCard,

  background:'#2563eb'

}

const cardVerde = {

  ...baseCard,

  background:'#16a34a'

}

const cardRoxo = {

  ...baseCard,

  background:'#7c3aed'

}

const cardLaranja = {

  ...baseCard,

  background:'#ea580c'

}

const cardReceita = {

  ...baseCard,

  background:'#0891b2'

}

const cardDespesa = {

  ...baseCard,

  background:'#dc2626'

}

const cardSaldo = {

  ...baseCard,

  background:'#15803d'

}