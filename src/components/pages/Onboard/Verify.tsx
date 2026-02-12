import { Button } from '@/components/base/button/button'
import SingleWordInput from '@/components/base/input/single-word-input'
import Header from '@/components/common/Header'
import { useBackground } from '@/providers/background-provider'
import { MessageType } from '@/types/background-bridge'
import { cx } from '@/utils/cx'
import { ChevronLeft, Fingerprint04 } from '@untitledui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    return <div>Loading..</div>
  }

  const mnemonicArray: string[] = mnemonic.split(' ')
  const verifyPrompt =
    'Please re-enter the mnemonic you copied on the last page to verify you have stored it safely.'

  const handleNext = () => {
    navigate('/onboard/verify', {
      state: { mnemonic },
    })
  }

  function ThisHeader() {
    function onClick() {
      navigate('/onboard/create', {
        state: { mnemonic },
      })
    }
    return <Header icon={ChevronLeft} onClick={onClick} />
  }

  return (
    <div className="flex h-full flex-col p-4">
      <ThisHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          <MnemonicGrid mnemonic={mnemonicArray} className="Verify-full gap-2" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-primary text-sm font-normal">
            <p>{verifyPrompt}</p>
          </div>
          <div className="flex flex-col gap-2">
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
      {mnemonic.map(() => {
        return <SingleWordInput />
      })}
    </div>
  )
}
