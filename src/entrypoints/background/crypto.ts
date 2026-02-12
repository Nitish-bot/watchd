import { createKeyPairFromPrivateKeyBytes } from '@solana/kit'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import slip10 from 'micro-key-producer/slip10.js'
import nacl from 'tweetnacl'

export function genMnemonic() {
  return generateMnemonic(128)
}

export async function deriveSolanaKeypair(mnemonic: string) {
  const seed = await mnemonicToSeed(mnemonic)
  const root = slip10.fromMasterSeed(seed)

  const derivationPath = "m/44'/501'/0'/0'"
  const derived = root.derive(derivationPath)

  const privateKey = nacl.sign.keyPair.fromSeed(derived.privateKey)
  const keypair = await createKeyPairFromPrivateKeyBytes(privateKey.secretKey)

  return keypair
}
