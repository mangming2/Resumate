// 사이드 패널을 액션 버튼 클릭으로 열리도록 설정
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// 메시지 리스너 설정
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "openSidePanel") {
    chrome.sidePanel.open({ windowId: sender.tab.windowId });
  }
});