$('#guestPlay').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': false, 'questScore':0}));
  window.location.href = `../maze.html?mapId=${choice}`;
})

localStorage.setIte('info', JSON.stringify(info))

const info = {
  inQuest: false,
  lastMap: -1
}
