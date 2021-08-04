const selectFrom = document.getElementById('main__selsect_currencyFrom');
const selectIn = document.getElementById('main__selsect_currencyIn');
const inputFrom = document.getElementById('main__input_currencyFrom');
const inputIn = document.getElementById('main__input_currencyIn');
const exrates = [];

inputFrom.addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^\d]/g,'');
});

selectFrom.addEventListener('change', calc);
selectIn.addEventListener('change', calc);  

function clear () {
    inputIn.value = '';
    inputFrom.value = '';
}

inputFrom.addEventListener('input', calc);


function calc () {
	let officialRateFrom = 1,
	officialRateIn = 1; 
	exrates.forEach(item => {
		if (item.Cur_Abbreviation === selectFrom.value) {
			officialRateFrom = item.Cur_OfficialRate/item.Cur_Scale;
		}

		if (item.Cur_Abbreviation === selectIn.value) {
			officialRateIn = item.Cur_OfficialRate/item.Cur_Scale;
		}
	});

	if (selectFrom.value === "BYN" && selectIn.value === "BYN") {
		inputIn.value = inputFrom.value;
	}

	if (selectFrom.value === "BYN") {
		inputIn.value = +(inputFrom.value/officialRateIn).toFixed(2) 
	}

	if (selectIn.value === "BYN") {
		inputIn.value = +(inputFrom.value * officialRateFrom).toFixed(2) 
	}

	if (selectFrom.value !== "BYN" && selectIn.value !== "BYN") {
		inputIn.value = +(inputFrom.value*(officialRateFrom/officialRateIn)).toFixed(2);
	}
	console.log(officialRateFrom, officialRateIn);
}

const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

fetch(url)
.then((res)=> res.json())
.then((json)=> {
	console.log(json);
	getRate (json);
	exrates.push(...json);	
});

function getRate (arr) {
	arr.forEach((item)=> {
		const container = document.createElement('div'),
			curName = document.createElement('p'),
			curRate = document.createElement('p'),
			currencyFrom = document.createElement('option');
			currencyIn = document.createElement('option');
		container.classList.add('main__container');
		curName.classList.add('main__name');
		curRate.classList.add('main__rate');
		currencyFrom.innerHTML = item.Cur_Abbreviation;
		currencyIn.innerHTML = item.Cur_Abbreviation;
		curName.innerHTML = item.Cur_Scale +' '+item.Cur_Name; 
		curRate.innerHTML = item.Cur_OfficialRate;
		selectFrom.append(currencyFrom);
		selectIn.append(currencyIn);
		document.body.append(container);
		container.append(curName);
		container.append(curRate);

		console.log(selectIn.value);
	})
}


