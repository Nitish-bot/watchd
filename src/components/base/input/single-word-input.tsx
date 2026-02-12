import { useState } from 'react'
import { Input } from './input'

export default function SingleWordInput() {
  const [value, setValue] = useState('')

  const handleChange = (value: string) => {
    let singleWord = value.split(' ').find(val => {
      return val !== ' '
    })

    if (!singleWord) {
      singleWord = ''
    }

    setValue(singleWord)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Optional: Block the spacebar entirely to prevent the cursor from jumping
    if (e.key === ' ') {
      e.preventDefault()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder=""
      />
    </div>
  )
}
