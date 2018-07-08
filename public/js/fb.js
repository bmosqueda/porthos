function statusChangeCallback(response) {
  console.log(response);
  const btns = document.getElementsByClassName('btn-login');
  if (response.status === 'connected') {
    console.log(response)
    const token = response.authResponse.accessToken
    FB.api('/me', {fields: 'id,name,email,picture'}, function(user) {
      window.axios.post(`/session/fb/${token}`, user)
        .then(res => {
          window.login = 'fb';
          navbar.user.id = data.id;
          navbar.user.name = data.name.split(' ')[0];
          navbar.user.image = data.urlImage;
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
    navbar.user.id = '';
    navbar.user.name = '';
    navbar.user.image = 'https://www.iconspng.com/images/abstract-user-icon-3/abstract-user-icon-3.jpg';
    navbar.activeModal = false;
    console.log('bye');
  });
}