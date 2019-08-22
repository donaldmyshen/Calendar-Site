# Calendar-Site
A calender site bulit with php as back-end and JavaScript as front-end.
----
# Function List
  - The calendar is displayed as a table grid with days as the columns and weeks as the rows, one month at a time
  - The user can view different months as far in the past or future as desired 
  - Events can be added, modified, and deleted 
  - Events have a title, date, and time 
  - Users can log into the site, and they cannot view or manipulate events associated with other users 
  - Don't fall into the Abuse of Functionality trap! Check user credentials on the server side as well as on the client side.
  - All actions are performed over AJAX, without ever needing to reload the page 
  - Refreshing the page does not log a user out 
  - Users can tag an event with a particular category and enable/disable those tags in the calendar view. 
  - Users can share their calendar with additional users.
  - Show username when login
  - Calender backgroud will change with event
  - Calender background will bahnge when hover
  - Show a curent time on home page
----
# Security
  - If storing passwords, they are stored salted and hashed 
  - All AJAX requests that either contain sensitive information or modify something on the server are performed via POST, not GET 
  - Safe from XSS attacks; that is, all content is escaped on output 
  - Safe from SQL Injection attacks 
  - CSRF tokens are passed when editing or removing events 
  - Session cookie is HTTP-Only 
  - Page passes the W3C validator 
 ---
# Potential Bug or Error
  - A bug will show in inspect but function working well
 ---
# Future plan
  - Steady can be better
  - background can be change with different tag 
 ---
# Demo
![image](https://raw.githubusercontent.com/donaldmyshen/Calendar-Site/master/Screenshot/1.png)
![image](https://raw.githubusercontent.com/donaldmyshen/Calendar-Site/master/Screenshot/2.png)
![image](https://raw.githubusercontent.com/donaldmyshen/Calendar-Site/master/Screenshot/3.png)
  
