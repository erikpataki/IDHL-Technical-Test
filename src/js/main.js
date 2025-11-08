document.addEventListener('DOMContentLoaded', () => {
	const basketIcon = document.querySelector('.basket-icon');
	const basketContainer = document.querySelector('.basket-container');
	const basketOverlay = document.querySelector('.basket-bg-overlay');
	const basketClose = document.querySelector('.basket-close-icon');
		const addToBagButtons = document.querySelectorAll('.add-to-bag-button');
	const root = document.documentElement;

	if (!basketIcon || !basketContainer || !basketOverlay) {
		return;
	}

	const openBasket = () => {
		const scrollbarWidth = window.innerWidth - root.clientWidth;
		root.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
		basketContainer.classList.add('active');
		basketOverlay.classList.add('active');
		document.body.classList.add('basket-open');
	};

	const closeBasket = () => {
		basketContainer.classList.remove('active');
		basketOverlay.classList.remove('active');
		document.body.classList.remove('basket-open');
		root.style.setProperty('--scrollbar-compensation', '0px');
	};

	basketIcon.addEventListener('click', openBasket);

		if (addToBagButtons.length) {
			addToBagButtons.forEach((button) => {
				button.addEventListener('click', (event) => {
					event.preventDefault();
					openBasket();
				});
			});
		}

	if (basketClose) {
		basketClose.addEventListener('click', closeBasket);
	}

	basketOverlay.addEventListener('click', closeBasket);

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeBasket();
		}
	});
});