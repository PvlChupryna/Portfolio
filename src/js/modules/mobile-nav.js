function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('.mobile-nav-btn');
	const nav = document.querySelector('.mobile-nav');
	const menuIcon = document.querySelector('.nav-icon');
	const navItems = document.querySelectorAll('.mobile-nav__list-item'); // Селектор для пунктов меню

	// Открытие/закрытие мобильного меню
	navBtn.onclick = function () {
		nav.classList.toggle('mobile-nav--open');
		menuIcon.classList.toggle('nav-icon--active');
		document.body.classList.toggle('no-scroll');
	};

	// Закрытие мобильного меню при нажатии на пункт меню с секундной задержкой
	navItems.forEach(item => {
		item.addEventListener('click', () => {
			// Добавляем задержку в 1 секунду
			setTimeout(() => {
				nav.classList.remove('mobile-nav--open'); // Убираем класс, чтобы закрыть меню
				menuIcon.classList.remove('nav-icon--active'); // Возвращаем иконку в начальное состояние
				document.body.classList.remove('no-scroll'); // Восстанавливаем прокрутку
			}, 450); // Задержка в 1 секунду (1000 миллисекунд)
		});
	});
}

export default mobileNav;
