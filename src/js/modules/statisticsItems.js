// Функция для заполнения индикатора в зависимости от значения в счетчике

export function fillProgressBar() {
	const statisticsItems = document.querySelectorAll('.skills__statistics-item')
	statisticsItems.forEach(item => {
		item.querySelector('.skills__item-progressbar').firstChild.style.width =
			item.querySelector('.skills__item-value').innerHTML
	})
}
