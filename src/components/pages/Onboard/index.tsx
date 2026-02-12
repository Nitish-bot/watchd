import { useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import { Button } from '@/components/base/button/button'
import Header from '@/components/common/Header'
import { useBackground } from '@/providers/background-provider'
import EmptyPlaceholder from '@/utils/emptyIcon'

export default function Onboard() {
  const navigate = useNavigate()
  const { request } = useBackground()

  async function onClick() {
    request<string>({
      type: 'CREATE_MNEMONIC',
    })
      .then(console.log)
      .catch(console.error)
    navigate('/onboard/create')
  }

  return (
    <div className="h-full p-4">
      <Header icon={EmptyPlaceholder} />
      <main className="flex h-full flex-col items-center justify-center gap-32">
        <img src={logo} alt="logo" />
        <div className="flex w-full flex-col gap-4">
          <Button size="lg" onClick={() => onClick()} className="font-medium">
            Create wallet
          </Button>
          <Button size="lg" className="font-medium">
            Add wallet
          </Button>
        </div>
      </main>
    </div>
  )
}
