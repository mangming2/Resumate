import { useState } from 'react'
import tw from 'twin.macro'

interface DraggableBoxProps {
  title: string
  content: string
  onUpdateTitle: (newTitle: string) => void
  onUpdateContent: (newContent: string) => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent) => void
}

export const DraggableBox = ({ 
  title, 
  content, 
  onUpdateTitle, 
  onUpdateContent, 
  onDelete,
  onDragStart
}: DraggableBoxProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editContent, setEditContent] = useState(content)

  return (
    <BoxContainer>
      <ContentSection>
        <TitleSection>
          {isEditingTitle ? (
            <EditForm onSubmit={(e) => {
              e.preventDefault()
              onUpdateTitle(editTitle)
              setIsEditingTitle(false)
            }}>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <SaveButton type="submit">저장</SaveButton>
            </EditForm>
          ) : (
            <>
              <Title>{title}</Title>
              <EditButton onClick={() => setIsEditingTitle(true)}>수정</EditButton>
            </>
          )}
        </TitleSection>

        <ContentArea>
          {isEditingContent ? (
            <EditForm onSubmit={(e) => {
              e.preventDefault()
              onUpdateContent(editContent)
              setIsEditingContent(false)
            }}>
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <SaveButton type="submit">저장</SaveButton>
            </EditForm>
          ) : (
            <>
              <DragHandle
                draggable
                onDragStart={onDragStart}
              >
                <Content>{content}</Content>
              </DragHandle>
              <EditButton onClick={() => setIsEditingContent(true)}>수정</EditButton>
            </>
          )}
        </ContentArea>
      </ContentSection>
      
      <DeleteButton onClick={onDelete}>삭제</DeleteButton>
    </BoxContainer>
  )
}

const BoxContainer = tw.div`
  bg-white p-3 rounded shadow-sm
  flex flex-col gap-2
  hover:shadow-md transition-shadow
`

const ContentSection = tw.div`
  flex-1
`

const TitleSection = tw.div`
  flex items-center justify-between mb-2
  border-b pb-2
`

const Title = tw.h3`
  font-semibold text-gray-800
`

const ContentArea = tw.div`
  flex items-center justify-between
`

const Content = tw.div`
  text-gray-600 flex-1
`

const EditForm = tw.form`
  flex gap-2 items-center flex-1
`

const Input = tw.input`
  flex-1 p-1 border rounded text-sm
`

const EditButton = tw.button`
  text-blue-500 text-sm hover:text-blue-600
`

const DeleteButton = tw.button`
  text-red text-sm hover:text-red
  self-end
`

const SaveButton = tw.button`
  bg-green text-white px-2 py-1 rounded text-sm
  hover:bg-green
`

const DragHandle = tw.div`
  flex-1
  cursor-move
  
  [&:active]:opacity-70
  [&:active]:scale-[0.98]
  
  transition-all
  duration-200
`