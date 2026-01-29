import { Button } from '@/components/base/button/button'
import Header from '@/components/common/Header'
import { ChevronLeft, Copy01, Fingerprint04 } from '@untitledui/icons'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CreateWallet() {
  const { state } = useLocation()
  const mnemonic: string = state?.mnemonic

  if (!mnemonic) {
    return <div>Loading..</div>
  }

  const mnemonicArray: string[] = mnemonic.split(' ')
  const mnemonicPrompt =
    'This is the key to your wallet, make sure you write these down somewhere.'

  return (
    <div className="h-full p-4">
      <ThisHeader />
      <main className="flex h-full flex-col justify-around gap-16">
        <div></div>
        <MnemonicGrid mnemonic={mnemonicArray} />
        <div className="flex flex-col gap-2">
          <div className="text-primary text-sm font-normal">{mnemonicPrompt}</div>
          <Button iconLeading={Copy01}>Copy</Button>
          <Button iconLeading={Fingerprint04}>Next</Button>
        </div>
      </main>
    </div>
  )
}

function MnemonicGrid({ mnemonic }: { mnemonic: string[] }) {
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-1">
      {mnemonic.map(word => {
        return <MnemonicButton word={word} />
      })}
    </div>
  )
}

function MnemonicButton({ word }: { word: string }) {
  return (
    <Button
      color="secondary"
      className="cursor-default text-sm font-normal"
      onClick={() => {
        navigator.clipboard.writeText(word)
      }}
    >
      {word}
    </Button>
  )
}

function ThisHeader() {
  const navigate = useNavigate()
  function onClick() {
    navigate('/onboard')
  }
  return <Header icon={ChevronLeft} onClick={onClick} />
}
