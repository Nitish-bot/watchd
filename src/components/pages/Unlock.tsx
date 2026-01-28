import { Navigate } from 'react-router-dom'

// Conditionally redirect to onboard
// else ask to setup a password
export default function Unlock() {
  return <Navigate to="/onboard" replace />
}
