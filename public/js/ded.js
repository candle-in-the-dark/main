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

$.ajax(logCheck)
.then((check) => {
  if (check === false) {
    logOutButton.addClass("hidden")
  }
  else{
    logOutButton.removeClass("hidden")
  }
})
.catch((err) => console.log(err))

$("#logout").on('click', () => {
  $.ajax(logOut)
    .then(() => {
      logOutButton.addClass("hidden")
    })
    .catch((err) => console.log(typeof err))
})
