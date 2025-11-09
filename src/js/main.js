document.addEventListener('DOMContentLoaded', () => {
	const basketIcon = document.querySelector('.header__basket-icon');
	const basketContainer = document.querySelector('.basket');
	const basketOverlay = document.querySelector('.basket__overlay');
	const basketClose = document.querySelector('.basket__close');
		const addToBagButtons = document.querySelectorAll('.product__button');
	const root = document.documentElement;

	if (!basketIcon || !basketContainer || !basketOverlay) {
		return;
	}

	const openBasket = () => {
			basketContainer.classList.remove('basket--closing');
		const scrollbarWidth = window.innerWidth - root.clientWidth;
		root.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
		basketContainer.classList.add('basket--active');
		basketOverlay.classList.add('basket__overlay--active');
		document.body.classList.add('basket--open');
	};

	const closeBasket = () => {
			if (!basketContainer.classList.contains('basket--active')) {
				return;
			}

			basketContainer.classList.remove('basket--active');
			basketContainer.classList.add('basket--closing');
			basketOverlay.classList.remove('basket__overlay--active');

			const handleTransitionEnd = (event) => {
				if (event.target !== basketContainer || event.propertyName !== 'transform') {
					return;
				}

				basketContainer.classList.remove('basket--closing');
				document.body.classList.remove('basket--open');
				root.style.setProperty('--scrollbar-compensation', '0px');
				basketContainer.removeEventListener('transitionend', handleTransitionEnd);
			};

			basketContainer.addEventListener('transitionend', handleTransitionEnd);
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

	const basketContinue = document.querySelector('.basket__continue');
	if (basketContinue) {
		basketContinue.addEventListener('click', closeBasket);
	}

	basketOverlay.addEventListener('click', closeBasket);

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeBasket();
		}
	});
});