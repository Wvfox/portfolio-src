// Настройка ссылок навигации
let navLinks = document.querySelectorAll('.menu__link[data-goto]')
if (navLinks.length > 0) {
	navLinks.forEach(link => {
		link.addEventListener('click', onMenuLinkClick)
	})

	function onMenuLinkClick(event) {
		const menuLink = event.target
		if (
			menuLink.dataset.goto &&
			document.getElementById(menuLink.dataset.goto)
		) {
			const gotoBlock = document.getElementById(menuLink.dataset.goto)
			const gotoBlockValue =
				gotoBlock.getBoundingClientRect().top +
				pageYOffset -
				document.querySelector('header').offsetHeight

			// Скрытие меню при нажатии на пункт меню
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock')
				iconMenu.classList.remove('_active')
				menuBody.classList.remove('_active')
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			})
			event.preventDefault()
		}
	}
}

// Кнопка возврата футера
let footerLink = document.querySelector('.footer__link')
footerLink.addEventListener('click', event => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
	event.preventDefault()
})

// Заполнение массива с данными о секциях сайта
let sections = document.querySelectorAll('.page-section')
let sectionsArray = []
sections.forEach(item => {
	const section = {}
	let height = item.offsetHeight
	let offset = item.offsetTop - item.offsetHeight * 0.4
	let id = item.getAttribute('id')
	section.offset = offset
	section.height = height
	section.id = id
	sectionsArray.push(section)
})

// Активная пункт при загрузки/перезагрузки страницы
window.addEventListener('load', activeMenuLink)

// Смена активного пункта при скролле
window.addEventListener('scroll', activeMenuLink)

function activeMenuLink(e) {
	sectionsArray.forEach(section => {
		let top = window.scrollY

		if (top >= section.offset && top < section.offset + section.height) {
			navLinks.forEach(link => {
				link.classList.remove('_active')
				if (link.dataset.goto === section.id) {
					link.classList.add('_active')
				}
			})
		}
	})
}

// Меню бургера
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener('click', e => {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active')
	})
}

// Typed Js
// https://github.com/mattboldt/typed.js/
const typed = new Typed('.multiple-text', {
	strings: ['Web-developer', 'Frontend Developer', 'Backend Developer'],
	typeSpeed: 100,
	backSpeed: 100,
	backDelay: 1000,
	loop: true,
})
