var logoutCall = document.getElementById("logoutButton");

if (logoutCall) {
    logoutCall.addEventListener("click", logout, false);
}

function logout() {
    console.log("got to logout function");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "logout.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", logoutCallBack, false);
    xmlHttp.send(null);
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    var tdArray = document.getElementsByTagName("td");
    for(var i=0;i<tdArray.length;i++) tdArray[i].style.backgroundColor='lightblue';   
}

function logoutCallBack(event) {
    document.getElementById("1").style.display="";
    document.getElementById("2").style.display="";
    document.getElementById("title").innerHTML = "Hope you back again!" ;
    document.getElementById("logoutButton").style.display="none";
    document.getElementById("editEvent").style.display="none";
    updateCalendar();
}


