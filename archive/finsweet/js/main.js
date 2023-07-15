/* =========================================================== */
/* ====================== Stars Rating ======================= */
const rating = document.querySelector('.rating')
if (rating) {
	initRating(rating)

	// Инициализация рейтинга
	function initRating(rating) {
		initRatingVars(rating)
		setRatingActiveWidth()

		if (rating.classList.contains('rating--set')) {
			setRating(rating)
		}
	}

	// Инициализация переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__stars--active')
		ratingValue = rating.querySelector('.rating__value')
	}
	// Изменение ширины активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05
		ratingActive.style.width = `${ratingActiveWidth}%`
	}
	// Возможность указания оценки
	function setRating(rating) {
		rating.addEventListener('mousemove', e => {
			if (e.target.classList.contains('rating__item')) {
				// Обновление активных звезд
				setRatingActiveWidth(e.target.value)
			} else {
				// Возвращение первоначальную ширину активных звезд
				setRatingActiveWidth()
			}
		})
		rating.addEventListener('click', e => {
			if (e.target.classList.contains('rating__item')) {
				// Отобразить указанную оценку
				ratingValue.innerHTML = `${e.target.value}.0`
				setRatingActiveWidth()
			}
		})
	}
}

/* =========================================================== */
/* ====================== Video Popup ======================= */
const videoBtn = document.querySelector('.header__play')
if (videoBtn) {
	const video = document.querySelector('.popup--video')
	const videoSrc = document.querySelector('.video__src')

	videoBtn.addEventListener('click', e => {
		video.classList.add('popup--show')
	})
	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && video.classList.contains('popup--show')) {
			videoSrc.pause()
			video.classList.remove('popup--show')
		}
	})
}

/* =========================================================== */
/* ======================== Mixitup ========================= */
var mixer = mixitup('.blog__list')

var blogButtonsBox = document.querySelector('.blog__buttons')
if (blogButtonsBox) {
	blogButtonsBox.addEventListener('click', e => {
		if (e.target.classList.contains('blog__mode')) {
			blogButtonsBox.querySelectorAll('.blog__mode').forEach(mode => {
				mode.classList.remove('blog__mode--active')
			})
			e.target.classList.add('blog__mode--active')

			e.preventDefault()
		}
	})
}

/* =========================================================== */
/* ======================== Swiper ========================== */
const swiper = new Swiper('.swiper', {
	loop: false,
	simulateTouch: false,
	slidesPerView: 1,

	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	navigation: {
		nextEl: '.customers__slide-arrow--next',
		prevEl: '.customers__slide-arrow--prev',
	},

	breakpoints: {
		992: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
	},
})

/* =========================================================== */
/* ======================= Spoiler ========================= */
const spoilers = document.querySelectorAll('.spoilers')

if (spoilers) {
	spoilers.forEach(spoiler => {
		// Инициализация открытого спойлера
		_spoilerOpen(spoiler.querySelector('.spoilers__item'))
		// Определение включен или отключен режим аккордеона
		const accordionMode = spoiler.hasAttribute('data-accordion') ? true : false

		// Событие на родительский элемент обертку
		spoiler.addEventListener('click', e => {
			if (e.target.classList.contains('spoilers__control')) {
				const spoilerItem = e.target.parentElement

				if (accordionMode && !spoilerItem.classList.contains('spoiler--open')) {
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

/* =========================================================== */
/* ======================== Burger ========================== */
const menuIcon = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (menuIcon) {
	/* Open/close Menu-burger */
	menuIcon.addEventListener('click', e => {
		document.body.classList.toggle('body--lock')
		menuIcon.classList.toggle('menu--active')
		menuBody.classList.toggle('menu--active')
	})

	/* Scroll from link to block */
	const menuLinks = document.querySelectorAll('[data-anchor]')
	if (menuLinks.length > 0) {
		menuLinks.forEach(link => {
			link.addEventListener('click', e => {
				if (
					e.target.dataset.anchor &&
					document.querySelector(e.target.dataset.anchor)
				) {
					const topValue =
						document
							.querySelector(e.target.dataset.anchor)
							.getBoundingClientRect().top + scrollY

					if (menuIcon.classList.contains('menu--active')) {
						document.body.classList.remove('body--lock')
						menuIcon.classList.remove('menu--active')
						menuBody.classList.remove('menu--active')
					}

					window.scrollTo({
						top: topValue,
						behavior: 'smooth',
					})
					e.preventDefault()
				}
			})
		})
	}
}
