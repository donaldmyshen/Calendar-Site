function newEvent(){
    var event_name = document.getElementById("event_name").value;
    var event_year = document.getElementById("event_year").value;
    var event_month = document.getElementById("event_month").value;
    var event_day = document.getElementById("event_day").value;
    var event_hour = document.getElementById("event_hour").value;
    var event_minute = document.getElementById("event_minute").value;
    var tag = document.getElementById("tag").value;
    //console.log(tag);
    var user_share = document.getElementById("user_share").value;
    if (input_sanitizing(event_name,event_year,event_month,event_day,event_hour,event_minute)){
        var xmlHttp = new XMLHttpRequest();
        var dataString= "event_name="+encodeURIComponent(event_name)+
                        "&event_year="+encodeURIComponent(event_year)+
                        "&event_month="+encodeURIComponent(event_month)+
                        "&event_day="+encodeURIComponent(event_day)+
                        "&event_hour="+encodeURIComponent(event_hour)+
                        "&event_minute="+encodeURIComponent(event_minute)+
                        "&tag="+encodeURIComponent(tag)+
                        "&token="+encodeURIComponent(token)+
                        "&user_share="+encodeURIComponent(user_share);
        xmlHttp.open("POST", "newEvent.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", neweventcallBack,false);
        xmlHttp.send(dataString);
        document.getElementById("username").value="";
        document.getElementById("password").value="";
        updateCalendar();
    }
    else{
        set_info();
        updateCalendar();
    }
}

function neweventcallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    set_info();
    updateCalendar();
    showEvent();
    alert(jsonData.why)
}

document.getElementById("newEvent").addEventListener("click", newEvent, false);

function set_info(){       
    document.getElementById("event_name").value="";
    document.getElementById("event_year").value=2019;
    document.getElementById("event_month").value=1;
    document.getElementById("event_day").value=1;
    document.getElementById("event_hour").value=0;
    document.getElementById("event_minute").value=0;
    document.getElementById("tag").value="default";
    document.getElementById("user_share").value="";
}

function input_sanitizing(event, year, month, day, hour, minute) {
    if (event === "") {
        alert("please enter event name!");
        return false;
    }
    if ((year < 0) || (year > 4000)) {
        alert("legal year range 0-4000!");
        return false;
    }
    if ((month < 0) || (month > 12)) {
        alert("legal month range 1-12!");
        return false;
    }

    if (month === "2") {
        if (day <= 0 || day > 28) {
            alert("Feburary has 29 or 28 days!");
            return false;
        }
    }
    else if (month === "4" || month === "6" || month === "9" || month === "11") {
        if (day <= 0 || day > 30) {
            alert("Apr, June, sept, nov should have 30 days!");
            return false;
        }
    }
    else if ((day < 0) || (day > 31)) {
        alert("a month can have utmost 31 days!");
        return false;
    }
    if ((hour < 0) || (hour > 23)) {
        alert("24 hours a day!");
        return false;
    }
    if ((minute < 0) || (minute > 59)) {
        alert("60 minutes per hour!");
        return false;
    }
    return true;
}