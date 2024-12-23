import tw from 'twin.macro'
import { DraggableBox } from './DraggableBox'
import { ItemForm } from './ItemForm'

interface DraggableGroupProps {
  groupId: string
  title: string
  items: Array<{
    id: string
    content: string
  }>
  onDragStart: (e: React.DragEvent, content: string) => void
  onAddItem: (groupId: string, content: string) => void
}

export const DraggableGroup = ({ 
  groupId, 
  title, 
  items, 
  onDragStart,
  onAddItem 
}: DraggableGroupProps) => {
  return (
    <GroupContainer>
      <GroupTitle>{title}</GroupTitle>
      <ItemForm onSubmit={(content) => onAddItem(groupId, content)} />
      <GroupContent>
        {items.map((item) => (
          <DraggableBox
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item.content)}
            content={item.content}
          />
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
