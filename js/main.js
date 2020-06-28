
const app = document.getElementById('row');

const container = document.createElement('div');
container.setAttribute('class', 'col s12 m6 l4');
app.appendChild(container);


const card = document.createElement('div');
card.setAttribute('class', 'card small');
container.appendChild(card);

const cardImage = document.createElement('div');
cardImage.setAttribute('class', 'card-image');
const logo = document.createElement('img');
logo.src = 'https://i.ytimg.com/vi/o1Piyp6HTMQ/maxresdefault.jpg';

const cardContent = document.createElement('div');
cardContent.setAttribute('class', 'card-content');
const para = document.createElement('p');
para.textContent = 'sdsd'


const cardAction = document.createElement('div');
cardAction.setAttribute('class', 'card-action');
const edit = document.createElement('a');
edit.setAttribute('href', '#');
edit.setAttribute('class', 'blue-text');
edit.textContent = 'Edit';

const delet = document.createElement('a');
delet.setAttribute('href', '#');
delet.setAttribute('class', 'blue-text');
delet.textContent = 'Delete';

card.appendChild(cardImage);
card.appendChild(cardContent);
card.appendChild(cardAction);
cardImage.appendChild(logo);
cardContent.appendChild(para);
cardAction.appendChild(edit);
cardAction.appendChild(delet);

