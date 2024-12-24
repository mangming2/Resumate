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
      
      <GroupContent
        onDragOver={handleDragOver}
      >
        {items.map((item, index) => (
          <ItemWrapper 
            key={item.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <DraggableBox
              title={item.title}
              content={item.content}
              onUpdateTitle={(newTitle) => onUpdateItemTitle(groupId, item.id, newTitle)}
              onUpdateContent={(newContent) => onUpdateItemContent(groupId, item.id, newContent)}
              onDelete={() => onDeleteItem(groupId, item.id)}
              onDragStart={(e) => {
                e.dataTransfer.setData('sourceIndex', index.toString())
                onDragStart(e, item.content)
                
                // 드래그 고스트 이미지 커스터마이즈
                const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
                dragImage.style.opacity = '0.5'
                dragImage.style.position = 'absolute'
                dragImage.style.top = '-1000px'
                document.body.appendChild(dragImage)
                e.dataTransfer.setDragImage(dragImage, 0, 0)
                
                // cleanup
                setTimeout(() => {
                  document.body.removeChild(dragImage)
                }, 0)
              }}
            />
          </ItemWrapper>
        ))}
      </GroupContent>
    </GroupContainer>
  )
}

const GroupContainer = tw.div`
  flex flex-col bg-border rounded-8 p-4 gap-4
`

const GroupTitle = tw.h2`
  font-22-sb
  text-gray-700
`

const GroupContent = tw.div`
  flex flex-col gap-4
`

const GroupHeader = tw.div`
  flex items-center mb-3
`

const ButtonGroup = tw.div`
  flex gap-2
`

const EditButton = tw.button`
  text-blue text-sm 
`

const DeleteButton = tw.button`
  bg-red text-white px-3 py-1 rounded-4
  hover:bg-red 
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

const ItemWrapper = tw.div`
  relative
`


