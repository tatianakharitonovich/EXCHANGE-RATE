const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

fetch(url)
.then((res)=> res.json())
.then((json)=> {
	console.log(json);
	getRate (json);
});

function getRate (arr) {
	arr.forEach((item)=> {
		const container = document.createElement('div'),
			curName = document.createElement('p'),
			curRate = document.createElement('p');
		container.classList.add('main__container');
		curName.classList.add('main__name');
		curRate.classList.add('main__rate');
		curName.innerHTML = item.Cur_Name;
		curRate.innerHTML = item.Cur_OfficialRate;
		document.body.append(container);
		container.append(curName);
		container.append(curRate);
	});
}

