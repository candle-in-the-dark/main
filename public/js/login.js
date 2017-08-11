$('#login').on('click', () => {
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
          window.location.href = 'maze.html';
        }, 1500);
      })
      .catch(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
})

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
