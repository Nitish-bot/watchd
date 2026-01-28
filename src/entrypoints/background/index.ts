import { browser, defineBackground } from '#imports'

export default defineBackground(() => {
  browser.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(async msg => {
      if (msg.type === 'UNLOCK') {
        port.postMessage({
          success: 'unlock',
        })
      }
    })
  })
})
