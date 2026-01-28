import { browser } from '#imports'
import * as bip39 from 'bip39'

export default function CreateWallet() {
  const mnemonic = bip39.generateMnemonic(128)
  browser.runtime.sendMessage({
    type: 'CREATE_WALLET',
    mnemonic,
  })
  return <></>
}
