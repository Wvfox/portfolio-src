export function spoilersActivate() {
	/* ==== Spoilers ==== */
	const spoilers = document.querySelectorAll('.spoilers')
	if (spoilers) {
		spoilers.forEach(spoiler => {
			if (spoiler.querySelector('.spoiler--open')) {
				// Инициализация открытого спойлера
				_spoilerOpen(spoiler.querySelector('.spoiler--open'))
			}
			// Определение включен или отключен режим аккордеона
			const accordionMode = spoiler.hasAttribute('data-accordion')
				? true
				: false

			// Событие на родительский элемент обертку
			spoiler.addEventListener('click', e => {
				if (
					e.target.parentElement.classList.contains('spoilers__control') ||
					e.target.classList.contains('spoilers__control')
				) {
					const spoilerItem = e.target.closest('.spoilers__item')
					if (
						accordionMode &&
						!spoilerItem.classList.contains('spoiler--open')
					) {
						const spoilerOpen = spoiler.querySelector('.spoiler--open')
						if (spoilerOpen) {
							spoilerOpen.classList.remove('spoiler--open')
							_spoilerClose(spoilerOpen)
						}
					}

					_spoilerToggle(spoilerItem)
					e.preventDefault()
				}
			})
		})

		// Функция показа
		function _spoilerOpen(spoilerItem) {
			// Заголовок-кнопка
			spoilerItem
				.querySelector('.spoilers__control')
				.setAttribute('aria-expanded', true)
			// Контент спойлера
			spoilerItem
				.querySelector('.spoilers__content')
				.setAttribute('aria-hidden', false)
			spoilerItem.querySelector('.spoilers__content').style.maxHeight =
				spoilerItem.querySelector('.spoilers__content').scrollHeight + 'px'
		}
		// Функция скрытия
		function _spoilerClose(spoilerItem) {
			// Заголовок-кнопка
			spoilerItem
				.querySelector('.spoilers__control')
				.setAttribute('aria-expanded', false)
			// Контент спойлера
			spoilerItem
				.querySelector('.spoilers__content')
				.setAttribute('aria-hidden', true)
			spoilerItem.querySelector('.spoilers__content').style.maxHeight = null
		}
		// Функция переключения
		function _spoilerToggle(spoilerItem) {
			spoilerItem.classList.toggle('spoiler--open')
			if (spoilerItem.classList.contains('spoiler--open')) {
				_spoilerOpen(spoilerItem)
			} else {
				_spoilerClose(spoilerItem)
			}
		}
	}
}
