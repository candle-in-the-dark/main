$('#simplePlay').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  localStorage.setItem('info', JSON.stringify({'runningScore': 0, 'inQuest': false}));
  window.location.href = `../maze.html?mapId=${choice}`;
})

$('#playQuest').on('click', () => {
  localStorage.setItem('info', JSON.stringify({'runningScore': 0, 'inQuest': true, 'questions':[]}));
  window.location.href = `../maze.html?mapId=1`;
})
