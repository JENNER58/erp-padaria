import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {

  const {
    user,
    logout
  } = useAuth()

  async function sair() {

    await logout()

    window.location.href = '/login'

  }

  return (

    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#111827'
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: '40px',
          color: '#fff'
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}
        >

          <div>

            <div>
              👤 {user?.email}
            </div>

          </div>

          <button
            onClick={sair}
            style={{
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>

        </div>

        {children}

      </div>

    </div>

  )

}