import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import {
  fecharMes,
  listarFechamentos
} from '../services/fechamentoService'

export default function FechamentoMensal() {

  const [lista,setLista] =
    useState([])

  async function carregar() {

    const dados =
      await listarFechamentos()

    setLista(dados)

  }

  async function executarFechamento() {

    const resultado =
      await fecharMes()

    if(resultado) {

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

        ))}

      </div>

    </Layout>

  )

}

const titulo = {
  color:'#fff'
}

const botao = {
  background:'#16a34a',
  color:'#fff',
  border:'none',
  padding:'14px',
  borderRadius:'10px',
  cursor:'pointer',
  marginBottom:'20px'
}

const card = {
  display:'flex',
  flexDirection:'column',
  gap:'15px'
}

const linha = {
  background:'#1e293b',
  color:'#fff',
  padding:'20px',
  borderRadius:'15px'
}