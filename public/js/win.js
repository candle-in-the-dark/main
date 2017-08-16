const info = JSON.parse(localStorage.getItem('info'));
const map = info.lastMap;
const score = $('<td>').text(info.questScore);
// console.log(info.quest);

const options = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: `/usernames/scores/${map}`
}
$.ajax(options)
  .then((result) => {
    result.forEach((element) => {
      const row = $('<tr>');
      const username = element.username;
      $('#title').text(`Quest Score for ${username}`);
      $('#records').append(row.append(score));
    })
  })
  .catch((err) => { });
