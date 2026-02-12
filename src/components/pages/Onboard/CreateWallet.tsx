import { Button } from '@/components/base/button/button'
import Header from '@/components/common/Header'
import { useClipboard } from '@/hooks/use-clipboard'
import { cx } from '@/utils/cx'
import { Check } from '@untitledui/icons'
import { ChevronLeft, Copy01, Fingerprint04 } from '@untitledui/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CreateWallet() {
  const { state } = useLocation()
  const mnemonic: string = state?.mnemonic

  const { copy } = useClipboard()
  const navigate = useNavigate()
  const [showCopied, setShowCopied] = useState(false)

  if (!mnemonic) {
    return <div>Loading..</div>
  }

  const mnemonicArray: string[] = mnemonic.split(' ')
  const mnemonicPrompt =
    'This mnemonic is the key to your wallet, make sure you write it down somewhere safe.'

  const handleCopy = () => {
    copy(mnemonic)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const handleNext = () => {
    navigate('/onboard/verify', {
      state: { mnemonic },
    })
  }

  function ThisHeader() {
    function onClick() {
      navigate('/onboard')
    }
    return <Header icon={ChevronLeft} onClick={onClick} />
  }

  return (
    <div className="flex h-full flex-col p-4">
      <ThisHeader />

      {showCopied && (
        <div className="animate-in fade-in zoom-in slide-in-from-top-4 absolute left-1/2 top-20 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg transition-all">
          <Check className="h-4 w-4 text-green-400" />
          Copied to clipboard
        </div>
      )}

      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          <MnemonicGrid mnemonic={mnemonicArray} className="w-full gap-2" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-primary text-sm font-normal">
            <p>{mnemonicPrompt}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button iconLeading={Copy01} isDisabled={showCopied} onClick={handleCopy}>
              Copy
            </Button>
            <Button iconLeading={Fingerprint04} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

function MnemonicGrid({
  mnemonic,
  className,
}: {
  mnemonic: string[]
  className: string
}) {
  return (
    <div className={cx('grid grid-cols-3 grid-rows-4', className)}>
      {mnemonic.map(word => {
        return <MnemonicButton word={word} />
      })}
    </div>
  )
}

function MnemonicButton({ word }: { word: string }) {
  return (
    <Button color="secondary" className="cursor-default text-sm font-normal">
      {word}
    </Button>
  )
}
