const app = document.getElementById('row');
var request = new XMLHttpRequest();

request.open('GET', 'https://restful-shop-api.herokuapp.com/products', true)
request.onload = function getProduct() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.products.forEach(product => {
            productName = product.name
            productPrice = product.price
            productImage = 'https://restful-shop-api.herokuapp.com/' + product.productImage

            const container = document.createElement('div');
            container.setAttribute('class', 'col s12 m6 l4');
            app.appendChild(container);

            const card = document.createElement('div');
            card.setAttribute('class', 'card small');
            container.appendChild(card);

            const cardImage = document.createElement('div');
            cardImage.setAttribute('class', 'card-image');
            const logo = document.createElement('img');
            logo.src = productImage;

            const cardContent = document.createElement('div');
            cardContent.setAttribute('class', 'card-content');

            const name = document.createElement('span')
            name.setAttribute('class', 'card-title grey-text')
            name.textContent = productName

            const price = document.createElement('p');
            price.textContent = 'Price: £' + productPrice


            const cardAction = document.createElement('div');
            cardAction.setAttribute('class', 'card-action');
            const edit = document.createElement('a');
            edit.setAttribute('href', '#');
            edit.setAttribute('class', 'orange-text');
            edit.textContent = 'Edit';

            const delet = document.createElement('a');
            delet.setAttribute('href', '#');
            delet.setAttribute('class', 'red-text');
            delet.textContent = 'Delete';

            card.appendChild(cardImage);
            card.appendChild(cardContent);
            card.appendChild(cardAction);
            cardImage.appendChild(logo);
            cardContent.appendChild(name);
            cardContent.appendChild(price);
            cardAction.appendChild(edit);
            cardAction.appendChild(delet);
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}
request.send()