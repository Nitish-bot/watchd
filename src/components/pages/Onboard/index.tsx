import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/base/button/button'
import logo from '@/assets/logo.svg'

export default function Onboard() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <img src={logo} alt="logo" />
      <div className="flex flex-col gap-4 font-thin">
        <Button
          size="md"
          onClick={() => navigate('/onboard/create')}
          className="px-16 font-medium"
        >
          Create wallet
        </Button>
        <Button size="md" className="px-16 font-medium">
          Add wallet
        </Button>
      </div>
    </div>
  )
}
