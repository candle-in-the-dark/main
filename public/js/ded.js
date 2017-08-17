const logCheck = {
  contentType: 'application/json',
  dataType: 'json',
  type: 'GET',
  url: '/token'
}


$.ajax(logCheck)
  .then((check) => {
    if (check === true) {
      
    }
  })
$.ajax(options)
  .then(() => {
    Materialize.toast('Successfully logged in!', 1500);
    setTimeout(() => {
      window.location.href = '../gamechoice.html';
    }, 1500);
  })
  .catch(($xhr) => {
    Materialize.toast($xhr.responseText, 3000);
  });
