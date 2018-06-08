let open = document.getElementById('open-btn'),
		name_value = document.getElementsByClassName('name-value')[0],
		budget_value = document.getElementsByClassName('budget-value')[0],
		goods_value = document.getElementsByClassName('goods-value')[0],
		items_value = document.getElementsByClassName('items-value')[0],
		employers_value =document.getElementsByClassName('employers-value')[0],
		discount_value = document.getElementsByClassName('discount-value')[0],
		isOpen = document.getElementsByClassName('isopen')[0],
		isopen_value = document.getElementsByClassName('isopen-value')[0],

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

const mainList = {
	budget: money,
	shopName: name,
	shopGoods: [],
	employers: {},
	open: false,
	discount: true,
	shopItems: [],

	makeDiscount: function makeDiscount() {
		if (mainList.discount == true) {
				price = (price / 100) * 80;
		}
	}
}

function openShop (time) {
	time = prompt('Введите время');
	time_value.innerHTML = time;
	time_value.setAttribute('readonly','readonly');

	if (time < 0) {
		console.log('Такого просто не может быть');
		mainList.open = false;
	} else if (time > 8 && time < 20) {
		console.log('Время работать!');
		mainList.open = true;
	}	else if (time < 24) {
		console.log('Уже слишком поздно!');
		mainList.open = false;
	} else {
		console.log('В сутках только 24 часа');
		mainList.open = false;
	}

	if (mainList.open == true) {
		isopen_value.style.backgroundColor = 'green';

	} else {
		isopen_value.style.backgroundColor = 'red';
		open.setAttribute('disabled', 'disabled');
		open.style.background = 'red';
		open.innerHTML = 'Магазин закрыт';
	}
};

openShop(time);

// расчитываем бюджет на день по клику на кнопку
budget_btn.addEventListener('click', () => {
	count_budget_value.value = money / 30;
});

count_budget_value.setAttribute('readonly','readonly');

// Вводим имена сотрудников и заполняем ими соответствующее поле по клику на кнопку
employers_btn.addEventListener('click', () => {
	for (let i = 0; i < hire_employers_item.length; i++) {

		let name = hire_employers_item[i].value;
		mainList.employers[i] = name;

		employers_value.textContent += mainList.employers[i] + ', ';
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