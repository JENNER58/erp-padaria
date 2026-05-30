import { useEffect, useState } from 'react'

import Layout from '../components/Layout'

import {
  salvarNotificacao,
  listarNotificacoes
}
from '../services/notificacaoService'

export default function Notificacoes() {

  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')

  const [lista, setLista] = useState([])

  async function carregar() {

    const dados =
      await listarNotificacoes()

    setLista(dados)
  }

  useEffect(()=>{

    carregar()

  },[])

  async function salvar() {

    await salvarNotificacao({

      telefone,
      mensagem

    })

    alert('Notificação criada!')

    setTelefone('')
    setMensagem('')

    carregar()
  }

  return (

    <Layout>

      <h1 style={{
        marginBottom:'30px'
      }}>
        Notificações
      </h1>

      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr 1fr',
        gap:'30px'
      }}>

        <div style={box}>

          <h2>
            Nova Notificação
          </h2>

          <input
            type='text'
            placeholder='WhatsApp'
            value={telefone}
            onChange={(e)=>setTelefone(e.target.value)}
            style={input}
          />

          <textarea
            placeholder='Mensagem'
            value={mensagem}
            onChange={(e)=>setMensagem(e.target.value)}
            style={textarea}
          />

          <button
            onClick={salvar}
            style={botao}
          >
            Salvar Notificação
          </button>

        </div>

        <div style={box}>

          <h2 style={{
            marginBottom:'20px'
          }}>
            Histórico
          </h2>

          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'15px'
          }}>

            {
              lista.map((item)=>(

                <div
                  key={item.id}
                  style={card}
                >

                  <p>
                    📱 {item.telefone}
                  </p>

                  <p>
                    {item.mensagem}
                  </p>

                  <p>
                    Status:
                    {item.status}
                  </p>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </Layout>

  )

}

const box = {
  background:'#1f2937',
  padding:'30px',
  borderRadius:'20px'
}

const input = {
  width:'100%',
  padding:'15px',
  marginBottom:'15px',
  border:'none',
  borderRadius:'10px'
}

const textarea = {
  width:'100%',
  height:'120px',
  padding:'15px',
  marginBottom:'15px',
  border:'none',
  borderRadius:'10px'
}

const botao = {
  width:'100%',
  padding:'15px',
  border:'none',
  borderRadius:'10px',
  background:'#22c55e',
  color:'#fff',
  cursor:'pointer',
  fontWeight:'bold'
}

const card = {
  background:'#374151',
  padding:'15px',
  borderRadius:'10px'
}