import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/base/button/button'
import { Input } from '@/components/base/input/input'
import Header from '@/components/common/Header'
import { useBackground } from '@/providers/background-provider'
import { MessageType } from '@/types/background-bridge'
import EmptyPlaceholder from '@/utils/emptyIcon'

export default function SetupPassword() {
  const { request } = useBackground()
  const { control, handleSubmit, watch } = useForm<PasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const navigate = useNavigate()

  const password = watch('password')

  const verificationMessage =
    'You have successfully verified your mnemonic, please setup a password to protect your wallet.'

  const onSubmit: SubmitHandler<PasswordFormData> = async data => {
    const pubkey = await request<string>({
      type: MessageType.SETUP_PASSWORD,
      payload: data.password,
    })

    navigate('/success', {
      state: {
        redirect: '/',
        message:
          'You have successfully setup your password, please remember we can never help you recover it',
      },
    })

    console.log(pubkey)
  }

  return (
    <div className="flex h-full flex-col p-4">
      <Header icon={EmptyPlaceholder} />
      <main className="flex flex-1 flex-col justify-center gap-8">
        <div className="text-primary text-sm font-normal">
          <p>{verificationMessage}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters long' },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                placeholder="********"
                isInvalid={!!fieldState.error}
                hint={fieldState.error?.message}
              />
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="password"
                placeholder="********"
                isInvalid={!!fieldState.error}
                hint={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit">Setup password</Button>
        </form>
      </main>
    </div>
  )
}

interface PasswordFormData {
  password: string
  confirmPassword: string
}
