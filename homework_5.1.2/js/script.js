let open = document.getElementById('open-btn'),
		name_value = document.getElementsByClassName('name-value')[0],
		budget_value = document.getElementsByClassName('budget-value')[0],
		goods_value = document.getElementsByClassName('goods-value')[0],
		items_value = document.getElementsByClassName('items-value')[0],
		employers_value = document.getElementsByClassName('employers-value')[0],
		discount_value = document.getElementsByClassName('discount-value')[0],
		isOpen = document.getElementsByClassName('isopen')[0],
		isopen_value = document.getElementsByClassName('isopen-value')[0],
		body = document.getElementsByTagName('body')[0],
		main_info_closed = document.querySelector('.main-info-closed'),
		main_info = document.querySelector('.main-info'),
		main_functions_closed = document.querySelector('.main-functions-closed'),
		main_functions = document.querySelector('.main-functions'),
		text = document.querySelector('.text'),
		picture = document.querySelector('.picture'),

		goods_item = document.getElementsByClassName('goods-item'),
		goods_btn = document.getElementsByTagName('button')[1],
		budget_btn = document.getElementsByTagName('button')[2],
		employers_btn = document.getElementsByTagName('button')[3],
		choose_item = document.querySelector('.choose-item'),
		time_value = document.querySelector('.time-value'),
		count_budget_value = document.querySelector('.count-budget-value'),
		hire_employers_item = document.querySelectorAll('.hire-employers-item');

let	money,
		price,
		time;

const mainList = {
	budget: money,
	shopName: name,
	shopGoods: [],
	employers: {},
	open: false,
	discount: false,
	shopItems: []
};

// Заполняем поля с бюджетом  и названием магазина
open.addEventListener('click', () => {
	money = prompt('Ваш бюджет на месяц?', '');

	while (isNaN(money) || money == '' || money == null) {
		money = prompt('Ваш бюджет на месяц?', '');
	}

	budget_value.textContent = money;
	name_value.textContent = prompt('Название вашего магазина?').toUpperCase();

});

// Вводим категории товаров и по клику на кнопку заполняем ими соответствующее поле
goods_btn.addEventListener('click', () => {

	for (let i = 0; i < goods_item.length; i++) {

		let a = goods_item[i].value
		
		if (typeof(a) === 'string'  && typeof(a) != null && a.length < 50) {
			console.log('Все верно!');
			mainList.shopGoods [i] = a;
			goods_value.textContent = mainList.shopGoods;
		} else {
			i--;
		}
	}
});

// Инактивируем кнопку, когда поля не заполнены
goods_btn.disabled = true;

// Активируем кнопку, когда поле заполнено
for (let i = 0; i < goods_item.length; i++) {
	goods_item[i].addEventListener('change', () => {

		if (goods_item[i].value != '') {
			goods_btn.disabled = false;
		}

	});
}

// Вводим виды товаров и заполняем ими соответствующее поле
choose_item.addEventListener('change', () => {
	let items = choose_item.value;
		
		if (isNaN(items) && items != null) {
			mainList.shopItems = items.split(',');
			mainList.shopItems.sort();
		}

		items_value.textContent = mainList.shopItems;

});

// Открываем магазин в зависимости от времени 
function openShop (time) {
	time = prompt('В котором часу вы хотите зайти в наш магазин?');
	time_value.innerHTML = time;
	time_value.setAttribute('readonly','readonly');

	if (time < 0) {
		text.innerHTML = 'Такого просто не может быть';
		mainList.open = false;
	} else if (time > 8 && time < 20) {
		text.innerHTML = 'Время заняться магией!';
		mainList.open = true;
	}	else if (time < 24) {
		text.innerHTML = 'Чародеи тоже должны отдыхать!';
		mainList.open = false;
	} else {
		text.innerHTML = 'Даже у волшебников в сутках только 24 часа';
		mainList.open = false;
	}

	if (mainList.open == true) {
		isopen_value.style.backgroundColor = '#004f1a';

	} else {
		isopen_value.style.backgroundColor = '#730000';
		open.setAttribute('disabled', 'disabled');
		open.innerHTML = 'Магазин закрыт';
		body.style.background = 'url(./img/night.png) no-repeat center';
		main_info_closed.style.display = 'block';
		main_info.style.display = 'none';
		main_functions_closed.style.display ='block';
		main_functions.style.display ='none';
		picture.style.display = 'none';
	}
};

// расчитываем бюджет на день и дисконт по клику на кнопку
budget_btn.addEventListener('click', () => {
	count_budget_value.value = Math.floor(money / 30);

	if (count_budget_value.value > 1000) {
		mainList.discount = true;
	} else {
		mainList.discount = false;
	}

	if (mainList.discount == true) {
			price = Math.floor((count_budget_value.value / 100) * 5);
			discount_value.style.backgroundColor = '#004f1a';
			discount_value.innerHTML = `Скидка ${price}`;
			discount_value.style.color = '#ffffff';

	} else {
		discount_value.style.backgroundColor = '#730000';
		discount_value.innerHTML = 'Скидки нет';
		discount_value.style.color = '#ffffff';
	}
});

count_budget_value.setAttribute('readonly','readonly');

// Вводим имена сотрудников и заполняем ими соответствующее поле по клику на кнопку
employers_btn.addEventListener('click', () => {

	employers_value.textContent = '';

	for (let i = 0; i < hire_employers_item.length; i++) {

		let name = hire_employers_item[i].value;
		mainList.employers[i] = name;

		employers_value.textContent += `${mainList.employers[i]}, `;

	}
});

// Инактивируем кнопку, когда поля не заполнены
employers_btn.disabled = true;

// Активируем кнопку, когда поле заполнено
for (let i = 0; i < hire_employers_item.length; i++) {
	hire_employers_item[i].addEventListener('change', () => {

		if (hire_employers_item[i].value != '') {
			employers_btn.disabled = false;
		}

	});
}

// Разрешаем ввод только русских букв
for (let i = 0; i < hire_employers_item.length; i++) {
	hire_employers_item[i].addEventListener('keyup', () => {
		
		let reg = /[a-z0-9]/ig;
		
		if (reg.test(hire_employers_item[i].value) == true) {
			
			hire_employers_item[i].value = '';
		}
	});
}

openShop(time);

// Вставляем новый div с текстом и стилями, используя класс
class Options {
	constructor (height = '400px', width = '400px', color = 'black', fontSize = '20px', textAlign = 'justify') {
		this.height = height;
		this.width = width;
		this.color = color;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
	}

	createElem (newText) {
		let div = document.createElement('div'),
				text = document.createTextNode(newText);
		document.body.appendChild(div);
		div.appendChild(text);
		div.style.cssText = `height: ${this.height}; width: ${this.width}; color: ${this.color}; font-size: ${this.fontSize}; text-align: ${this.textAlign};`;


	/*	div.style.height = this.height;
		div.style.width = this.width;
		div.style.background = this.background;
		div.style.fontSize = this.fontSize;
		div.style.textAlign = this.textAlign;*/
	}
}


const newDiv = new Options('40px', '100%', 'white', '30px', 'center');
newDiv.createElem('Заходите ещё. Мы всегда вам рады');

