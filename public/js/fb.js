function statusChangeCallback(response) {
  console.log(response);
  const btns = document.getElementsByClassName('btn-login');
  if (response.status === 'connected') {
    console.log(response)
    window.logged = true;
    window.login = 'fb';
    for (let i = 0, j = btns.length; i < j; i++)
      btns[i].style.visibility = 'hidden';
    document.getElementById('logout').style.visibility = 'visible';
    FB.api('/me', {fields: 'id,name,email,picture'}, function(response) {
      console.log(response);
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