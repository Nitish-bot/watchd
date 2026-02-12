import { Buffer } from 'buffer'

import { browser, defineBackground } from '#imports'

import { handleDisconnect, handleMessage } from '@/entrypoints/background/handlers'
import { StorageKey } from '@/entrypoints/background/storage'

globalThis.Buffer = Buffer

export default defineBackground(() => {
  browser.runtime.onConnect.addListener(port => {
    browser.storage.local.set({
      [StorageKey.TEMP_PASS]: crypto.randomUUID(),
    })

    if (port.name === 'popup') {
      port.onDisconnect.addListener(handleDisconnect)

      port.onMessage.addListener(handleMessage)
    }
  })
})
