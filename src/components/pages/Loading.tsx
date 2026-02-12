import { Loading02 } from '@untitledui/icons'

export default function Loading() {
  return (
    <main className="flex h-full flex-1 flex-col justify-center p-4">
      <Loading02 size={64} className="animate-[spin_2.5s_linear_infinite] self-center" />
    </main>
  )
}
