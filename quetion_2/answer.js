/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
	var RESPONSES = {
		'/countries': [
			{name: 'Cameroon', continent: 'Africa'},
			{name :'Fiji Islands', continent: 'Oceania'},
			{name: 'Guatemala', continent: 'North America'},
			{name: 'Japan', continent: 'Asia'},
			{name: 'Yugoslavia', continent: 'Europe'},
			{name: 'Tanzania', continent: 'Africa'}
		],
		'/cities': [
			{name: 'Bamenda', country: 'Cameroon'},
			{name: 'Suva', country: 'Fiji Islands'},
			{name: 'Quetzaltenango', country: 'Guatemala'},
			{name: 'Osaka', country: 'Japan'},
			{name: 'Subotica', country: 'Yugoslavia'},
			{name: 'Zanzibar', country: 'Tanzania'},
		],
		'/populations': [
			{count: 138000, name: 'Bamenda'},
			{count: 77366, name: 'Suva'},
			{count: 90801, name: 'Quetzaltenango'},
			{count: 2595674, name: 'Osaka'},
			{count: 100386, name: 'Subotica'},
			{count: 157634, name: 'Zanzibar'}
		]
	};

	setTimeout(function () {
		var result = RESPONSES[url];
		if (!result) {
			return callback('Unknown url');
		}

		callback(null, result);
	}, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

var requests = ['/countries', '/cities', '/populations'];
var responses = {};
var search = prompt('Введите название страны или города:', 'Cameroon');

for (i = 0; i < 3; i++) {
	var request = requests[i];
	
	var callback = function (error, result) {
		/** 
		Во время вызова callback функции, переменная  request уже равна '/populations', так как она выполняется через какое-то время, и цикл уже закончился. Поэтому не понятно, к какому запросу выполняется callback функция. Лучшим вариантом будет в callback передавать еще и url, чтобы понять, к чему относятся полученные данные. Я же для решения задачи проверяю, какие данные получили и привязываю их к соответствующему запросу
		 */
		var request = '';
		if (result[0].continent)
			request = '/countries';
		else if (result[0].country)
			request = '/cities';
		else if (result[0].count)
			request = '/populations';
	  
		responses[request] = result;
	  
		var l = [];
		for (K in responses)
			l.push(K);

		if (l.length == 3) {
			/**
				Для подсчета населения в городе или стране я сначала смотрю, имеется ли страна, соответствующая введенному запросу. Если страна есть, то в следующем цикле получаю все города страны. Если страны нет, то в следующем цикле ищу этот город. В конечном итоге получим либо один город, если такой нашелся или города страны, если введенный запрос соответствует стране. В противном случае мы не получим ничего.
			*/
			var c = [], cc = [], p = 0;
			for (i = 0; i < responses['/countries'].length; i++) {
				if (responses['/countries'][i].name === search) {
					c.push(responses['/countries'][i].name);
				}
			}

			for (i = 0; i < responses['/cities'].length; i++) {
			  if(c.length > 0) {
				for (j = 0; j < c.length; j++) {
					if (responses['/cities'][i].country === c[j]) {
						cc.push(responses['/cities'][i].name);
					}
				}
			  } else {
				if (responses['/cities'][i].name === search) {
					cc.push(responses['/cities'][i].name);
				}
			  }
			}

			for (i = 0; i < responses['/populations'].length; i++) {
				for (j = 0; j < cc.length; j++) {
					if (responses['/populations'][i].name === cc[j]) {
						p += responses['/populations'][i].count;
					}
				}
			}

			console.log('Total population in ' + search + ': ' + p);
			document.write('Total population in ' + search + ': ' + p);
		}
	};

	getData(request, callback);
}