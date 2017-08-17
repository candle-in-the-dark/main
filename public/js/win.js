const info = JSON.parse(localStorage.getItem('info'));
const score = info.questScore;

const options = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: `/usernames/scores/quest/win`
}

$.ajax(options)
  .then((result) => {
    result.forEach((element) => {
      const username = element.username;
      $('#user').text(`Congratulations ${username}!!`)
      $('#questScore').text (`You had ${score} seconds remaining when you completed the Quest!`);
    })
  })
  .catch((err) => { });
