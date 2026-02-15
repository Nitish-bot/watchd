// what popup can ask background to do
export type WalletRequest = {
  id: string
  type: string
  payload?: string
}

export enum MessageType {
  UNLOCK = 'UNLOCK',
  CREATE_MNEMONIC = 'CREATE_MNEMONIC',
  GET_TEMP_MNEMONIC = 'GET_TEMP_MNEMONIC',
  SETUP_PASSWORD = 'SETUP_PASSWORD',
}

type WalletPayloads = {
  [MessageType.UNLOCK]: string
  [MessageType.CREATE_MNEMONIC]: string
  [MessageType.GET_TEMP_MNEMONIC]: string
  [MessageType.SETUP_PASSWORD]: string
}

// what background sends back
export type WalletResponse<T extends MessageType> = {
  id: string
} & (
  | { ok: true; result: WalletPayloads[T]; error: null }
  | { ok: false; result: null; error: string }
)
