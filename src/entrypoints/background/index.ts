import { browser, defineBackground } from '#imports'
import { Buffer } from 'buffer'
import { handleDisconnect, handleMessage } from './handlers'

globalThis.Buffer = Buffer

export default defineBackground(() => {
  browser.runtime.onConnect.addListener(port => {
    if (port.name === 'popup') {
      port.onDisconnect.addListener(handleDisconnect)

      port.onMessage.addListener(handleMessage)
    }
  })
})
