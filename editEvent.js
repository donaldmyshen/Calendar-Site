function editEvent(){
    var new_name = document.getElementById("event_name_edit").value;
    var new_year = document.getElementById("newEvent_year").value;
    var new_month = document.getElementById("newEvent_month").value;
    var new_day = document.getElementById("newEvent_day").value;
    var new_hour = document.getElementById("newEvent_hour").value;
    var new_minute = document.getElementById("newEvent_minute").value;
    var new_tag = document.getElementById("new_tag").value;
    var new_share = document.getElementById("new_user_share").value;
    if(input_sanitizing(new_name,new_year,new_month,new_day,new_hour,new_minute)){
        var xmlHttp = new XMLHttpRequest();
        var dataString = "new_name="+encodeURIComponent(new_name)+
                        "&new_year="+encodeURIComponent(new_year)+
                        "&new_month="+encodeURIComponent(new_month)+
                        "&new_day="+encodeURIComponent(new_day)+
                        "&new_hour="+encodeURIComponent(new_hour)+
                        "&new_minute="+encodeURIComponent(new_minute)+
                        "&new_tag="+encodeURIComponent(new_tag)+
                        "&token="+encodeURIComponent(token)+
                        "&new_share="+encodeURIComponent(new_share);
        xmlHttp.open("POST", "editEvent.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", editeventcallBack,false);
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

function editeventcallBack(event){
    var jsonData = JSON.parse(event.target.responseText);
    set_info();
    updateCalendar();
    showEvent();
    alert(jsonData.why);
}

document.getElementById("set_event").addEventListener("click", editEvent, false);

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