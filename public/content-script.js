// 웹페이지의 모든 input 요소에 드롭 이벤트 리스너 추가
function addDropListeners() {
  const inputs = document.querySelectorAll('input[type="text"], textarea')
  
  inputs.forEach(input => {
    input.addEventListener('dragover', (e) => {
      e.preventDefault()
      input.style.backgroundColor = '#f0f9ff' // 드래그 오버 시 시각적 피드백
    })

    input.addEventListener('dragleave', (e) => {
      e.preventDefault()
      input.style.backgroundColor = '' // 원래 배경색으로 복구
    })

    input.addEventListener('drop', (e) => {
      e.preventDefault()
      const content = e.dataTransfer.getData('text/plain')
      input.value = content
      input.style.backgroundColor = ''
    })
  })
}

// 페이지 로드 시 리스너 추가
addDropListeners()

// DOM 변경 감지하여 새로운 input 요소에도 리스너 추가
const observer = new MutationObserver(() => {
  addDropListeners()
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})
