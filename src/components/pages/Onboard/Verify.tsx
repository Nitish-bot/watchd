import { useEffect, useState } from 'react'

import { ChevronLeft, Fingerprint02 } from '@untitledui/icons'
import {
  useForm,
  Controller,
  SubmitHandler,
  Control,
  UseFormSetValue,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/base/button/button'
import SingleWordInput from '@/components/base/input/single-word-input'
import Header from '@/components/common/Header'
import Loading from '@/components/pages/State/Loading'
import { useBackground } from '@/providers/background-provider'
import { MessageType } from '@/types/background-bridge'
import { cx } from '@/utils/cx'

export default function Verify() {
  const [mnemonic, setMnemonic] = useState('')
  const { request } = useBackground()
  const { control, handleSubmit, setValue } = useForm<MnemonicFormData>()

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

  const onSubmit: SubmitHandler<MnemonicFormData> = data => {
    const enteredMnemonic = Object.values(data).join(' ')
    if (enteredMnemonic === mnemonic) {
      navigate('/onboard/setupPassword')
    } else {
      navigate('/error', {
        state: {
          message:
            'The mnemonic you entered did not match the original, please go back and create a new one',
          redirect: '/onboard/create',
        },
      })
    }
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
        <form
          className="flex h-full flex-1 flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <MnemonicGrid
            mnemonic={mnemonicArray}
            control={control}
            setValue={setValue}
            className="w-full gap-2"
          />
          <div className="text-primary text-sm font-normal">
            <p>{verifyPrompt}</p>
          </div>
          <Button className="mt-4 w-full" iconTrailing={Fingerprint02} type="submit">
            Verify
          </Button>
        </form>
      </main>
    </div>
  )
}

function MnemonicGrid({
  mnemonic,
  control,
  setValue,
  className,
}: {
  mnemonic: string[]
  // eslint-disable-next-line
  control: Control<MnemonicFormData, any, MnemonicFormData>
  setValue: UseFormSetValue<MnemonicFormData>
  className: string
}) {
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData('Text')
    const words = pastedData.trim().split(/\s+/) // Splits by any whitespace

    if (words.length === 12) {
      e.preventDefault() // Stop the default paste into just one box
      words.forEach((word, index) => {
        // @ts-expect-error matching your existing pattern
        setValue(`word${index + 1}`, word)
      })
    }
  }

  return (
    <div className={cx('grid grid-cols-3 grid-rows-4', className)}>
      {mnemonic.map((_, i) => {
        return (
          <Controller
            // @ts-expect-error we can ensure index is between 1 and 12
            name={`word${i + 1}`}
            control={control}
            render={({ field }) => (
              <SingleWordInput
                {...field}
                placeholder={`word ${i + 1}`}
                isRequired
                onPaste={handlePaste}
              />
            )}
          />
        )
      })}
    </div>
  )
}

interface MnemonicFormData {
  word1: string
  word2: string
  word3: string
  word4: string
  word5: string
  word6: string
  word7: string
  word8: string
  word9: string
  word10: string
  word11: string
  word12: string
}
