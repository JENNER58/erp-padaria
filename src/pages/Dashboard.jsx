import Layout from '../components/Layout'

export default function Dashboard() {

  return (

    <Layout>

      <div style={topo}>

        <div>

          <h1 style={titulo}>
            📊 Dashboard
          </h1>

          <p style={subtitulo}>
            Bem-vindo ao ERP Padaria 🚀
          </p>

        </div>

      </div>

      <div style={grid}>

        <div style={cardAzul}>

          <h3>
            💰 Faturamento
          </h3>

          <h1>
            R$ 12.450
          </h1>

          <p>
            faturamento mensal
          </p>

        </div>

        <div style={cardVerde}>

          <h3>
            🏭 Produção
          </h3>

          <h1>
            9.820
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
            5
          </h1>

          <p>
            usuários ativos
          </p>

        </div>

      </div>

    </Layout>

  )

}

const topo = {

  marginBottom:'30px'

}

const titulo = {

  color:'#fff',

  fontSize:'38px',

  marginBottom:'10px'

}

const subtitulo = {

  color:'#94a3b8'

}

const grid = {

  display:'grid',

  gridTemplateColumns:'repeat(2,1fr)',

  gap:'20px'

}

const baseCard = {

  padding:'30px',

  borderRadius:'20px',

  color:'#fff',

  boxShadow:'0 10px 20px rgba(0,0,0,0.3)'

}

const cardAzul = {

  ...baseCard,

  background:'linear-gradient(135deg,#2563eb,#1d4ed8)'

}

const cardVerde = {

  ...baseCard,

  background:'linear-gradient(135deg,#16a34a,#15803d)'

}

const cardLaranja = {

  ...baseCard,

  background:'linear-gradient(135deg,#ea580c,#c2410c)'

}

const cardRoxo = {

  ...baseCard,

  background:'linear-gradient(135deg,#7c3aed,#6d28d9)'

}