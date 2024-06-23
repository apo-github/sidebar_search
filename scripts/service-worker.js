// 検索等を行う

console.log("Read: service-worker.js");

async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}


chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes('chrome://')) {
    chrome.scripting
      .executeScript({
        target : {tabId : tab.id},
        files : [ "./scripts/content-script.js" ],
      })
      .then(() => {
        console.log("script injected");
      });
  }
});


chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  fetch(message.url, {
    'method': 'GET'
  })
  .then(response => {
    return response.text();
  })
  .then(text => {
    getCurrentTab().then((tab) => {
      // console.log(text)
      chrome.tabs.sendMessage(tab.id, {response: text}).catch((error) => { // contextへの送信はtabs.sendMessageしか使えないので注意
        console.log("send ng", error);
      });
    });
    
  })
  .catch((error) => {
    console.log("エラーが発生しました。", error)
  })
  // return true
})



