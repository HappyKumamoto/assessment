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
    '{userName}んよかところは声ばい。{userName}ん特徴的な声は皆ば惹きつけ、心に残る。  <br > The nice point of {userName} is the voice. The characteristic voice of {userName} is attractive and memorable. <br>{userName}のよきところは声なり。{userName}の特徴やうなる声はみな惹きつけ、心に残る。', 
    
    '{userName}んよかところはまなざしばい。{userName}に見つめられた人は、気になって仕方がなかやろう。 <br >The good point of {userName} is the look. Those who are stared at by {userName} can not help but wonder. ',
    
    '{userName}んよかところは情熱ばい。{userName}ん情熱に周りん人は感化さるる。 <br >The good point of {userName} is passion. The passion of {userName} inspires others. ',
    
    '{userName}んよかところは厳しさばい。{userName}ん厳しさがもんごとばいつも成功に導く。 <br >The nice thing about {userName} is the rigor. The severity of {userName} always leads to success. ',
    
    '{userName}んよかところは知識ばい。博識な{userName}ば多うん人が頼りにしとる。 <br >The good thing about {userName} is knowledge. Many people rely on your wisdom {userName}.' ,
    
    '{userName}んよかところはユニークさばい。{userName}だけんそん特徴が皆ば楽しゅうさする。 <br >The nice thing about {userName} is uniqueness. Your unique feature of {userName} makes everyone happy. ',
    
    '{userName}んよかところは用心深さばい。{userName}ん洞察に、多うん人が助けらるる。 <br > The nice thing about {userName} is caution. Many people can be helped by the insight of {userName}. ',
    
    '{userName}んよかところは見た目ばい。内側から溢れ出る{userName}ん良さに皆が気ば惹かるる。 <br >The nice thing about {userName} is how you looks. Everyone is drawn to the goodness of the {userName} that overflows from the inside. ',
    
    '{userName}んよかところは決断力ばい。{userName}がする決断にいつも助けらるる人がおる。 <br >The good thing about {userName} is that your deterministic. {userName} helps people by making decisions. <br>{userName}のよきところは決断力なり。{userName}のする決断に日ごろ助けらるる人あり。',
    
    '{userName}んよかところは思いやりばい。{userName}に気ばかけてもろうた多うん人が感謝しとる。 <br >The nice thing about {userName} is compassion. Many people are grateful for you. ',
    
    '{userName}んよかところは感受性ばい。{userName}が感じたことに皆が共感し、わかりあいきる。 <br >The nice thing about {userName} is sensitivity. Everyone can empathize and understand what {userName} feels. ',
    
    '{userName}んよかところは節度ばい。強引すぎん{userName}ん考えに皆が感謝しとる。 <br >The good thing about {userName} is that it has a modest attitude. Everyone is grateful to you for not pushing your thoughts. ',
    
    '{userName}んよかところは好奇心ばい。新しかことに向かっていく{userName}ん心構えが多うん人に魅力的に映る。 <br >The good thing about {userName} is curiosity. Your attitude towards new things will appeal to many people. ',
    
    '{userName}んよかところは気配りばい。{userName}ん配慮が多うん人ば救うとる <br >The nice thing about {userName} is that you can be attentive. You are saving a lot of people. ',
    
    '{userName}んよかところはそん全てばい。ありんままん{userName}自身がよかところなんや。 <br >The good thing about {userName} is that all. You are what you are. ',
    
    '{userName}んよかところは自制心ばい。やばかて思うたときにしっかと衝動ば抑えらるる{userName}が皆から評価されとる。 <br > The nice thing about {userName} is self-control. You are praised for ability to control your urges in times of danger. ' ,
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
      assessment('太郎') ===  '{userName}んよかところは決断力ばい。{userName}がする決断にいつも助けらるる人がおる。 <br >The good thing about {userName} is that your deterministic. {userName} helps people by making decisions. <br>{userName}のよきところは決断力なり。{userName}のする決断に日ごろ助けらるる人あり。',     '診断結果ん文言ん特定ん部分ば名前に置き換ゆる処理が正しゅうなかとです。'
  );
  console.assert(
      assessment('太郎') === assessment('太郎'),
     '入力が同じ名前なら同じ診断結果ば出力する処理が正しゅうなかとです。'
  );
})();
