import { useState } from 'react'
import tw from 'twin.macro'
import { DraggableBox } from './DraggableBox'
import { ItemForm } from './ItemForm'

interface DraggableGroupProps {
  groupId: string
  title: string
  items: Array<{ id: string; title: string; content: string }>
  onDragStart: (e: React.DragEvent, content: string) => void
  onAddItem: (groupId: string, title: string, content: string) => void
  onUpdateGroup: (groupId: string, newTitle: string) => void
  onDeleteGroup: (groupId: string) => void
  onUpdateItemTitle: (groupId: string, itemId: string, newTitle: string) => void
  onUpdateItemContent: (groupId: string, itemId: string, newContent: string) => void
  onDeleteItem: (groupId: string, itemId: string) => void
  onReorderItems: (groupId: string, sourceIndex: number, destinationIndex: number) => void
}

export const DraggableGroup = ({ 
  groupId, 
  title,
  items,
  onDragStart,
  onAddItem,
  onUpdateGroup,
  onDeleteGroup,
  onUpdateItemTitle,
  onUpdateItemContent,
  onDeleteItem,
  onReorderItems
}: DraggableGroupProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    const sourceIndex = Number(e.dataTransfer.getData('sourceIndex'))
    if (sourceIndex !== targetIndex) {
      onReorderItems(groupId, sourceIndex, targetIndex)
    }
  }

  return (
    <GroupContainer>
      <GroupHeader>
        {isEditing ? (
          <EditTitleForm onSubmit={(e) => {
            e.preventDefault()
            onUpdateGroup(groupId, editTitle)
            setIsEditing(false)
          }}>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <SaveButton type="submit">저장</SaveButton>
          </EditTitleForm>
        ) : (
          <>
            <GroupTitle>{title}</GroupTitle>
            <ButtonGroup>
              <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
              <DeleteButton onClick={() => onDeleteGroup(groupId)}>삭제</DeleteButton>
            </ButtonGroup>
          </>
        )}
      </GroupHeader>
      
      <ItemForm onSubmit={(title, content) => onAddItem(groupId, title, content)} />
      
      <GroupContent>
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('sourceIndex', index.toString())
              onDragStart(e, item.content)
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <DraggableBox
              title={item.title}
              content={item.content}
              onUpdateTitle={(newTitle) => onUpdateItemTitle(groupId, item.id, newTitle)}
              onUpdateContent={(newContent) => onUpdateItemContent(groupId, item.id, newContent)}
              onDelete={() => onDeleteItem(groupId, item.id)}
            />
          </div>
        ))}
      </GroupContent>
    </GroupContainer>
  )
}

const GroupContainer = tw.div`
  bg-gray-50
  rounded-lg
  p-4
  mb-4
`

const GroupTitle = tw.h2`
  text-xl
  font-semibold
  mb-3
  text-gray-700
`

const GroupContent = tw.div`
  space-y-2
`

const GroupHeader = tw.div`
  flex justify-between items-center mb-3
`

const ButtonGroup = tw.div`
  flex gap-2
`

const EditButton = tw.button`
  text-blue-500 text-sm hover:text-blue-600
`

const DeleteButton = tw.button`
  text-red text-sm hover:text-red
`

const EditTitleForm = tw.form`
  flex gap-2 items-center flex-1
`

const Input = tw.input`
  flex-1 p-2 border rounded
`

const SaveButton = tw.button`
  bg-green text-white px-3 py-1 rounded text-sm
  hover:bg-green
`
