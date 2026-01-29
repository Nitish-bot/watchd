import { Button } from '@/components/base/button/button'
import { useLocation } from 'react-router-dom'

export default function CreateWallet() {
  const { state } = useLocation()
  const mnemonic: string = state?.mnemonic

  if (!mnemonic) {
    return <div>Loading..</div>
  }

  const mnemonicArray: string[] = mnemonic.split(' ')

  return <MnemonicGrid mnemonic={mnemonicArray} />
}

function MnemonicGrid({ mnemonic }: { mnemonic: string[] }) {
  return (
    <div className="grid grid-cols-3 grid-rows-4">
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
