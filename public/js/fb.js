function statusChangeCallback(response) {
  console.log(response);
  const btns = document.getElementsByClassName('btn-login');
  if (response.status === 'connected') {
    console.log(response)
    window.login = 'fb';
    FB.api('/me', {fields: 'id,name,email,picture'}, function(user) {
      console.log(user);
      window.axios.post(`/session/fb/${response.authResponse}`, user)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert('Something failed');
          console.error(err);
        })
    });
  } else {
    alert('Sesion no iniciada');
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log(response);
    statusChangeCallback(response);
  });
}

function fbLogin () {
  FB.login(function(response) {
    statusChangeCallback(response)
  }, {scope: 'public_profile,email'});
}

function fbLogout () {
  FB.logout(function () {
    window.login = '';
    console.log('bye');
  });
}