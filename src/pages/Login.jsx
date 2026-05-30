import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function entrar() {

    try {

      setLoading(true)

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password: senha
        })

      if (error) {
        alert(error.message)
        return
      }

      window.location.href = '/'

    } catch (err) {

      alert('Erro ao realizar login')

    } finally {

      setLoading(false)

    }

  }

  return (
    <div style={container}>
      <div style={card}>

        <h1 style={logo}>🥖 ERP Padaria</h1>

        <p style={subtitulo}>
          Sistema Empresarial
        </p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
          style={input}
        />

        <button
          onClick={entrar}
          style={botao}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

      </div>
    </div>
  )
}       

const container = {
  minHeight: '100vh',
  background: '#111827',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const card = {
  width: '400px',
  background: '#1e293b',
  padding: '40px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
}

const logo = {
  color: '#fff',
  textAlign: 'center'
}

const subtitulo = {
  color: '#94a3b8',
  textAlign: 'center',
  marginBottom: '20px'
}

const input = {
  padding: '14px',
  borderRadius: '10px',
  border: 'none',
  outline: 'none'
}

const botao = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '16px'
}