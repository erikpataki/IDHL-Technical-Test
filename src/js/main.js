document.addEventListener('DOMContentLoaded', () => {
	// Basket open triggers
	const basketIcon = document.querySelector('.header__basket-icon');
	const addToBagButtons = document.querySelectorAll('.product__button');

	// Basket close triggers
	const basketClose = document.querySelector('.basket__close');
	const continueButton = document.querySelector('.basket__continue');
	const overlay = document.querySelector('.basket__overlay');
	const basket = document.querySelector('.basket');
	const header = document.querySelector('.header');

	// Open basket when clicking basket icon
	if (basketIcon) {
		basketIcon.addEventListener('click', window.openBasket);
	}

	// Open basket when clicking "Add to Bag" buttons
	addToBagButtons.forEach(button => {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			window.openBasket();
		});
	});

	// Close basket when clicking X button
	if (basketClose) {
		basketClose.addEventListener('click', window.closeBasket);
	}

	// Close basket when clicking "Continue Shopping"
	if (continueButton) {
		continueButton.addEventListener('click', window.closeBasket);
	}

	// Close basket when clicking off basket (overlay)
	if (overlay) {
		overlay.addEventListener('click', window.closeBasket);
	}

	// Close basket on Escape key
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && basket.classList.contains('basket--active')) {
			window.closeBasket();
		}
	});

	// Mobile header hide/reveal on scroll
	if (header) {
		const desktopQuery = window.matchMedia('(min-aspect-ratio: 1/1)');
		let lastScrollY = Math.max(window.scrollY, 0);

		const updateHeaderVisibility = () => {
			const currentScroll = Math.max(window.scrollY, 0);
			const headerHeight = header.offsetHeight;
			const isDesktop = desktopQuery.matches;

			if (isDesktop) {
				header.classList.remove('header--hidden', 'header--shadow');
				lastScrollY = currentScroll;
				return;
			}

			if (currentScroll > headerHeight && currentScroll > lastScrollY) {
				header.classList.add('header--hidden');
			} else if (currentScroll < lastScrollY || currentScroll <= headerHeight) {
				header.classList.remove('header--hidden');
			}

			header.classList.toggle('header--shadow', currentScroll > headerHeight);
			lastScrollY = currentScroll;
		};

		window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
		if (desktopQuery.addEventListener) {
			desktopQuery.addEventListener('change', updateHeaderVisibility);
		} else if (desktopQuery.addListener) {
			desktopQuery.addListener(updateHeaderVisibility);
		}

		window.addEventListener('resize', () => {
			lastScrollY = Math.max(window.scrollY, 0);
			updateHeaderVisibility();
		});

		updateHeaderVisibility();
	}
});