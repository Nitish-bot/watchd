import { browser } from '#imports'
import * as Iron from 'iron-webcrypto'

export enum StorageKey {
  TEMP_PASS = 'temp_pass',
  TEMP_MNEMONIC = 'temp_mnemonic',
}

type EncryptableData = string | number | boolean | object

const options = {
  ...Iron.defaults,
  encryption: {
    ...Iron.defaults.encryption,
    minPasswordlength: 12,
  },
  integrity: {
    ...Iron.defaults.integrity,
    minPasswordlength: 12,
  },
}

export async function setStorageItem<T extends EncryptableData>(
  key: StorageKey,
  value: T
): Promise<void> {
  try {
    const internalPass = (await browser.storage.local.get(StorageKey.TEMP_PASS))[
      StorageKey.TEMP_PASS
    ] as string
    const encryptedData = await Iron.seal(value, internalPass, options)
    await browser.storage.local.set({
      [key]: encryptedData,
    })
  } catch (e) {
    console.error(`Error setting storage item ${key}: `, e)
  }
}

export async function getStorageItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const internalPass = (await browser.storage.local.get(StorageKey.TEMP_PASS))[
      StorageKey.TEMP_PASS
    ] as string
    const data = await browser.storage.local.get(key)
    const encryptedData = data[key]
    if (!encryptedData || !(typeof encryptedData == 'string')) {
      console.error('data stored in local storage is not string')
      return null
    }
    const decryptedData = await Iron.unseal(encryptedData, internalPass, options)
    return decryptedData as T
  } catch (e) {
    console.error(`Error getting storage item ${key}: `, e)
    return null
  }
}

export async function removeStorageItem(key: StorageKey): Promise<void> {
  await browser.storage.local.remove(key as string)
}
