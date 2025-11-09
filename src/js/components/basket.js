const basket = document.querySelector('.basket');
const overlay = document.querySelector('.basket__overlay');
const loader = document.querySelector('.basket__loader');
const root = document.documentElement;

function openBasket() {
	// Show loading state
	overlay.classList.add('basket__overlay--active');
	loader.classList.add('basket__loader--active');
	document.body.classList.add('basket--open');

	// Calculate scrollbar width for layout shift compensation
	const scrollbarWidth = window.innerWidth - root.clientWidth;
	root.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
	
	// Wait 1 second before opening basket
	setTimeout(() => {
		loader.classList.remove('basket__loader--active');
		basket.classList.remove('basket--closing');
		basket.classList.add('basket--active');
	}, 1000);
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
