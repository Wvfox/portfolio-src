// Меню бургера
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener('click', e => {
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('menu_open')

		if (iconMenu.classList.contains('_active')) {
			iconMenu.classList.remove('_icon-menu')
			iconMenu.classList.add('_icon-close')
		} else {
			iconMenu.classList.remove('_icon-close')
			iconMenu.classList.add('_icon-menu')
		}
		e.preventDefault()
	})
	document.addEventListener('click', e => {
		if (
			!e.target.classList.contains('menu__body') &&
			!e.target.classList.contains('menu__icon')
		) {
			iconMenu.classList.remove('_active')
			iconMenu.classList.remove('_icon-close')
			iconMenu.classList.add('_icon-menu')
			menuBody.classList.remove('menu_open')
		}
	})
}

// Блоки-свертки - bundle
const bundles = document.querySelectorAll('.bundle')
if (bundles.length > 0) {
	bundles.forEach(bundle => {
		bundle.addEventListener('click', e => {
			if (e.target.classList.contains('bundle__title')) {
				bundle.classList.toggle('bundle_close')
			}
			if (
				e.target.classList.contains('bundle__close-btn') ||
				e.target.classList.contains('bundle__triangle')
			) {
				bundle.classList.add('bundle_close')
			}
		})
	})
}

/* --- */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) {
	spoilers.forEach(spoiler => {
		let spoilerTitle = ''
		spoiler.addEventListener('mouseover', e => {
			if (e.target.classList.contains('spoiler__title')) {
				spoilerTitle = e.target
				spoilerTitle.nextElementSibling.classList.add('spoiler__content_active')
			} else {
				if (spoilerTitle) {
					spoilerTitle.nextElementSibling.classList.remove(
						'spoiler__content_active'
					)
					spoilerTitle = ''
				}
			}
		})
	})
}

/* --- */

// Спойлеры - spoilers
const spoilersArray = document.querySelectorAll('[data-spoilers]')
if (spoilersArray.length > 0) {
	// Получение обычный спойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(
		(item, index, self) => {
			return !item.dataset.spoilers.split(',')[0]
		}
	)
	// Инициализация обычных спойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular)
	}
}

// Функция инициализации
function initSpoilers(spoilersArray, matchMedia = false) {
	spoilersArray.forEach(spoilersBlock => {
		spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock
		if (matchMedia.matches || !matchMedia) {
			spoilersBlock.classList.add('_init')
			initSpoilerBody(spoilersBlock)
			spoilersBlock.addEventListener('click', setSpoilerAction)
		} else {
			spoilersBlock.classList.remove('_init')
			initSpoilerBody(spoilersBlock, false)
			spoilersBlock.removeEventListener('click', setSpoilerAction)
		}
	})
}
// Взаимодействие с контентом
function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
	const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]')
	if (spoilerTitles.length > 0) {
		spoilerTitles.forEach(spoilerTitle => {
			if (hideSpoilerBody) {
				spoilerTitle.removeAttribute('tabindex')
				if (!spoilerTitle.classList.contains('_active')) {
					spoilerTitle.nextElementSibling.hidden = true
				}
			} else {
				spoilerTitle.setAttribute('tabindex', '-1')
				spoilerTitle.nextElementSibling.hidden = false
			}
		})
	}
}
function setSpoilerAction(e) {
	const el = e.target
	if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
		const spoilerTitle = el.hasAttribute('data-spoiler')
			? el
			: el.closest('[data-spoiler]')
		const spoilersBlock = spoilerTitle.closest('[data-spoilers]')
		const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler')
			? true
			: false
		if (!spoilersBlock.querySelectorAll('._slide').length) {
			if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
				hideSpoilersBody(spoilersBlock)
			}
			spoilerTitle.classList.toggle('_active')
			_slideToggle(spoilerTitle.nextElementSibling, 500)
		}
		e.preventDefault()
	}
}
function hideSpoilersBody(spoilersBlock) {
	const spoilerActiveTitle = spoilersBlock.querySelector(
		'[data-spoiler]._active'
	)
	if (spoilerActiveTitle) {
		spoilerActiveTitle.classList.remove('_active')
		_slideUp(spoilerActiveTitle.nextElementSibling, 500)
	}
}

/* ---- */
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = target.offsetHeight + 'px'
		target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = 0
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		window.setTimeout(() => {
			target.hidden = true
			target.style.removeProperty('height')
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-top')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
		}, duration)
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide')
		if (target.hidden) {
			target.hidden = false
		}
		let height = target.offsetHeight
		target.style.overflow = 'hidden'
		target.style.height = 0
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		target.offsetHeight
		target.style.transitionProperty = 'height, margin, padding'
		target.style.transitionDuration = duration + 'ms'
		target.style.height = height + 'px'
		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-top')
		target.style.removeProperty('margin-bottom')
		window.setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('_slide')
		}, duration)
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration)
	} else {
		return _slideUp(target, duration)
	}
}
/* ---- */

// Система попапов - popup
const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 500

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index]
		popupLink.addEventListener('click', e => {
			const popupName = popupLink.getAttribute('href').replace('#', '')
			const currentPopup = document.getElementById(popupName)
			popupOpen(currentPopup)
			e.preventDefault()
		})
	}
}

// Кнопка закрытия
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index]
		el.addEventListener('click', e => {
			popupClose(el.closest('.popup'))
			e.preventDefault()
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			// Закрытие открытых popup
			popupClose(popupActive, false)
		} else {
			bodyLock()
		}
		currentPopup.classList.add('open')
		// // Закрытие popup при клике по темной области (фону)
		// currentPopup.addEventListener('click', e => {
		// 	if (!e.target.closest('.popup__container')) {
		// 		popupClose(e.target.closest('.popup'))
		// 	}
		// })
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open')
		if (doUnlock) {
			bodyUnlock()
		}
	}
}

function bodyLock() {
	body.classList.add('lock')
	// Блокировка открытия popup на время анимации CSS, чтобы не было повторного открытия
	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}

function bodyUnlock() {
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index]
			el.style.paddingRight = '0px'
		}
	}
	body.style.paddingRight = '0px'
	body.classList.remove('lock')

	unlock = false
	setTimeout(() => {
		unlock = true
	}, timeout)
}

document.addEventListener('keydown', e => {
	if (e.code === 'Escape') {
		const popupActive = document.querySelector('.popup.open')
		popupClose(popupActive)
	}
})
