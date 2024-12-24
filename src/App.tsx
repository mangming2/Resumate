import tw from 'twin.macro'
import { useState, useEffect } from 'react'
import { DraggableGroup } from './components/DraggableGroup'
import { GroupForm } from './components/GroupForm'
import { loadGroups, saveGroups } from './db/db'

const App = () => {
  const [groups, setGroups] = useState([
    {
      id: '1',
      title: '자기소개',
      items: [
        { id: '1-1', title: '학력', content: '서울대학교 졸업' },
        { id: '1-2', title: '자격증', content: 'TOEIC 900점' },
      ]
    },
    {
      id: '2',
      title: '경력사항',
      items: [
        { id: '2-1', title: '회사', content: '이력서 내용 3' },
        { id: '2-2', title: '프로젝트', content: '이력서 내용 4' },
      ]
    }
  ])

  // 초기 데이터 로드
  useEffect(() => {
    loadGroups().then(savedGroups => {
      if (savedGroups.length > 0) {
        setGroups(savedGroups)
      }
    }).catch(error => console.error('Failed to load groups:', error))
  }, [])

  // groups가 변경될 때마다 저장
  useEffect(() => {
    saveGroups(groups).catch(error => 
      console.error('Failed to save groups:', error)
    )
  }, [groups])

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

  const handleAddGroup = (title: string) => {
    const newGroup = {
      id: Date.now().toString(),
      title,
      items: []
    }
    setGroups([...groups, newGroup])
  }

  const handleAddItem = (groupId: string, title: string, content: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: [...group.items, {
            id: `${groupId}-${Date.now()}`,
            title,
            content
          }]
        }
      }
      return group
    }))
  }

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId))
  }

  const handleUpdateGroup = (groupId: string, newTitle: string) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, title: newTitle } : group
    ))
  }

  const handleUpdateItemTitle = (groupId: string, itemId: string, newTitle: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.map(item => 
            item.id === itemId ? { ...item, title: newTitle } : item
          )
        }
      }
      return group
    }))
  }

  const handleUpdateItemContent = (groupId: string, itemId: string, newContent: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.map(item => 
            item.id === itemId ? { ...item, content: newContent } : item
          )
        }
      }
      return group
    }))
  }

  const handleDeleteItem = (groupId: string, itemId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.filter(item => item.id !== itemId)
        }
      }
      return group
    }))
  }

  const handleReorderItems = (groupId: string, sourceIndex: number, destinationIndex: number) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const newItems = [...group.items]
        const [removed] = newItems.splice(sourceIndex, 1)
        newItems.splice(destinationIndex, 0, removed)
        return { ...group, items: newItems }
      }
      return group
    }))
  }

  return (
    <Wrapper>
      <Container>
        <Header>Resumate 🤝</Header>
        <GroupForm onSubmit={handleAddGroup} />
        <Content>
          {groups.map((group) => (
            <DraggableGroup
              key={group.id}
              groupId={group.id}
              title={group.title}
              items={group.items}
              onDragStart={handleDragStart}
              onAddItem={handleAddItem}
              onUpdateGroup={handleUpdateGroup}
              onDeleteGroup={handleDeleteGroup}
              onUpdateItemTitle={handleUpdateItemTitle}
              onUpdateItemContent={handleUpdateItemContent}
              onDeleteItem={handleDeleteItem}
              onReorderItems={handleReorderItems}
            />
          ))}
        </Content>
      </Container>
    </Wrapper>
  )
}

// 스타일링
const Wrapper = tw.div`
  flex flex-col items-center 
  bg-gray-100 px-4
  min-h-screen
`

const Container = tw.div`
  bg-white rounded-8 p-3 gap-4
  w-[337px]
`

const Header = tw.div`
  flex items-center justify-center
  font-26-sb leading-none py-4
`

const Content = tw.div`
  flex flex-col gap-4
`


export default App
