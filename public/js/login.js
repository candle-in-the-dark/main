$('#login').on('click', () => {
  login();
  });

$(document).keypress(function(e) {
  if(e.which == 13) {
    login();
  }
});

$('#guest').on('click', () => {
  let numbOfMaps = 3;
  let choice = Math.floor(Math.random() * numbOfMaps) + 1;
  localStorage.setItem('info', JSON.stringify({'mapScore': 0, 'inQuest': false, 'questScore':0}));
  window.location.href = `../maze.html?mapId=${choice}`;
})

function login() {
  if (validForm()) {
    const email = $('#email').val();
    const password = $('#password').val();
    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };
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
  }
}


function validForm() {
  if (!$('#email').hasClass('valid')) {
    Materialize.toast('Please enter a valid email address.', 1500);
    return false;
  }
  if ($('#password').length === 0) {
    Materialize.toast('Please enter a password.', 1500);
    return false;
  }
  return true;
}
