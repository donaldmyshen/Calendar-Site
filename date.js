var monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
var currentYear = new Date().getFullYear();
var monthIndex = new Date().getMonth();
var currentMonth = new Month(currentYear, monthIndex);
var GlobalMonth

function nextMonth(){
	currentMonth = currentMonth.nextMonth(); 
	updateCalendar();
	showEvent();
	alert("The new month is " + GlobalMonth + " " + currentMonth.year);
}

function lastMonth(){
	currentMonth = currentMonth.prevMonth(); 
	updateCalendar();
	showEvent();
	alert("The new month is " + GlobalMonth + " " + currentMonth.year);
}

function updateCalendar(){
	var weeks = currentMonth.getWeeks();
	GlobalMonth = monthList[currentMonth.month];

	var thisMonth = document.getElementById('thisMonth');
	if (thisMonth) {
		thisMonth.innerHTML = GlobalMonth+" " + currentYear;
	}
        
	var date = 0;
	var day = [];

	if (weeks.length === 5) {
	    document.getElementById("additional").style.display = "none";
	}

	if (weeks.length === 6) {
	    document.getElementById("additional").style.display = "";
	}

	for(var i in weeks){
	    var days = weeks[i].getDates();
	    for(var j in days) day[date++] = days[j].getDate();
	}

	var index1;
	var index2;

	for (var i = 1; i <= 42; i ++ ){
		if (day[i - 1] === 1){
			index1 = i - 1;
			break;
		}
	}
	
	for (var j = 1;j <= 42; j ++){
		if (day[j - 1] === 1) index2 = j - 1;
	}

	if(index1 === index2) index2 = 35;

	for (var i = 1; i <=index1 + 1; i++) document.getElementById("day" + i).innerHTML="";

	for (var i = index1 + 1; i <= index2 + 1; i++){
		// add month on the first day
		if (day[i - 1] === 1){
			document.getElementById("day" + i).innerHTML = GlobalMonth + " " + day[i - 1];
			i ++;
		}
	document.getElementById("day" + i).innerHTML = day[i - 1];
	}
	// in a calendar, it is impossible more than 6*7 days
	for(var i = index2 + 1; i <= 42; i++) document.getElementById("day" + i).innerHTML="";
}

// add click listenner 
document.addEventListener("DOMContentLoaded", updateCalendar, false);			
document.getElementById("nextMonth").addEventListener("click", nextMonth,false);
document.getElementById("lastMonth").addEventListener("click", lastMonth,false);
