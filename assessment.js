(function() {
  'use strict';
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  /**
   * 指定した要素の子どもを全て除去する
   * @param {HTMLElement} element HTMLの要素
   */
  function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり除去
      element.removeChild(element.firstChild);
    }
  }

  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerHTML = 'Your "Especially Good Point" is・・・';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerHTML = result;
    resultDivided.appendChild(paragraph);

     // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あたんよかところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerHTML = 'Tweet #あたんよかところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

  userNameInput.onkeydown = event => {
    if (event.keyCode === 13) {
      assessmentButton.onclick();
    }
  };

  const answers = [
    '{userName}んよかところは声ばい。{userName}ん特徴的な声は皆ば惹きつけ、心に残る。  <br > One of the nice point of {userName} is the voice. Your characteristic voice  is attractive and memorable. ', 
    
    '{userName}んよかところはまなざしばい。{userName}に見つめられた人は、気になって仕方がなかやろう。 <br >One of the good point of {userName} is your facial expression of eyes. Those who were stared by you will keeps an eye on you. ',
    
    '{userName}んよかところは情熱ばい。{userName}ん情熱に周りん人は感化さるる。 <br >One of the good point of {userName} is passion. Your passion inspire others. ',
    
    '{userName}んよかところは厳しさばい。{userName}ん厳しさがもんごとばいつも成功に導く。 <br >One of the nice thing of {userName} is your strictness. Your strictness always lead everything to success. ',
    
    '{userName}んよかところは知識ばい。博識な{userName}ば多うん人が頼りにしとる。 <br >One of the good point of {userName} is knowledge. Many people rely on your wisdom.' ,
    
    '{userName}んよかところはユニークさばい。{userName}だけんそん特徴が皆ば楽しゅうさする。 <br >One of the good point of {userName} is uniqueness. Your unique feature  make everyone happy. ',
    
    '{userName}んよかところは用心深さばい。{userName}ん洞察に、多うん人が助けらるる。 <br > One of the nice thing of {userName} is carefullness. Many people can be helped by your insights.  ',
    
    '{userName}んよかところは見た目ばい。内側から溢れ出る{userName}ん良さに皆が気ば惹かるる。 <br >One of the good point of {userName} is how you looks. Everyone is drawn to the goodness of your overflows from the inside. ',
    
    '{userName}んよかところは決断力ばい。{userName}がする決断にいつも助けらるる人がおる。 <br >One of the good thing of {userName} is that your deterministic. You help people by making decisions. ',
    
    '{userName}んよかところは思いやりばい。{userName}に気ばかけてもろうた多うん人が感謝しとる。 <br >One of the nice thing of {userName} is compassion. Many people are grateful for you. ',
    
    '{userName}んよかところは感受性ばい。{userName}が感じたことに皆が共感し、わかりあいきる。 <br >One of the nice thing of {userName} is your rich sensitivity. Everyone can empathize and understand what you feel. ',
    
    '{userName}んよかところは節度ばい。強引すぎん{userName}ん考えに皆が感謝しとる。 <br >One of the good thing of {userName} is that it has a modest attitude. Everyone is grateful to you for not pushing your thoughts. ',
    
    '{userName}んよかところは好奇心ばい。新しかことに向かっていく{userName}ん心構えが多うん人に魅力的に映る。 <br >One of the good thing of {userName} is curiosity. Your attitude towards new things will appeal to many people. ',
    
    '{userName}んよかところは気配りばい。{userName}ん配慮が多うん人ば救うとる <br >One of the nice thing of {userName} is that you can be attentive. You are saving a lot of people. ',
    
   '{userName}んよかところは自制心ばい。やばかて思うたときにしっかと衝動ば抑えらるる{userName}が皆から評価されとる。 <br > One of the good point of {userName} is self-control. You are praised for ability to control your urges in times of danger. ' ,
    
    '{userName}んよかところは優しさばい。あたん優しか雰囲気や立ち居振る舞いに多うん人が癒やされとる。<br> One of the good point of {userName} is kindness. Many people have been healed by your gentle atmosphere and behavior. '
  ];
  /**
   * 名前の文字列を渡すと診断結果を返す関数
   * @param {string} userName ユーザーの名前
   * @return {string} 診断結果
   */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/{userName}/g, userName);
    return result;
  }

  // テストコード
  console.assert(
      assessment('太郎') ==='{太郎}んよかところは決断力ばい。{太郎}がする決断にいつも助けらるる人がおる。 <br >One of the good thing of {太郎} is that your deterministic. You help people by making decisions. ', '診断結果ん文言ん特定ん部分ば名前に置き換ゆる処理が正しゅうなかとです。'
  );
  console.assert(
      assessment('太郎') === assessment('太郎'),
     '入力が同じ名前なら同じ診断結果ば出力する処理が正しゅうなかとです。'
  );
})();
