function curTime(){
        var curYear = new Date().getFullYear();
        var monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var monthIndex = new Date().getMonth();
        var curMonth = monthList[monthIndex];
        var curDay = new Date().getDate();
        var curHour = new Date().getHours();
        var curMinute = new Date().getMinutes();
        var curSecond = new Date().getSeconds();
        document.getElementById("thisMonth").innerHTML = curMonth + " " + curDay + ", " + curYear + " "+curHour+ ":"+curMinute+":"+curSecond;
}
// refresh 1time / 1sec
setInterval("curTime()", 1000);