import { getBase58Decoder, createKeyPairFromPrivateKeyBytes } from '@solana/kit'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import slip10 from 'micro-key-producer/slip10.js'

export function genMnemonic() {
  return generateMnemonic(128)
}

export async function deriveSolanaKeypair(mnemonic: string) {
  const seed = await mnemonicToSeed(mnemonic)
  const root = slip10.fromMasterSeed(seed)

  const derivationPath = "m/44'/501'/0'/0'"
  const derived = root.derive(derivationPath)

  const keypair = await createKeyPairFromPrivateKeyBytes(derived.privateKey, true)
  const publicKeyBytes = await crypto.subtle.exportKey('raw', keypair.publicKey)
  const publicKeyBuffer = new Uint8Array(publicKeyBytes)

  const decoder = getBase58Decoder()
  const publicKey = decoder.decode(publicKeyBuffer)
  const privateKey = decoder.decode(derived.privateKey)

  return {
    seed,
    derivationPath,
    publicKey,
    privateKey,
  }
}
