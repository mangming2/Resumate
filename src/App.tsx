import tw from 'twin.macro'
import './App.css'
import { useState } from 'react'

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}


const App = () => {
  const [items] = useState([
    { id: '1', content: '이력서 내용 1' },
    { id: '2', content: '이력서 내용 2' },
    { id: '3', content: '이력서 내용 3' },
  ])

  const handleDragStart = (e: React.DragEvent, content: string) => {
    // 드래그 시작할 때 데이터 설정
    e.dataTransfer.setData('text/plain', content)
    
    // 현재 탭에 메시지 전송
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0]
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, {
          type: 'DRAG_START',
          content: content
        }).catch(error => console.error('Message sending failed:', error))
      }
    })
  }

  return (
    <Wrapper>
      <Container>
        <Header>Resumate</Header>
        <Content>
          {items.map((item) => (
            <DraggableBox
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.content)}
            >
              {item.content}
            </DraggableBox>
          ))}
        </Content>
      </Container>
    </Wrapper>
  )
}

// 스타일링
const Wrapper = tw.div`
  min-h-screen
  bg-gray-100
  p-4
`

const Container = tw.div`
  bg-white
  rounded-lg
  shadow-lg
  p-6
`

const Header = tw.h1`
  text-2xl
  font-bold
  mb-4
  text-gray-800
`

const Content = tw.div`
  space-y-4
`

const DraggableBox = tw.div`
  p-4
  bg-blue-50
  border
  border-blue-200
  rounded-md
  cursor-move
  hover:bg-blue-100
  transition-colors
`

export default App
