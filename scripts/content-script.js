// イベントの取得、画面表示を行う
// 未実装
// ・画像の読み込みに失敗してる問題
// ・サイドバー内の画像リンクを踏めない問題

console.log("Read: content-script.js");

function init(){
  tag_aside = '<div id="extension-insert-area" class="extension-sidebar"></div>'
  const page_body = document.querySelector('body')
  const page_body_array = Array.from(page_body)
  
  console.log(page_body)
  console.log(typeof(page_body))
  
  if(!page_body_array.includes(tag_aside)){
    // サイドバーをページに埋め込む
    page_body.insertAdjacentHTML('beforeEnd', tag_aside);
  }
} 

init()
const sidebar = document.querySelector('.extension-sidebar');

// マウスボタンが離され時
document.addEventListener("mouseup", function () {
    let selectedText = document.getSelection().toString();

    if (selectedText != ""){
      // サイドバーを表示
      sidebar.classList.add("extension-sidebar-open");
      //urlをbackgroundに送信
      let url = "https://www.google.com/search?q=" + selectedText
      console.log(selectedText);
      chrome.runtime.sendMessage({ url: url });
     }
  });

//マウスがサイドバーから離れたとき
sidebar.onmouseleave = function() {
  sidebar.classList.remove("extension-sidebar-open");
}


// 要素挿入関数
function insert_contents(response){
  const insert_area = document.querySelector('#extension-insert-area');

  //子要素をすべて削除
  while (insert_area.firstChild) {
    insert_area.removeChild(insert_area.firstChild);
  }

  //新たな要素を挿入
  console.log(insert_area);
  insert_area.insertAdjacentHTML('beforeEnd', response);
}

// backgroundから受け取った検索結果を画面に表示する
chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {
  insert_contents(request.response);
});







