import { Button } from '@/components/base/button/button'

export default function CreateWallet() {
  return (
    <div>
      <MnemonicGrid />
      <div></div>
    </div>
  )
}

function MnemonicGrid() {
  return (
    <div className="grid-row-4 grid grid-cols-3 gap-4">
      <Button size="sm" color="secondary" className="font-normal">
        whispering
      </Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
    </div>
  )
}
