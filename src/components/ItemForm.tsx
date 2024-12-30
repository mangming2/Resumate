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
      <InputWrapper>
        <InputGroup>
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력"
        />
        <StyledInput
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용 입력"
        />
      </InputGroup>
      <Button type="submit">항목 추가</Button>
      </InputWrapper>
    </Form>
  )
}

const Form = tw.form`
  w-full
`

const InputWrapper = tw.div`
  flex w-full gap-2
`

const InputGroup = tw.div`
  flex flex-1 gap-2
`

const StyledInput = tw.input`
  flex w-100
  border rounded-2
  p-2
`

const Button = tw.button`
  shrink-0
  bg-navy text-white px-3 py-1 rounded-4
  hover:bg-deepBlue
  cursor-pointer
  font-14-r
` 