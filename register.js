var registerCall = document.getElementById("registerButton")

if (registerCall) {
        registerCall.addEventListener("click", register, false);
}
function register(event) {
        const username = document.getElementById("newUsername").value; // Get the username from the form
        const password = document.getElementById("newPassword").value; // Get the password from the form
        console.log(document.getElementById("newUsername"));

        // Make a URL-encoded string for passing POST data:
        const data = { 'username': username, 'password': password };
        console.log(data);

        fetch("register.php", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' }
        })
                .then(response => response.json())
                .then(data => console.log(data.success ? "You've been registered!" : `You were not registered ${data.message}`));
        document.getElementById("newUsername").value="";
        document.getElementById("newPassword").value="";
        reload();
}
