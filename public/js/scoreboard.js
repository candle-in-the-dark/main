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
  if (info.inQuest === true || info.lastMap < 1) {
    renderScores('quest');
    $('#title').text('Scores for the Quest')
  } else {
    renderScores(parseInt(info.lastMap))
    $('#title').text(`Scores for Map ${info.lastMap}`);
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
    if (result[0].quest !== false) {
      for (let i = 1; i < result.length; i++) {
        for (let j = 0; j < i; j++) {
          if (result[i].username === result[j].username) {
            result.splice(i, 1)
          }
        }
      }
    }
    //put this down here to avoid a flicker effect waiting for an asynchronous call to conclude
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

const logCheck = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: '/token'
}
const logOut = {
  type: 'DELETE',
  url: '/token'
}

const logOutButton = $("#logout")
const login = $("#login")
const register = $("#register")
const guestPlay = $("#guestPlay")

$.ajax(logCheck)
.then((check) =>{
  if (check === false) {
    logOutButton.addClass("hidden")
  }
  else{
    guestPlay.text('Play Again')
    logOutButton.removeClass("hidden")
    login.addClass("hidden")
    register.addClass("hidden")

  }
})
.catch((err) => console.log(err))

$("#logout").on("click", () => {
  $.ajax(logOut)
    .then(() => {
      guestPlay.text("Guest Play")
      logOutButton.addClass("hidden")
      login.removeClass("hidden")
      register.removeClass("hidden")
    })
    .catch((err) => console.log(err))
})

$('#guestPlay').on('click', () => {
  if (register.hasClass('hidden')) {
    window.location.href = '../gamechoice.html'
  } else {
    let numbOfMaps = 3;
    let choice = Math.floor(Math.random() * numbOfMaps) + 1;
    localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': false, 'questScore':0}));
    window.location.href = `../maze.html?mapId=${choice}`;
  }
})
