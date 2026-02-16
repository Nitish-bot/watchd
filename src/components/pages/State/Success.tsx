import { useLocation, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import { Button } from '@/components/base/button/button'
import Header from '@/components/common/Header'
import Loading from '@/components/pages/State/Loading'
import EmptyPlaceholder from '@/utils/emptyIcon'

export default function Success() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const message = state.message
  const redirect = state.redirect

  if (!message || !redirect) {
    console.log('Message or redirect not provided to succes state')
    return <Loading />
  }

  const onClick = () => {
    navigate(redirect)
  }

  return (
    <div className="h-full p-4">
      <Header icon={EmptyPlaceholder} />
      <main className="flex h-full flex-col items-center justify-center gap-32">
        <img src={logo} alt="logo" />
        <div className="flex w-full flex-col gap-4">
          <p>{message}</p>
          <Button size="lg" className="font-medium" onClick={onClick}>
            Continue
          </Button>
        </div>
      </main>
    </div>
  )
}
