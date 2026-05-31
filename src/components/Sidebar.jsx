import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
export default function Sidebar() {

 async function sair() {

  await supabase.auth.signOut()

  window.location.href = '/login'

}

  return (

    <div style={sidebar}>

      <div>

        <h2 style={logo}>
          🥖 ERP Padaria
        </h2>

        <p style={subtitulo}>
          Sistema Empresarial
        </p>

      </div>

      <hr style={linha}/>

      <nav style={menu}>

        <Link to='/' style={link}>
          📊 Dashboard
        </Link>

        <Link to='/producao' style={link}>
          🏭 Produção
        </Link>

        <Link to='/pix' style={link}>
          💳 PIX
        </Link>

        <Link to='/financeiro' style={link}>
  💰 Financeiro
</Link>

<Link to='/fechamento' style={link}>
  📊 Fechamento Mensal
</Link>

<Link to='/notificacoes' style={link}>
  🔔 Notificações
</Link>

<Link to='/usuarios' style={link}>
  👥 Usuário
</Link>

      </nav>

      <button
        onClick={sair}
        style={botao}
      >
        🚪 Sair
      </button>

    </div>

  )

}

const sidebar = {

  width:'260px',

  background:'#0f172a',

  padding:'30px',

  color:'#fff',

  display:'flex',

  flexDirection:'column',

  justifyContent:'space-between',

  minHeight:'100vh',

  boxShadow:'4px 0 10px rgba(0,0,0,0.3)'

}

const logo = {

  fontSize:'28px',

  marginBottom:'5px'

}

const subtitulo = {

  color:'#94a3b8',

  fontSize:'14px'

}

const linha = {

  border:'1px solid #334155',

  margin:'20px 0'

}

const menu = {

  display:'flex',

  flexDirection:'column',

  gap:'15px'

}

const link = {

  color:'#fff',

  textDecoration:'none',

  background:'#1e293b',

  padding:'14px',

  borderRadius:'12px',

  fontSize:'16px'

}

const botao = {

  background:'#dc2626',

  color:'#fff',

  border:'none',

  padding:'14px',

  borderRadius:'12px',

  cursor:'pointer',

  marginTop:'30px',

  fontSize:'16px'

}