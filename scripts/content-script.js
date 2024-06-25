// イベントの取得、画面表示を行う
// 未実装
// ・1. 画像の読み込みに失敗してる問題 
// ・2. サイドバー内の画像リンクを踏めない問題
//  (Shadow Rootでは1.2ともうまくいかなかった。原因=> URLが相対パスになっているため)

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
const insert_area = document.querySelector('#extension-insert-area');
// const shadowRoot = insert_area.attachShadow({ mode: "open" });  // open：スクリプトで参照できるようにする。 closed：スクリプトで参照できないようにする。

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
  

  //子要素をすべて削除
  while (insert_area.firstChild) {
    insert_area.removeChild(insert_area.firstChild);
  }

  //新たな要素を挿入
  console.log(insert_area);
  // DOMParserを使ってDOMに変換
  console.log("レスポンスタイプ=> ", typeof(response))// DOMに変換
  insert_area.innerHTML = response
  
  replace_path_relative_to_absolute();
  // shadowRoot.insertAdjacentHTML('beforeEnd', response);
}

function absolutePath(path) {
  const baseUrl = "https://www.google.com"
  let url = new URL(path, baseUrl);
  return url.href;
}

function replace_path_relative_to_absolute(){
  // aタグ取得
  const tag_a = insert_area.querySelectorAll('a'); //<a href="/image/・・・">
  // imgタグ取得
  const tag_img = insert_area.querySelectorAll('img');
  
  // aタグ置き換え
  tag_a.forEach((element, _index) => {
    // hrefの中身置き換え
    if (!element.href.match(/https?:\/\//)){
      abs_path = absolutePath(element.href);
      element.href = abs_path;
    }
  });

  tag_img.forEach((element, _index) => {
    // hrefの中身置き換え
    if (!element.src.match(/https?:\/\//)){
      abs_path = absolutePath(element.src);
      element.src = abs_path;
    }
  });

  tag_a.forEach((element, _index) => {
    console.log(element);
  });

}



// backgroundから受け取った検索結果を画面に表示する
chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {

  insert_contents(request.response);
});







