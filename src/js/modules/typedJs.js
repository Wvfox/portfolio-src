// Typed Js
// https://github.com/mattboldt/typed.js/
export function typedJs() {
	const typed = new Typed('.multiple-text', {
		strings: ['Веб-разработчик', 'Фронтенд-разработчик', 'Верстальщик'],
		typeSpeed: 100,
		backSpeed: 100,
		backDelay: 1000,
		loop: true,
	})
}
