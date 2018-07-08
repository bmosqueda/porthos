function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  window.axios.post(`/session/google`, {idToken: id_token})
    .then(({data}) => {
      window.login = 'google';
      navbar.user.id = data.id;
      navbar.user.name = data.name.split(' ')[0];
      navbar.user.image = data.urlImage;
      navbar.activeModal = false;
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
      .then(() => { 
        window.login = '';
        navbar.user.id = '';
        navbar.user.name = '';
        navbar.user.image = 'https://www.iconspng.com/images/abstract-user-icon-3/abstract-user-icon-3.jpg';
      })
      .catch(err => {
        console.log(err);
        alert('Sesion no iniciada');
      });
  });
}