function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  window.axios.post(`/session/google`, {idToken: id_token})
    .then(({data}) => {
      window.login = 'google';
      const btns = document.getElementsByClassName('btn-login');
      for (let i = 0, j = btns.length; i < j; i++)
        btns[i].style.visibility = 'hidden';
      document.getElementById('logout').style.visibility = 'visible';
    })
    .catch(err =>  {
      for (let i = 0, j = btns.length; i < j; i++)
        btns[i].style.visibility = 'visible';
      document.getElementById('logout').style.visibility = 'hidden';
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
        const btns = document.getElementsByClassName('btn-login');
        for (let i = 0, j = btns.length; i < j; i++)
          btns[i].style.visibility = 'visible';
        document.getElementById('logout').style.visibility = 'hidden';
      })
      .catch(err => console.log(err));
  });
}