let	menu = document.getElementsByClassName('menu')[0];

let second = menu.getElementsByClassName('menu-item')[1],
		third = menu.getElementsByClassName('menu-item')[2];

menu.insertBefore(third, second);



let li = document.createElement('li');
li.classList.add('menu-item');
menu.appendChild(li);
li.innerHTML = 'Пятый пункт';

document.getElementsByTagName('body')[0].style.background = 'url(./img/apple_true.jpg)';
document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';

let title = document.getElementById('title');
title.innerHTML = 'Мы продаем только подлинную технику Apple';

let column = document.getElementsByClassName('column')[1];
let advert = document.getElementsByClassName('adv')[0];
column.removeChild(advert);

let question = prompt('Скажите, как Вы относитесь к технике Apple');


let answer = document.getElementById('prompt');
answer.innerHTML = question;

