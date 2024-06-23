// イベントの取得、画面表示を行う
// 未実装
// ・画像の読み込みに失敗してる問題
// ・サイドバー内の画像リンクを踏めない問題
// ・内部で遷移できない問題
// ・スクロール多重問題
// ・importantをやめる

console.log("Read: content-script.js");

function init(){
  tag_aside = '<div id="extension-sidebar-wrapper"><iframe id="extension-sidebar"></iframe></div>'
  const page_body = document.getElementsByTagName('body')[0]
  const page_body_array = Array.from(page_body)
  
  console.log(page_body)
  console.log(typeof(page_body))
  
  if(!page_body_array.includes(tag_aside)){
    // サイドバーをページに埋め込む
    page_body.insertAdjacentHTML('beforeEnd', tag_aside);
  }
} 

init()
const extension_sidebar = document.querySelector('#extension-sidebar'); // iframeを取得
const extension_sidebar_wrapper = document.querySelector('#extension-sidebar-wrapper'); // iframeのwrapperを取得


// マウスボタンが離され時
document.addEventListener("mouseup", function () {
  //テキストが選択されたとき
  let selectedText = document.getSelection().toString();
  let url = "https://www.google.com/search?q=" + selectedText + "&igu=1"
  console.log(selectedText);

  if (selectedText != ""){
    // サイドバーを表示
    extension_sidebar_wrapper.classList.add("extension-sidebar-open");
    
    // iframe 中身書き換え 
    extension_sidebar.contentDocument.location.replace(url);

    // //urlをbackgroundに送信
    // chrome.runtime.sendMessage({ url: url });
  }
});

//マウスがサイドバーから離れたとき
extension_sidebar_wrapper.onmouseleave = function() {
  extension_sidebar_wrapper.classList.remove("extension-sidebar-open");
}




// function insert_contents(response){
//   const insert_area = document.querySelector('#extension-insert-area')

//   //子要素をすべて削除
//   while (insert_area.firstChild) {
//     insert_area.removeChild(insert_area.firstChild);
//   }

//   //新たな要素を挿入
//   console.log(insert_area);
//   insert_area.insertAdjacentHTML('beforeEnd', response);
// }

// // backgroundから受け取った検索結果を画面に表示する
// chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {
//   insert_contents(request.response);
// });







