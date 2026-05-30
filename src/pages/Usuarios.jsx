import Layout from '../components/Layout'

export default function Usuarios() {

  return (

    <Layout>

      <h1 style={titulo}>
        👥 Usuários
      </h1>

      <div style={card}>

        <h2>
          Gestão de Usuários
        </h2>

        <p>
          Sistema de usuários funcionando 🚀
        </p>

      </div>

    </Layout>

  )

}

const titulo = {

  marginBottom:'30px',

  color:'#fff'

}

const card = {

  background:'#1e293b',

  padding:'30px',

  borderRadius:'20px',

  color:'#fff'

}