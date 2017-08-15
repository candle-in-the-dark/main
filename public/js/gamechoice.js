$('#simplePlay').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  window.location.href = `../maze.html?mapId=${choice}`
})

$('#playQuest').on('click', () => {
  window.location.href = `../maze.html?mapId=1`
})
