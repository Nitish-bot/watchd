import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/base/button/button'
import logo from '@/assets/logo.svg'
import { useBackground } from '@/providers/background-provider'

export default function Onboard() {
  const navigate = useNavigate()
  const { request } = useBackground()

  async function createWallet() {
    const mnemonic = await request<string>({
      type: 'CREATE_MNEMONIC',
    })
    console.log(mnemonic)
    navigate('/onboard/create', {
      state: { mnemonic },
    })
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <img src={logo} alt="logo" />
      <div className="flex flex-col gap-4 font-thin">
        <Button size="md" onClick={() => createWallet()} className="px-16 font-medium">
          Create wallet
        </Button>
        <Button size="md" className="px-16 font-medium">
          Add wallet
        </Button>
      </div>
    </div>
  )
}
