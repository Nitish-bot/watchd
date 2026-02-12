import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { browser, Browser } from '#imports'
import { MessageType, WalletRequest, WalletResponse } from '@/types/background-bridge'

type Pending = {
  resolve: (v: unknown) => void
  reject: (e: unknown) => void
}

type Ctx = {
  request<T = unknown>(msg: Omit<WalletRequest, 'id'>): Promise<T>
  connected: boolean
}

const BackgroundContext = createContext<Ctx>(null!)

export function BackgroundProvider({ children }: PropsWithChildren) {
  const portRef = useRef<Browser.runtime.Port | null>(null)
  const pending = useRef<Map<string, Pending>>(new Map())
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const port = browser.runtime.connect({ name: 'popup' })
    portRef.current = port

    port.onMessage.addListener((msg: WalletResponse<MessageType>) => {
      const cb = pending.current.get(msg.id)
      if (!cb) return

      pending.current.delete(msg.id)

      if (msg.ok) {
        cb.resolve(msg.result)
      } else {
        cb.reject(msg.error)
      }
    })

    port.onDisconnect.addListener(() => {
      setConnected(false)
      portRef.current = null
    })

    setConnected(true)

    return () => port.disconnect()
  }, [])

  function request<T>(msg: Omit<WalletRequest, 'id'>): Promise<T> {
    const id = crypto.randomUUID()

    return new Promise((resolve, reject) => {
      pending.current.set(id, {
        resolve: resolve as (v: unknown) => void,
        reject,
      })

      portRef.current?.postMessage({
        id,
        ...msg,
      })
    })
  }

  return (
    <BackgroundContext.Provider value={{ request, connected }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackground = () => useContext(BackgroundContext)
