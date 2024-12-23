import tw from 'twin.macro'
import { useState } from 'react'

interface ItemFormProps {
  onSubmit: (content: string) => void
}

export const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content.trim())
      setContent('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새 항목 내용 입력"
      />
      <Button type="submit">항목 추가</Button>
    </Form>
  )
}

const Form = tw.form`
  flex gap-2 mb-3
`

const Input = tw.input`
  flex-1 p-2 border rounded text-sm
`

const Button = tw.button`
  bg-gray-500 text-white px-3 py-1 rounded text-sm
  hover:bg-gray-600
` 