const getMaps = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    url: '/maps'
}
$.ajax(getMaps)
.then((result) => {
  renderButtons(result);
})
.catch((err) => {})

function renderButtons(mapArray) {
  mapArray.forEach(function(element) {
    const id = parseInt(element.id)
    const button = $('<a>').addClass('button').attr('id', id).text(`Map ${id}`)
    button.on('click', (() => {
      $('#title').text(`Scores for map ${id}`);
      renderScores(id);
    }));
    $('#buttons').append(button)
  })
}


function renderScores(mapId) {
  const options = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
  }
  if (mapId === 'quest') {
    options.url = '/usernames/scores/quest'
  } else {
    options.url = `/usernames/scores/${mapId}`
  }
  $.ajax(options)
  .then((result) => {
    result.sort(function (a, b){
      return b.score - a.score;
    });
    //put this down here to avoid a flicker effect between asynchronous calls
    $('#scores').empty();
    result.forEach((element) => {
      const row = $('<tr>');
      const username = $('<td>').text(element.username);
      const score = $('<td>').text(element.score);

      $('#scores').append(row.append(username).append(score));
    })
  })
  .catch((err) => { });
}
