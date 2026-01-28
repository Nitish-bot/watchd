import { createKeyPairFromPrivateKeyBytes } from '@solana/kit'
import { mnemonicToSeed } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import nacl from 'tweetnacl'

export async function deriveSolanaKeypair(mnemonic: string) {
  const seed = await mnemonicToSeed(mnemonic)

  const derivationPath = "m/44'/501'/0'/0'"
  const derived = derivePath(derivationPath, seed.toString('hex')).key

  const privateKey = nacl.sign.keyPair.fromSeed(derived)
  const keypair = await createKeyPairFromPrivateKeyBytes(privateKey.secretKey)

  return keypair
}
