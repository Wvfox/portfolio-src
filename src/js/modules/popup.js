export function popup() {
	/* ===== Popup ===== */
	const popupLinks = document.querySelectorAll('[data-popup]')

	if (popupLinks.length > 0) {
		// Закрытие модального клика, при клике вне области контента
		document.addEventListener('click', e => {
			if (e.target.classList.contains('popup')) {
				popupClose()
			}
		})
		// Закрытие модального окна на Esc
		document.addEventListener('keydown', e => {
			if (e.code === 'Escape' && document.querySelector('.popup--active')) {
				popupClose()
			}
		})
		// Привязка ссылок к модальным окнам
		popupLinks.forEach(link => {
			const popup = document.querySelector(link.dataset.popup)
			popup.querySelector('.popup__close').addEventListener('click', e => {
				popupClose()
				e.preventDefault()
			})
			// Кнопка открытия
			link.addEventListener('click', e => {
				popup.classList.add('popup--active')
				document.querySelector('body').classList.add('body--lock')
				document.querySelector('header').classList.add('header--lock')
				e.preventDefault()
			})
		})
		// Функция закрытия
		function popupClose() {
			document.querySelector('.popup--active').classList.remove('popup--active')
			setTimeout(() => {
				document.querySelector('body').classList.remove('body--lock')
				document.querySelector('header').classList.remove('header--lock')
			}, 300)
		}
	}
}
