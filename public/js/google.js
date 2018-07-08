function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  window.axios.post(`/session/google`, {idToken: id_token})
    .then(({data}) => {
      window.login = 'google';
      console.log(data)
    })
    .catch(err =>  {
      alert('Sesion no iniciada');
      console.log(err);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    window.axios.post(`/session/logout`)
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        alert('Sesion no iniciada');
      });
  });
}