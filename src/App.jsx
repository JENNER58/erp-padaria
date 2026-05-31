import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import {
  useEffect,
  useState
} from 'react'

import { supabase } from './lib/supabase'

import Dashboard from './pages/Dashboard'
import Financeiro from './pages/Financeiro'
import Usuarios from './pages/Usuarios'
import Producao from './pages/Producao'
import Pix from './pages/Pix'
import Login from './pages/Login'
import FechamentoMensal from './pages/FechamentoMensal'
import Notificacoes from './pages/Notificacoes'

function RotaPrivada({ children }) {

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {

    async function verificarSessao() {

      const {
        data
      } = await supabase.auth.getSession()

      setSession(data.session)
      setLoading(false)

    }

    verificarSessao()

    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }

  }, [])

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Carregando...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" />
  }

  return children

}

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        />

        <Route
          path="/producao"
          element={
            <RotaPrivada>
              <Producao />
            </RotaPrivada>
          }
        />

        <Route
          path="/pix"
          element={
            <RotaPrivada>
              <Pix />
            </RotaPrivada>
          }
        />

        <Route
          path="/financeiro"
          element={
            <RotaPrivada>
              <Financeiro />
            </RotaPrivada>
          }
        />

        <Route
          path="/usuarios"
          element={
            <RotaPrivada>
              <Usuarios />
            </RotaPrivada>
          }
        />
        <Route
  path="/fechamento"
  element={
    <RotaPrivada>
      <FechamentoMensal />
    </RotaPrivada>
  }
/>

<Route
  path="/notificacoes"
  element={
    <RotaPrivada>
      <Notificacoes />
    </RotaPrivada>
  }
/>

      </Routes>

    </BrowserRouter>

  )

}