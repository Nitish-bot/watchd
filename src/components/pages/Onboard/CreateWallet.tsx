import { useEffect, useState } from 'react'

import { Check, ChevronLeft, Copy01, ChevronRight } from '@untitledui/icons'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/base/button/button'
import Header from '@/components/common/Header'
import Loading from '@/components/pages/State/Loading'
import { useClipboard } from '@/hooks/use-clipboard'
import { useBackground } from '@/providers/background-provider'
import { MessageType } from '@/types/background-bridge'
import { cx } from '@/utils/cx'

export default function CreateWallet() {
  const [mnemonic, setMnemonic] = useState('')
  const { request } = useBackground()

  useEffect(() => {
    request<string>({
      type: MessageType.GET_TEMP_MNEMONIC,
    })
      .then(setMnemonic)
      .catch(console.error)
  }, [request])

  const { copy } = useClipboard()
  const navigate = useNavigate()
  const [showCopied, setShowCopied] = useState(false)

  if (mnemonic === '') {
    return <Loading />
  }

  const mnemonicArray: string[] = mnemonic.split(' ')
  const mnemonicPrompt =
    'This mnemonic is the key to your wallet, make sure to write it down somewhere.'

  const handleCopy = () => {
    copy(mnemonic)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const handleNext = () => {
    navigate('/onboard/verify')
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
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <MnemonicGrid mnemonic={mnemonicArray} className="w-full gap-2" />
          <div className="text-primary flex text-sm font-normal">
            <p>{mnemonicPrompt}</p>
            <Button
              iconLeading={Copy01}
              isDisabled={showCopied}
              onClick={handleCopy}
              className="ml-4"
            />
          </div>
          <Button
            className="mt-4 w-full"
            iconTrailing={ChevronRight}
            onClick={handleNext}
          >
            Next
          </Button>
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
    <Button color="secondary" className="cursor-default text-xs font-light">
      {word}
    </Button>
  )
}
