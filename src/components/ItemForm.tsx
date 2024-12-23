import tw from 'twin.macro'
import { useState } from 'react'

interface ItemFormProps {
  onSubmit: (title: string, content: string) => void
}

export const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim())
      setTitle('')
      setContent('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목 입력"
        />
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용 입력"
        />
      </InputGroup>
      <Button type="submit">항목 추가</Button>
    </Form>
  )
}

const Form = tw.form`
  flex flex-col gap-2 mb-3
`

const InputGroup = tw.div`
  flex gap-2
`

const Input = tw.input`
  flex-1 p-2 border rounded text-sm
`

const Button = tw.button`
  bg-gray-500 text-white px-3 py-1 rounded text-sm
  hover:bg-gray-600
` 