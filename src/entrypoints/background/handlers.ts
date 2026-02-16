import { browser, Browser } from '#imports'

import { deriveSolanaKeypair, genMnemonic } from '@/entrypoints/background/crypto'
import {
  getStorageItemTemp,
  removeStorageItem,
  setStorageItem,
  setStorageItemTemp,
  StorageKey,
} from '@/entrypoints/background/storage'
import {
  MessageType,
  WalletRequest,
  WalletResponse,
  WalletSecrets,
} from '@/types/background-bridge'

export async function handleDisconnect() {
  await browser.storage.local.remove(StorageKey.TEMP_PASS as string)
  await removeStorageItem(StorageKey.TEMP_MNEMONIC)
}

export async function handleMessage(message: WalletRequest, port: Browser.runtime.Port) {
  const { id, type, payload } = message
  switch (type) {
    case MessageType.UNLOCK: {
      const response: WalletResponse<MessageType.UNLOCK> = {
        id: id,
        ok: true,
        result: 'OK',
        error: null,
      }

      port.postMessage(response)
      break
    }

    case MessageType.CREATE_MNEMONIC: {
      const mnemonic = genMnemonic()
      let response: WalletResponse<MessageType.CREATE_MNEMONIC> = {
        id: id,
        ok: true,
        result: mnemonic,
        error: null,
      }

      await setStorageItemTemp(StorageKey.TEMP_MNEMONIC, mnemonic).catch(() => {
        response = {
          id: id,
          ok: false,
          result: null,
          error: 'Could not set mnemonic storage item',
        }
      })

      port.postMessage(response)
      break
    }

    case MessageType.GET_TEMP_MNEMONIC: {
      const mnemonic = await getStorageItemTemp<string>(StorageKey.TEMP_MNEMONIC)
      let response: WalletResponse<MessageType.GET_TEMP_MNEMONIC>
      if (!mnemonic) {
        response = {
          id: id,
          ok: false,
          result: null,
          error: 'Could not get a temporary mnemonic in storage',
        }
      } else {
        response = {
          id: id,
          ok: true,
          result: mnemonic,
          error: null,
        }
      }

      port.postMessage(response)
      break
    }

    case MessageType.SETUP_PASSWORD: {
      const password = payload
      if (!password) {
        port.postMessage({
          id: id,
          ok: false,
          result: null,
          error: 'No password sent',
        })
        break
      }

      const mnemonic = await getStorageItemTemp<string>(StorageKey.TEMP_MNEMONIC)
      if (!mnemonic) {
        port.postMessage({
          id: id,
          ok: false,
          result: null,
          error: 'No temp mnemonic found',
        })
        break
      }

      const { derivationPath, publicKey, privateKey } =
        await deriveSolanaKeypair(mnemonic)
      const walletSecrets: WalletSecrets = {
        mnemonic,
        derivationPath,
        privateKey,
      }

      await setStorageItem<string>(StorageKey.USER_PUBKEY, publicKey, password)
      await setStorageItem<WalletSecrets>(
        StorageKey.WALLET_SECRETS,
        walletSecrets,
        password
      )

      const response = {
        id: id,
        ok: true,
        result: publicKey,
        error: null,
      }
      port.postMessage(response)
      break
    }
  }
}
