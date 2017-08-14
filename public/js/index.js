let numbOfMaps = 3;
$('#guestPlay').on('click', () => {
  let choice = Math.floor(((Math.random() * 10) + 1) / numbOfMaps)
  window.location.href = `../maze.html?mapId=${choice}`
})
