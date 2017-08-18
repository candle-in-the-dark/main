const logCheck = {
  contentType: "application/json",
  dataType: "json",
  type: "GET",
  url: "/token"
}
const logOut = {
  type: "DELETE",
  url: "/token"
}
const logOutButton = $("#logout")
const login = $("#login")
const register = $("#register")
const guestPlay = $("#guestPlay")

const info = {
  inQuest: false,
  lastMap: -1
}


$("#guestPlay").on("click", () => {
  if ($('#guestPlay').text() === 'Guest Play') {
    let numbOfMaps = 3;
    let choice = Math.floor(Math.random() * numbOfMaps) + 1;
    localStorage.setItem("info", JSON.stringify({"mapScore": 0, "inQuest": false, "questScore":0}));
    window.location.href = `../maze.html?mapId=${choice}`;
  } else {
    window.location.href = '../gamechoice.html'
  }

})


localStorage.setItem("info", JSON.stringify(info))


$.ajax(logCheck)
.then((check) => {
  if (check === false) {
    logOutButton.addClass("hidden")
  }
  else{
    logOutButton.removeClass("hidden")
    login.addClass("hidden")
    register.addClass("hidden")
    $('#guestPlay').text('Play The Game')
  }
})
.catch((err) => console.log(err))

$("#logout").on("click", () => {
  $.ajax(logOut)
    .then(() => {
      logOutButton.addClass("hidden")
      login.removeClass("hidden")
      register.removeClass("hidden")
      $('#guestPlay').text('Guest Play')
    })
    .catch((err) => console.log(typeof err))
})
