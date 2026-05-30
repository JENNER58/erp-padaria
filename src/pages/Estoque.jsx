import Layout from '../components/Layout'

export default function Estoque() {

  return (

    <Layout>

      <h1 style={titulo}>
        🎒 Estoque
      </h1>

      <div style={card}>

        <h2>
          Controle de Estoque
        </h2>

        <p>
          Sistema de estoque funcionando 🚀
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