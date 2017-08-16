$('#submit').on('click', () => {
  if (validForm()) {
    const email = $('#email').val();
    const password = $('#password').val();
    const username = $('#username').val();
    const newUser = {'email':email, 'password':password, 'username':username};
    const register = {
      contentType: 'application/json',
      data: JSON.stringify(newUser),
      dataType: 'json',
      type: 'POST',
      url: '/users'
    };
    $.ajax(register)
      .then(() => {
        Materialize.toast('Successfully registered!', 1500);
        setTimeout(() => {
          // window.location.href = '../gamechoice.html';
        }, 1500);
        const clearToken = {
          contentType: 'application/json',
          dataType: 'json',
          type: 'DEL',
          url: '/token'
        }
        $.ajax(clearToken)
          .then(() => { })
          .catch((err => { }));

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/token'
        };
        $.ajax(options)
        .then(() => {console.log(document.cookie)})
        .catch(($xhr) => {
          Materialize.toast($xhr.responseText, 3000);
        });
      })
      .catch(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
    }
  })

function validForm() {
  if (!$('#email').hasClass('valid')) {
    Materialize.toast('Please enter a valid email address.', 1500);
    return false;
  }
  if ($('#password').val().length === 0) {
    Materialize.toast('Please enter a password.', 1500);
    return false;
  }
  if ($('#username').val().length === 0) {
    Materialize.toast('Please enter a username.', 1500);
    return false;
  }
  return true;
}
