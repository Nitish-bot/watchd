import * as Iron from 'iron-webcrypto'

import { browser } from '#imports'

export enum StorageKey {
  TEMP_PASS = 'temp_pass',
  TEMP_MNEMONIC = 'temp_mnemonic',
  USER_PUBKEY = 'user_pubkey',
  WALLET_SECRETS = 'wallet_secrets',
}

type EncryptableData = string | number | boolean | object

const options = {
  ...Iron.defaults,
  encryption: {
    ...Iron.defaults.encryption,
    minPasswordlength: 8,
  },
  integrity: {
    ...Iron.defaults.integrity,
    minPasswordlength: 8,
  },
}

export async function setStorageItem<T extends EncryptableData>(
  key: StorageKey,
  value: T,
  pass: string
): Promise<void> {
  try {
    const encryptedData = await Iron.seal(value, pass, options)
    await browser.storage.local.set({
      [key]: encryptedData,
    })
  } catch (e) {
    console.error(`Error setting storage item ${key}: `, e)
  }
}

export async function getStorageItem<T>(
  key: StorageKey,
  pass: string
): Promise<T | null> {
  try {
    const data = await browser.storage.local.get(key)
    const encryptedData = data[key]
    if (!encryptedData || !(typeof encryptedData == 'string')) {
      console.error('data stored in local storage is not string')
      return null
    }
    const decryptedData = await Iron.unseal(encryptedData, pass, options)
    return decryptedData as T
  } catch (e) {
    console.error(`Error getting storage item ${key}: `, e)
    return null
  }
}

export async function setStorageItemTemp<T extends EncryptableData>(
  key: StorageKey,
  value: T
): Promise<void> {
  const internalPass = (await browser.storage.local.get(StorageKey.TEMP_PASS))[
    StorageKey.TEMP_PASS
  ] as string
  return setStorageItem<T>(key, value, internalPass)
}

export async function getStorageItemTemp<T>(key: StorageKey): Promise<T | null> {
  const internalPass = (await browser.storage.local.get(StorageKey.TEMP_PASS))[
    StorageKey.TEMP_PASS
  ] as string
  return getStorageItem(key, internalPass)
}

export async function removeStorageItem(key: StorageKey): Promise<void> {
  await browser.storage.local.remove(key as string)
}
