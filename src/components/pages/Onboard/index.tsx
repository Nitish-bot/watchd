import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/base/button/button'
import logo from '@/assets/logo.svg'
import { useBackground } from '@/providers/background-provider'

export default function Onboard() {
  const navigate = useNavigate()
  const { request } = useBackground()

  async function onClick() {
    const mnemonic = await request<string>({
      type: 'CREATE_MNEMONIC',
    })
    console.log(mnemonic)
    navigate('/onboard/create', {
      state: { mnemonic },
    })
  }

  return (
    <main className="flex h-full flex-col items-center justify-center gap-32 p-8">
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
  )
}
