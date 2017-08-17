// const info = JSON.parse(localStorage.getItem('info'));
// const score = info.questScore;

const questGet = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: `/usernames/scores/quest/win`
}

$.ajax(questGet)
  .then((result) => {
    const username = result.username;
    const questscore = result.questscore;
    $('#user').text(`Congratulations ${username}!!`)
    $('#questScore').text (`You had ${score} seconds remaining when you completed the Quest!`);

  })
  .catch((err) => { });
