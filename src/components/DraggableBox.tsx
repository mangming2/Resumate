import React from 'react'
import tw from 'twin.macro'

interface DraggableBoxProps {
    key: string
    draggable: boolean
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
    content : string
}

export const DraggableBox = ({ key, draggable, onDragStart, content }: DraggableBoxProps) => {
  return (
    <Wrapper
        key={key}
        draggable={draggable}
        onDragStart={onDragStart}
    >
        <Content>
            {content}
        </Content>
    </Wrapper>
  )
}


const Wrapper = tw.div`
  p-4
  bg-blue-50
  border
  border-blue-200
  rounded-md
  cursor-grab
  hover:bg-blue-100
  transition-colors
`

const Content = tw.div`
  p-4
  text-gray-800
`