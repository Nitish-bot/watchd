import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/base/button/button'
import { useBackground } from '@/providers/background-provider'

export default function Error() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { disconnect } = useBackground()

  let message = state.message
  let redirect = state.redirect

  if (!message) {
    message = 'An unknown error occurred, please restart the extension'
    redirect = '/'
    disconnect()
  }

  const onSubmit = () => {
    navigate(redirect)
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-2">
      <p>{message}</p>
      <Button onClick={onSubmit}>Redirect</Button>
    </main>
  )
}
