import { browser, Browser } from '#imports'
import { genMnemonic } from '@/entrypoints/background/crypto'
import { getStorageItem, removeStorageItem, setStorageItem, StorageKey } from './storage'
import { MessageType, WalletRequest, WalletResponse } from '@/types/background-bridge'

export async function handleDisconnect() {
  await browser.storage.local.remove(StorageKey.TEMP_PASS as string)
  await removeStorageItem(StorageKey.TEMP_MNEMONIC)
}

export async function handleMessage(message: WalletRequest, port: Browser.runtime.Port) {
  const { id, type } = message
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

      await setStorageItem(StorageKey.TEMP_MNEMONIC, mnemonic).catch(() => {
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
      const mnemonic = await getStorageItem<string>(StorageKey.TEMP_MNEMONIC)
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
  }
}
