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
      // const quest =
      $('#singlePlay').append(row.append(mapId).append(username).append(score));
    })
  })
  .catch((err) => { });
