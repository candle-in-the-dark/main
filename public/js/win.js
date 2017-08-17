const info = JSON.parse(localStorage.getItem('info'));
const score = info.questScore;
const questGet = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: `/token/quest`
}

$.ajax(questGet)
  .then((result) => {
    return $.ajax({contentType: 'application/json', dataType: 'json', type: 'GET', url: `users/${result.userId}`})
  })
  .then((data) => {
    const username = data.username;
    $('#user').text(`Player: ${username}`)
    $('#questScore').text (`Time Remaining: ${score}`);
  })
  .catch((err) => console.log(err));
