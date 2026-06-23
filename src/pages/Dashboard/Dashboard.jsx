import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
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
    saldo:0,

    producoes:[],
    pix:[],
    notificacoes:[],
    fechamentos:[]

  })
  async function carregar() {

    const resultado =
      await carregarDashboard()

    setDados(resultado)

  }

  useEffect(() => {

    carregar()

  }, [])

  const dadosFinanceiro = [
  {
    nome: 'Receitas',
    valor: dados.receitas
  },
  {
    nome: 'Despesas',
    valor: dados.despesas
  }
]

const dadosPix = [
  {
    nome: 'Pendentes',
    valor: dados.pixPendentes
  },
  {
    nome: 'Outros',
    valor: Math.max(
      (dados.pix?.length || 0) - dados.pixPendentes,
      0
    )
  }
]

const producaoPorTipo = {}

dados.producoes?.forEach(item => {

  if (!producaoPorTipo[item.tipo_pao]) {
    producaoPorTipo[item.tipo_pao] = 0
  }

  producaoPorTipo[item.tipo_pao] +=
    Number(item.quantidade || 0)

})

const dadosProducao =
  Object.entries(producaoPorTipo)
    .map(([nome, quantidade]) => ({
      nome,
      quantidade
    }))

    const dadosFaturamentoMensal =
  dados.fechamentos?.map(item => ({
    mes: item.mes_referencia,
    faturamento: Number(item.faturamento || 0)
  })) || []

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

      <div
  style={{
    marginTop: '40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))',
    gap: '20px'
  }}
>

  <div style={cardGrafico}>
    <h2>📈 Receitas x Despesas</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dadosFinanceiro}>
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="valor" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div style={cardGrafico}>
    <h2>🏭 Produção por Tipo</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dadosProducao}>
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantidade" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div style={cardGrafico}>
  <h2>💳 PIX</h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={dadosPix}
        dataKey="valor"
        nameKey="nome"
        outerRadius={90}
        label
      >
        {dadosPix.map((_, index) => (
          <Cell key={index} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

<div style={cardGrafico}>

  <h2>
    📅 Faturamento Mensal
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <BarChart
      data={dadosFaturamentoMensal}
    >

      <XAxis dataKey="mes" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="faturamento"
        name="Faturamento"
      />

    </BarChart>

  </ResponsiveContainer>

</div>

</div>

<div
  style={{
    marginTop:'30px'
  }}
>

  <div style={cardGrafico}>

    <h2>
      🔔 Últimas Notificações
    </h2>

    {
      dados.notificacoes?.length === 0 &&
      (
        <p>
          Nenhuma notificação encontrada.
        </p>
      )
    }

    {
      dados.notificacoes
        ?.slice(0,5)
        .map(item => (

          <div
            key={item.id}
            style={{
              background:'#0f172a',
              padding:'15px',
              borderRadius:'10px',
              marginTop:'10px'
            }}
          >

            <p>
              {item.mensagem}
            </p>

            <small>
              Status: {item.status}
            </small>

          </div>

        ))
    }

  </div>

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

const cardGrafico = {

  background:'#1e293b',

  padding:'25px',

  borderRadius:'20px',

  color:'#fff',

  minHeight:'350px'

}