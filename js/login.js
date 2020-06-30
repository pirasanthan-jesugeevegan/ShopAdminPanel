var Modalelem;
var instance;
var attempt = 3;
var token
window.onload = function () {

    Modalelem = document.querySelector('.modalLogin');
    instance = M.Modal.init(Modalelem, {
        dismissible: false
    });


    if (token === '' || token === null || token === undefined) {
        console.log('empty')
        instance.open();
    } else {
        console.log('value is present')
    }

}



function login() {

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var link = 'https://restful-shop-api.herokuapp.com/user/login';


    if (username == "Formget@gmail.com" && password == "formget#123") {
        request.open('POST', link, true)
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ "email": "test@test.com", "password": "tester" })); //repace email and testing with dynamic value 
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)
            token = data.token
            console.log(data.message)
            if (request.status >= 200 && request.status < 400) {
                M.toast({ html: data.message })
                console.log(token)
                localStorage.setItem('token', token);
                //  token1 = localStorage.getItem('token')
                // console.log(token1)
                instance.close();
            } else {
                M.toast({ html: data.message })
                //login()
            }
        }

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
