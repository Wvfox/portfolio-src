export function navigation() {
	// Настройка ссылок навигации
	let navLinks = document.querySelectorAll('[data-goto]')
	if (navLinks.length > 0) {
		navLinks.forEach(link => {
			link.addEventListener('click', onMenuLinkClick)
		})

		// Функция активации перехода при нажатии на ссылку
		function onMenuLinkClick(event) {
			const menuLink = event.target
			if (
				menuLink.dataset.goto &&
				document.getElementById(menuLink.dataset.goto)
			) {
				// Получение привязанной секции
				const gotoBlock = document.getElementById(menuLink.dataset.goto)
				// Получение расстояния от верхней границы до секции
				const gotoBlockValue =
					gotoBlock.getBoundingClientRect().top +
					scrollY -
					document.querySelector('header').offsetHeight

				// Скрытие меню при нажатии на пункт меню
				if (menuIcon.classList.contains('menu--active')) {
					document.body.classList.remove('body--lock')
					menuIcon.classList.remove('menu--active')
					menuBody.classList.remove('menu--active')
				}

				window.scrollTo({
					top: gotoBlockValue,
					behavior: 'auto',
				})
				event.preventDefault()
			}
		}
	}

	// Меню-бургер
	const menuIcon = document.querySelector('.menu__icon')
	const menuBody = document.querySelector('.menu__body')
	if (menuIcon) {
		// Открытие и закрытие меню
		menuIcon.addEventListener('click', e => {
			document.body.classList.toggle('body--lock')
			menuIcon.classList.toggle('menu--active')
			menuBody.classList.toggle('menu--active')
		})
	}

	// Заполнение массива с данными о секциях сайта
	let sections = document.querySelectorAll('.section')
	let sectionsArray = []
	sections.forEach(item => {
		const section = {}
		// Высота от верхнего края, смещенная выше для корректной смены активного пункта меню
		section.offset = item.offsetTop - item.offsetHeight * 0.4
		// Высота секции
		section.height = item.offsetHeight
		section.id = item.getAttribute('id')
		sectionsArray.push(section)
	})

	// Отключение на мобильных телефонах
	if (window.innerWidth > 1100) {
		// Активная пункт при загрузки/перезагрузки страницы
		window.addEventListener('load', activeMenuLink)

		// Смена активного пункта при скролле
		window.addEventListener('scroll', () => {
			activeMenuLink()
		})

		// Функция активация пункта меню
		function activeMenuLink() {
			sectionsArray.forEach(section => {
				if (
					window.scrollY >= section.offset &&
					window.scrollY < section.offset + section.height
				) {
					navLinks.forEach(link => {
						link.classList.remove('header__nav-link--active')
						if (link.dataset.goto === section.id) {
							link.classList.add('header__nav-link--active')
						}
					})
				}
			})
		}
	}
}
