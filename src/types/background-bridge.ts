// what popup can ask background to do
export type WalletRequest = {
  id: string
  type: 'CREATE_WALLET'
}

// what background sends back
export type WalletResponse =
  | {
      id: string
      ok: true
      result: {
        publicKey: string
        mnemonic: string
      }
    }
  | {
      id: string
      ok: false
      error: string
    }
