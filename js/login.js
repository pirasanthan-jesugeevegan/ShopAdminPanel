var Modalelem;
var instance;
var attempt = 3;
var token = getWithExpiry('myKey')

window.onload = function () {
    //localStorage.clear();
    //localStorage.removeItem('myKey')
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


    if (token === '' || token === null || token === undefined) {
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
                setWithExpiry('myKey', token, 500000) // token expiry value

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

function setWithExpiry(key, value, ttl) {
    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
}
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}