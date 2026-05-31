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
      pixPendentes:0

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
        Dados reais do sistema
      </p>

      <div style={grid}>

        <div style={cardAzul}>

          <h3>
            💰 Faturamento
          </h3>

          <h1>
            R$ {
              dados.faturamento
                .toFixed(2)
            }
          </h1>

        </div>

        <div style={cardVerde}>

          <h3>
            🏭 Produção
          </h3>

          <h1>
            {
              dados.producaoTotal
            }
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
            {
              dados.usuarios
            }
          </h1>

        </div>

        <div style={cardLaranja}>

          <h3>
            💳 PIX Pendentes
          </h3>

          <h1>
            {
              dados.pixPendentes
            }
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

const cardAzul = {

  background:'#2563eb',

  padding:'25px',

  borderRadius:'20px',

  color:'#fff'

}

const cardVerde = {

  background:'#16a34a',

  padding:'25px',

  borderRadius:'20px',

  color:'#fff'

}

const cardRoxo = {

  background:'#7c3aed',

  padding:'25px',

  borderRadius:'20px',

  color:'#fff'

}

const cardLaranja = {

  background:'#ea580c',

  padding:'25px',

  borderRadius:'20px',

  color:'#fff'

}