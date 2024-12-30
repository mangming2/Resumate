import { useState } from 'react'
import tw from 'twin.macro'
import { IconDelete, IconSave } from './icon'
import { IconEdit } from './icon'

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
              <SaveButton type="submit"><IconSave width={16} height={16} color='white' /></SaveButton>
            </EditForm>
          ) : (
            <>
              <Title>{title}</Title>
              <EditButton onClick={() => setIsEditingTitle(true)}><IconEdit width={16} height={16} color='white' /></EditButton>
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
              <SaveButton type="submit"><IconSave width={16} height={16} color='white' /></SaveButton>
            </EditForm>
          ) : (
            <>
              <DragHandle
                draggable
                onDragStart={onDragStart}
              >
                <Content>{content}</Content>
              </DragHandle>
              <EditButton onClick={() => setIsEditingContent(true)}><IconEdit width={16} height={16} color='white' /></EditButton>
            </>
          )}
        </ContentArea>
      </ContentSection>
      
      <DeleteButton onClick={onDelete}><IconDelete width={16} height={16} color='white' /></DeleteButton>
    </BoxContainer>
  )
}

const BoxContainer = tw.div`
  flex items-center gap-4 bg-white p-3 rounded-4
  border-solid border-2 border-navy
  hover:shadow-md transition-shadow
  justify-between
`

const ContentSection = tw.div`
  flex items-center gap-4
`

const TitleSection = tw.div`
  flex items-center flex-1 gap-4 p-4
`

const Title = tw.div`
  font-16-sb leading-none m-0
  max-w-100 truncate
`

const ContentArea = tw.div`
  flex gap-4 items-center
`

const Content = tw.div`
  bg-white text-gray-700 p-4 rounded-4
  border-solid border-2 border-blue
  font-14-r m-0 leading-none  
  w-100 truncate
`

const EditForm = tw.form`
  flex gap-2 items-center
`

const Input = tw.input`
  p-1 border rounded-2 max-w-100
`

const EditButton = tw.button`
  flex items-center gap-1 cursor-pointer
  bg-blue text-white px-3 py-1 rounded-4
  border-solid border-1 border-navy
`

const DeleteButton = tw.button`
  flex items-center gap-1 cursor-pointer
  bg-red text-white px-3 py-1 rounded-4
  border-solid border-1 border-navy
`

const SaveButton = tw.button`
  flex items-center gap-1 cursor-pointer
  bg-green text-white px-3 py-1 rounded-4
  border-solid border-1 border-navy
`

const DragHandle = tw.div`
  flex-1
  cursor-move
  
  [&:active]:opacity-70
  [&:active]:scale-[0.98]
  
  transition-all
  duration-200
`