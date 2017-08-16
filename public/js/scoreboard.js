const options = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: '/usernames/scores'
}

$.ajax(options)
  .then((result) => {
    result.forEach((element) => {
      const row = $('<tr>');
      const mapId = $('<td>').text(element.map_id);
      const username = $('<td>').text(element.username);
      const score = $('<td>').text(element.score);
      const quest = $('<td>').text(element.quest);

      $('#scores').append(row.append(mapId).append(username).append(score).append(quest));
    })
  })
  .catch((err) => { });
