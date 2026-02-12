import ncrypt from 'ncrypt-js'

import { browser } from '#imports'

type DataToEncrypt = string | number | boolean | object

export function saveDataTemp(data: DataToEncrypt) {
  const internalPass = import.meta.env.ENCRYPTION_PASS
  const { encrypt } = new ncrypt(internalPass)

  const encryptedKey = encrypt(data)
  browser.storage.local.set({
    tempPrivateKey: encryptedKey,
  })
}
