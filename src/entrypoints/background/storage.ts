import { browser } from '#imports'
import * as Iron from 'iron-webcrypto'

export enum StorageKey {
  TEMP_MNEMONIC = 'temp_mnemonic',
}

type EncryptableData = string | number | boolean | object

const internalPass = 'TEMPORARY_PASS'

export async function setStorageItem<T extends EncryptableData>(
  key: StorageKey,
  value: T
): Promise<void> {
  try {
    const encryptedData = Iron.seal(value, internalPass, Iron.defaults)
    await browser.storage.local.set({
      [key]: encryptedData,
    })
  } catch (e) {
    console.error(`Error setting storage item ${key}: `, e)
  }
}

export async function getStorageItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const data = await browser.storage.local.get(key)
    const encryptedData = data[key]
    if (!encryptedData || !(typeof encryptedData == 'string')) {
      return null
    }
    const decryptedData = Iron.unseal(encryptedData, internalPass, Iron.defaults)
    return decryptedData as T
  } catch (e) {
    console.error(`Error getting storage item ${key}: `, e)
    return null
  }
}

export async function removeStorageItem(key: StorageKey): Promise<void> {
  await browser.storage.local.remove(key as string)
}
