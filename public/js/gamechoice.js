const getStatus = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: '/token'
}
$.ajax(getStatus)
  .then((result) => {
    if (result) {
      $('#questTitle').text('Play Quest Mode')
      //we'relogged in do work!!!!
      const playQuest = $('<a>').attr('class', 'button').attr('id', 'playQuest').text('Begin Epic Quest');
      $('#questMode').append(playQuest)
      $('#playQuest').on('click', () => {
        localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': true, 'questions':[], 'questScore':0}));
        window.location.href = `../maze.html?mapId=1`;
      })
    } else {
      const register = $('<a>').attr('class', 'button').attr('href', 'register.html').text('Register');
      const login = $('<a>').attr('class', 'button').attr('href', 'login.html').text('Log In');
      $('#questMode').append(register).append(login);
    }
  })
  .catch((err) => {})

$('#simplePlay').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': false, 'questScore':0}));
  window.location.href = `../maze.html?mapId=${choice}`;
})
