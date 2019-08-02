var loginCall = document.getElementById("loginButton");
if (loginCall) {
  loginCall.addEventListener("click", loginAjax, false);
}

function loginAjax(event) {
  const username = document.getElementById("username").value; // Get the username from the form
  const password = document.getElementById("password").value; // Get the password from the form

  // Make a URL-encoded string for passing POST data:
  const data = { 'username': username, 'password': password };

  fetch("login.php", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`));
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("editEvent").style.display="inline";
    
    reload();
    showEvent();
}

function reload() {
  console.log("reload has been called");
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "reload.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load", reloadCallBack,false);
  xmlHttp.send(null);
}

function reloadCallBack(event) {
    var jsonData = JSON.parse(event.target.responseText);
    if (jsonData.success === true){
          document.getElementById("1").style.display="none";
          document.getElementById("2").style.display="none";
          var word = document.getElementById("title");
          word.innerHTML = "<strong>" +"Hello : "+jsonData.username+"."+"</strong>" ;
          document.getElementById("logoutButton").style.display="inline";
          token = jsonData.token;
          
    }
    else{
          alert(jsonData.why);
    }  
}