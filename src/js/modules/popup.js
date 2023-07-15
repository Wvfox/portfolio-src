export function popup() {
	/* ===== Popup ===== */
	const popupLinks = document.querySelectorAll('[data-popup]')

	if (popupLinks.length > 0) {
		// Закрытие модального окна на Esc
		document.addEventListener('keydown', e => {
			if (e.code === 'Escape' && document.querySelector('.popup--active')) {
				document
					.querySelector('.popup--active')
					.classList.remove('popup--active')
				setTimeout(() => {
					document.querySelector('body').classList.remove('body--lock')
					document.querySelector('header').classList.remove('header--lock')
				}, 300)
			}
		})
		// Привязка ссылок к модальным окнам
		popupLinks.forEach(link => {
			const popup = document.querySelector(link.dataset.popup)
			popup.querySelector('.popup__close').addEventListener('click', e => {
				popup.classList.remove('popup--active')
				setTimeout(() => {
					document.querySelector('body').classList.remove('body--lock')
				}, 300)

				e.preventDefault()
			})
			// Кнопка закрытия
			link.addEventListener('click', e => {
				popup.classList.add('popup--active')
				document.querySelector('body').classList.add('body--lock')
				document.querySelector('header').classList.add('header--lock')
				e.preventDefault()
			})
		})
	}
}
