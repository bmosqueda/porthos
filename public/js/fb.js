function statusChangeCallback(response) {
  console.log(response);
  const btns = document.getElementsByClassName('btn-login');
  if (response.status === 'connected') {
    console.log(response)
    window.logged = true;
    window.login = 'fb';
    FB.api('/me', {fields: 'id,name,email,picture'}, function(user) {
      console.log(user);
      window.axios.post(`/session/fb/${response.authResponse}`, user)
        .then(res => {
          for (let i = 0, j = btns.length; i < j; i++)
            btns[i].style.visibility = 'hidden';
          document.getElementById('logout').style.visibility = 'visible';
        })
        .catch(err => {
          alert('Something failed')
          console.error(err)
        })
    });
  } else {
    for (let i = 0, j = btns.length; i < j; i++)
      btns[i].style.visibility = 'visible';
    document.getElementById('logout').style.visibility = 'hidden';
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
    const btns = document.getElementsByClassName('btn-login');
    for (let i = 0, j = btns.length; i < j; i++)
      btns[i].style.visibility = 'visible';
    document.getElementById('logout').style.visibility = 'hidden';
    console.log('bye');
  });
}