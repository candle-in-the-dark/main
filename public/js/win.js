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

const logOutButton = $("#logout")

const logCheck = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: '/token'
};

const logOut = {
  type: 'DELETE',
  url: '/token'
};

$.ajax(logCheck)
  .then((check) =>{
    if (check === false) {
      logOutButton.addClass("hidden")
    }
    else{
      logOutButton.removeClass("hidden")
    }
  })
  .catch((err) => console.log(err));

$("#logout").on("click", () => {
  $.ajax(logOut)
      .then(() => {
        logOutButton.addClass("hidden")
        // window.location.href = '../index.html'
      })
      .catch((err) => console.log(err))
});

$('#guestPlay').on('click', () => {
    let numbOfMaps = 3;
    let choice = Math.floor(Math.random() * numbOfMaps) + 1;
    localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': false, 'questScore':0}));
    window.location.href = `../maze.html?mapId=${choice}`;
});
