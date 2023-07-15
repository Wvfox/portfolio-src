export function animations() {
	function onEntry(entry) {
		entry.forEach(item => {
			if (item.isIntersecting) {
				item.target.classList.add('animation--show')
				item.target.classList.remove('animation--hidden')
			} else {
				item.target.classList.remove('animation--show')
				item.target.classList.add('animation--hidden')
			}
		})
	}

	let option = {}
	if (window.innerWidth < 768) {
		option = {
			threshold: [0.02],
		}
	} else {
		option = {
			threshold: [0.25],
		}
	}
	let observe = new IntersectionObserver(onEntry, option)
	let elements = document.querySelectorAll('.animation')

	for (let elem of elements) {
		observe.observe(elem)
	}
}
