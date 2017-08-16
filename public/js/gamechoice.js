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
      const playQuest = $('<a>').attr('class', 'waves-effect waves-light btn').attr('id', 'playQuest').text('Begin Epic Quest');
      $('#questMode').append(playQuest)
      $('#playQuest').on('click', () => {
        localStorage.setItem('info', JSON.stringify({'runningScore': 0, 'inQuest': true, 'questions':[]}));
        window.location.href = `../maze.html?mapId=1`;
      })
    } else {
      const register = $('<a>').attr('class', 'waves-effect waves-light btn').attr('href', 'register.html').text('Register');
      const login = $('<a>').attr('class', 'waves-effect waves-light btn').attr('href', 'login.html').text('Log In');
      $('#questMode').append(register).append(login);
    }
  })
  .catch((err) => {})

$('#simplePlay').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  localStorage.setItem('info', JSON.stringify({'runningScore': 0, 'inQuest': false}));
  window.location.href = `../maze.html?mapId=${choice}`;
})
