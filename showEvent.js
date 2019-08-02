var show = true;

document.getElementById("showTag").addEventListener("click", showTag, false);
document.getElementById("hideTag").addEventListener("click", hideTag, false);

function showTag(){
    show = true;
    alert("Show the tag!");
    updateCalendar();
    showEvent();
}
function hideTag(){
    show = false;
    alert("Hide the tag!");
    updateCalendar();
    showEvent();
}

function showEvent(){
        var tdArray = document.getElementsByTagName("td");
        for(var i=0;i<tdArray.length;i++) tdArray[i].style.backgroundColor='lightblue';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "showEvent.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", displayCallback,false);
        xmlHttp.send(null);
        document.getElementById("username").value="";
        document.getElementById("password").value="";
}

function displayCallback(event){
        var jsonData = JSON.parse(event.target.responseText);
        //document.getElementsByTagName("td").style.backgroundColor="yellow";
        
        if (jsonData.success === true) {
            var weeks = currentMonth.getWeeks();
            var dayList = [];
            var index=0;
            for (var i in weeks){
                var days = weeks[i].getDates();
                for (var j in days) dayList[index++] = days[j];
            }
            for (var i = 0; i < jsonData.Name_event.length; i++) {
                var minutes = jsonData.Minute_event[i];
                if (jsonData.Minute_event[i]<10) minutes = "0"+jsonData.Minute_event[i];
                for(var n = 0; n < dayList.length; n++){
                    if(jsonData.Year_event[i] === dayList[n].getFullYear()
                        && jsonData.Month_event[i] - 1 === dayList[n].getMonth()
                        && jsonData.Day_event[i] === dayList[n].getDate()){
                        var l = n + 1;
                        document.getElementById("day" + l).innerHTML+="<br>"+"Event Name:"+"<br>"+jsonData.Name_event[i]+"<br>"+ "Time " + jsonData.Hour_event[i]+":"+minutes+"<br>";
                        document.getElementById("day" + l).style.backgroundColor="yellow";
                        if(show === true)  document.getElementById("day" + l).innerHTML+=" Tag: "+jsonData.Tag_event[i];
                    }
                }
            }
             
        }
        else {
            var monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
            
            var weeks = currentMonth.getWeeks();
            monthName = monthList[currentMonth.month];
            
            document.getElementById("thisMonth").innerHTML = monthName+" " + currentYear;
            var index = 0;
            var dayList = [];

            if (weeks.length === 5) document.getElementById("additional").style.display = "none";
            
            if (weeks.length === 6) document.getElementById("additional").style.display = "";
            
            for (var w in weeks){
                var days = weeks[w].getDates();
                for(var d in days) dayList[index++] = days[d].getDate();
            }

            var index1;
            var index2;

            for (var i = 1;i <= 42; i++){
                if(dayList[i-1] === 1){
                    index1 = i-1;
                    break;
                }
            }
            for (var j = 1; j <= 42; j++){
                if (dayList[j-1] === 1){
                    index2 = j-1;
                }
            }
            if (index1 === index2) index2 = 35;

            for (var s = 1;s <= index1 + 1; s++) document.getElementById("day"+s).innerHTML="";
     
            for (var k = index1 + 1; k <= index2 + 1; k++){
                if (dayList[k-1] === 1){
                    document.getElementById("day"+k).innerHTML=monthName+" "+day[k-1];
                    k++;
                }

            document.getElementById("day"+k).innerHTML=dayList[k-1];
    
            }
            for (var l = index2 + 1;l <= 42;l++) document.getElementById("day"+l).innerHTML="";
    }
    alert(jsonData.why);
}