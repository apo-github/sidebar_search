// テキストが選択されたときに処理を行う

//ページ全体にアクションリスナーを付与
chrome.action.onSelect.addEventListener("select", () => {
    console.log(window.getSelection().toString());
    //サイドパネルを開く
    chrome.sidePanel
    .setPanelBehavior({openPanelOnActionClick: true})
    .catch((error) => console.error(error))
    //選択した単語を取得
    //検索
    //検索結果を表示
});

