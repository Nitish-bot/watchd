import { browser, defineBackground } from '#imports'
import { getMnemonic } from './crypto'
import { Buffer } from 'buffer'

globalThis.Buffer = Buffer

export default defineBackground(() => {
  browser.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(async msg => {
      console.log('background reached')

      if (msg.type === 'UNLOCK') {
        port.postMessage({
          id: msg.id,
          ok: true,
        })
      }

      if (msg.type === 'CREATE_MNEMONIC') {
        const mnemonic = getMnemonic()
        port.postMessage({
          id: msg.id,
          ok: true,
          result: mnemonic,
        })
        console.log(mnemonic)
      }
    })
  })
})
