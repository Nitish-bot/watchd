import { Button } from '@/components/base/button/button'
import SingleWordInput from '@/components/base/input/single-word-input'
import Header from '@/components/common/Header'
import { useBackground } from '@/providers/background-provider'
import { MessageType } from '@/types/background-bridge'
import { cx } from '@/utils/cx'
import { ChevronLeft, Fingerprint02 } from '@untitledui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'

export default function Verify() {
  const [mnemonic, setMnemonic] = useState('')
  const { request } = useBackground()

  useEffect(() => {
    request<string>({
      type: MessageType.GET_TEMP_MNEMONIC,
    })
      .then(setMnemonic)
      .catch(console.error)
  }, [request])

  const navigate = useNavigate()

  if (mnemonic === '') {
    return <Loading />
  }

  const mnemonicArray: string[] = mnemonic.split(' ')
  const verifyPrompt =
    'Please re-enter the mnemonic you copied on the last page to verify you have stored it safely.'

  const handleNext = () => {
    navigate('/onboard/setupPassword')
  }

  function ThisHeader() {
    function onClick() {
      navigate('/onboard/create')
    }
    return <Header icon={ChevronLeft} onClick={onClick} />
  }

  return (
    <div className="flex h-full flex-col p-4">
      <ThisHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <MnemonicGrid mnemonic={mnemonicArray} className="w-full gap-2" />
          <div className="text-primary text-sm font-normal">
            <p>{verifyPrompt}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button iconTrailing={Fingerprint02} onClick={handleNext}>
              Verify
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
      {mnemonic.map(() => {
        return <SingleWordInput />
      })}
    </div>
  )
}
