//if(confirm("開発が好きですか？")){
//  alert("OK")
//}else{
//  alert("NG")
//}
// //{
//  // if (! $('form')[0].reportValidity()) {
//  //   return false;
//  // }

//  //// $('form').submit();
// }


     function changeAction() {
      const food = $('input[name="food"]').val();
      fetch("https://favorite-foods-app.herokuapp.com/foods", {
        method: "POST",
        body: '{"food":"' + food + '"}',
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer bananajuice",
        }),
      })
        .then((res) => {
          console.log(res.status); //確認用
          if (!res.ok) {
            throw new Error("fail");
          }
          return res.text(); //json
        })
        .then((data) => {
          // 送信完了
          showAlert("送信に成功しました。");
          console.log(data);
        })
        .catch((error) => {
          showAlert("送信に失敗しました。");
          console.error(error);
        });
    }
      
//送信メッセージレイアウト
//送信メッセージ表示
function showAlert(msg) {
  var $alert = $("<div>").prependTo($("#container")).addClass("alert");
  $alert
    .hide()
    .text(msg)
    .fadeIn(3000, function () {
      $alert.fadeOut(3000, function () {
        $alert.remove();
        $('input[name="food"]').val("");
      });
    });
}

function formCheck() {
  if (
    $("#name").val() === "" ||
    $("#email").val() === "" ||
    $("#message").val() === ""
  ) {
    return false;
  }
  return true;
}

function downloadCSV() {
  //入力フォームcheck
  const flag = formCheck();

  console.log(flag);
  if(flag){
    //ダウンロードするCSVファイル名を指定する
    const filename = "download.csv";
    //CSVデータ
    const inputs = $(".input")
      .map((_, element) => {
        return element.value;
      })
      .get()
      .join(",");

    //BOMを付与する（Excelでの文字化け対策）
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    //Blobでデータを作成する
    const blob = new Blob([bom, inputs], { type: "text/csv" });

    //IE10/11用
    //download属性が機能しないためmsSaveBlobを使用する
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, filename);

      //その他ブラウザ
    } else {
      //BlobからURLを作成する
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      //ダウンロード用にリンクを作成する
      const download = document.createElement("a");
      //リンク先に上記で生成したURLを指定する
      download.href = url;
      //download属性にファイル名を指定する
      download.download = filename;
      //作成したリンクをクリックしてダウンロードを実行する
      download.click();
      //createObjectURLで作成したURLを開放する
      (window.URL || window.webkitURL).revokeObjectURL(url);
    }
    showAlert("出力に成功しました。");
  }else{
    showAlert("出力に失敗しました。");
  }
}

//ボタンを取得する
const download = document.getElementById("download");
//ボタンがクリックされたら「downloadCSV」を実行する
download.addEventListener("click", downloadCSV, false);