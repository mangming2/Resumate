import tw from 'twin.macro'
import './App.css'

const App = () => {
  return (
    <Wrapper>
      <Container>
        <Header>Resumate</Header>
        <Content>
          <p>여기에 이력서 관련 컨텐츠가 들어갑니다.</p>
        </Content>
      </Container>
    </Wrapper>
  )
}

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

export default App
