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
//  function get_info(){
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