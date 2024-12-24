import tw from 'twin.macro'
import { useState } from 'react'

interface GroupFormProps {
  onSubmit: (title: string) => void
}

export const GroupForm = ({ onSubmit }: GroupFormProps) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim())
      setTitle('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새 그룹 이름 입력"
      />
      <Button type="submit">그룹 추가</Button>
    </Form>
  )
}

const Form = tw.form`
  flex gap-2 mb-4
`

const Input = tw.input`
  flex-1 p-2 border rounded
`

const Button = tw.button`
  bg-blue text-white px-4 py-2 rounded
  cursor-pointer
` 