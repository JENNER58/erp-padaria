import { Navigate } from 'react-router-dom'

export default function AdminRoute({
  nivel,
  children
}) {

  if(nivel !== 'admin') {

    return <Navigate to='/dashboard' />

  }

  return children

}