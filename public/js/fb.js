function statusChangeCallback(response) {
  console.log(response);
  if (response.status === 'connected') {
    window.logged = true;
    window.login = 'fb';
    const btns = document.getElementsByClassName('btn-login');
    for (let i = 0, j = btns.length; i < j; i++)
      btns[i].style.visibility = 'hidden';
      document.getElementById('logout').style.visibility = 'visible';
    } else {
      document.getElementById('logout').style.visibility = 'hidden';
      document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log(response);
    statusChangeCallback(response);
  });
}

/*
function testAPI() {
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
*/

function fbLogin () {
  FB.login(function(response) {
    statusChangeCallback(response)
  }, {scope: 'public_profile,email'});
}

function fbLogout () {
  FB.logout(function () {
    window.logged = false;
    window.login = '';
    const btns = document.getElementsByClassName('btn-login');
    for (let i = 0, j = btns.length; i < j; i++)
      btns[i].style.visibility = 'visible';
    document.getElementById('logout').style.visibility = 'hidden';
    console.log('bye');
  });
}