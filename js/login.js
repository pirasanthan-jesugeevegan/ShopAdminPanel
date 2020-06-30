var Modalelem;
var instance;

window.onload = function () {

    Modalelem = document.querySelector('.modalLogin');
    instance = M.Modal.init(Modalelem, {
        dismissible: false
    });

    //localStorage.setItem('test', 'Hello');
    //token = localStorage.getItem('test')


    if (token === '' || token === null || token === undefined) {
        console.log('empty')
        instance.open();
    } else {
        console.log('value is present')
    }

}

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // if api call success 
    if (username == "Formget@gmail.com" && password == "formget#123") {
        instance.close();
    }
    else {
        attempt--;// Decrementing by one.
        M.toast({ html: "You have left " + attempt + " attempt" })

        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("email").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}