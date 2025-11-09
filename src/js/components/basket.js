const basket = document.querySelector('.basket');
const overlay = document.querySelector('.basket__overlay');
const root = document.documentElement;

function openBasket() {
	// Calculate scrollbar width for layout shift compensation
	const scrollbarWidth = window.innerWidth - root.clientWidth;
	root.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
	
	// Open basket with animation
	basket.classList.remove('basket--closing');
	basket.classList.add('basket--active');
	overlay.classList.add('basket__overlay--active');
	document.body.classList.add('basket--open');
}

function closeBasket() {
	if (!basket.classList.contains('basket--active')) {
		return;
	}

	// Start closing animation
	basket.classList.remove('basket--active');
	basket.classList.add('basket--closing');
	overlay.classList.remove('basket__overlay--active');

	// Wait for animation to complete before cleanup
	const handleTransitionEnd = (event) => {
		if (event.target !== basket || event.propertyName !== 'transform') {
			return;
		}

		basket.classList.remove('basket--closing');
		document.body.classList.remove('basket--open');
		root.style.setProperty('--scrollbar-compensation', '0px');
		basket.removeEventListener('transitionend', handleTransitionEnd);
	};

	basket.addEventListener('transitionend', handleTransitionEnd);
}

// Make functions available globally for use in main.js
window.openBasket = openBasket;
window.closeBasket = closeBasket;
