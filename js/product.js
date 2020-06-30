var request = new XMLHttpRequest();
var token
var product_ID;
var link = "";


// localStorage.setItem("lastname", "Smith");
// var last = localStorage.getItem("lastname");
// console.log(last)



const app = document.getElementById('row');

request.open('GET', 'https://restful-shop-api.herokuapp.com/products', true)
request.onload = function getProduct() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.products.forEach(product => {
            var productID = product._id
            var productName = product.name;
            var productPrice = product.price;
            var productImage = product.productImage;


            const col = document.createElement('div');
            col.setAttribute('class', 'col s12 m4');

            const card = document.createElement('div');
            card.setAttribute('class', 'card hoverable')

            const cardImage = document.createElement('div');
            cardImage.setAttribute('class', 'card-image')

            const Image = document.createElement('img');
            Image.src = 'https://restful-shop-api.herokuapp.com/' + productImage;

            const cardContent = document.createElement('div');
            cardContent.setAttribute('class', 'card-content')

            const name = document.createElement('span');
            name.setAttribute('class', 'card-title activator grey-text text-darken-4')
            name.textContent = productName

            const price = document.createElement('p');
            price.textContent = '£' + productPrice

            const cardAction = document.createElement('div');
            cardAction.setAttribute('class', 'card-action')

            var editButton = document.createElement("button");
            editButton.setAttribute('class', 'waves-effect waves-light btn-small modal-trigger')
            editButton.setAttribute('href', '#modal1')
            // editButton.className = "YourClass";
            editButton.innerText = "Edit";

            var deleteButton = document.createElement("button");
            deleteButton.setAttribute('class', 'waves-effect waves-light btn-small')
            // editButton.className = "YourClass";
            deleteButton.innerText = "Delete";

            editButton.onclick = function () {
                M.updateTextFields();
                product_ID = productID
                document.getElementById("product_name").value = productName;
                document.getElementById("product_price").value = '£' + productPrice;
            }

            deleteButton.onclick = function () {
                //deleteProduct(movie._id, 'https://restful-shop-api.herokuapp.com/products/')
                console.log(productID)
            }
            app.appendChild(col)
            col.appendChild(card)
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            card.appendChild(cardAction);
            cardAction.appendChild(editButton);
            cardAction.appendChild(deleteButton);
            cardImage.appendChild(Image);
            cardContent.appendChild(name)
            cardContent.appendChild(price)

        })
    } else {
        M.toast({ html: data.error.message })
    }
}


function edit(productID) {
    nameValue = document.getElementById("product_name").value
    priceValue = document.getElementById("product_price").value.slice(1)
    // imageVlaue = document.getElementById("productImage").src
    console.log(productID)
    request.open('PATCH', 'https://restful-shop-api.herokuapp.com/products/' + product_ID, true)
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(JSON.stringify([{ "propName": "name", "value": nameValue }, { "propName": "price", "value": priceValue }]));
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        console.log(data)
        if (request.status >= 200 && request.status < 400) {

            //window.location.reload();
        } else {
            M.toast({ html: data.error.message })
        }
    }

}
function deleteProduct(productID, url) {
    console.log(url + productID)

    fetch(url + productID, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))

}
request.send()
