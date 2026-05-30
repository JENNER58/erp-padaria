import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function carregarSessao() {

      try {

        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
        }

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    carregarSessao()

  }, [])

  async function logout() {

    await supabase.auth.signOut()

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}

export function useAuth() {

  return useContext(AuthContext)

}