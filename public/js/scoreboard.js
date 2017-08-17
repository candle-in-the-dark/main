const info = JSON.parse(localStorage.getItem('info'));

const getMaps = {
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    url: '/maps'
}
$.ajax(getMaps)
.then((result) => {
  renderButtons(result);
  renderQuestButton();
  if (info.inQuest) {
    renderScores('quest');
    $('#title').text('Scores for the Quest')
  } else if (info.lastMap !== '0'){
    renderScores(parseInt(info.lastMap))
    $('#title').text(`Scores for Map ${info.lastMap}`);
  } else {
    $('#title').text('Click a button to display scores for that map!')
  }
})
.catch((err) => {})

function renderQuestButton() {
  const button = $('<a>').addClass('button').attr('id', 'quest').text('Quest')
  button.on('click', (() => {
    $('#title').text('Scores for the Quest')
    renderScores('quest');
  }))
  $('#buttons').append(button)
}

function renderButtons(mapArray) {
  mapArray.forEach(function(element) {
    const id = parseInt(element.id)
    const button = $('<a>').addClass('button').attr('id', id).text(`Map ${id}`)
    button.on('click', (() => {
      $('#title').text(`Scores for Map ${id}`);
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
    if (mapId === 3) {
      result = result.filter(function(element) {
        if (element.quest === false) {
          return element;
        }
      })
    }
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
