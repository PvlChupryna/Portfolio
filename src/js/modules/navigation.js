function navigation() {
    const navItems = document.querySelectorAll('.nav-list-item');
    const header = document.querySelector('.header__bg'); // Находим шапку для вычисления ее высоты
    let observer;

    // Функция для создания нового observer с адаптивным threshold
    function createObserver() {
        let threshold;

        if (window.innerWidth < 550) {
            threshold = 0.3; // Для экранов меньше 550px порог 0.3
        } else if (window.innerWidth < 768) {
            threshold = 0.5; // Для экранов меньше 768px порог 0.5
        } else {
            threshold = 0.7; // Для экранов больше 768px порог 0.7
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || isLastSectionInView(entry)) {
                    navItems.forEach((link) => {
                        link.classList.remove('is-current');
                    });

                    const currentLinks = document.querySelectorAll(`.nav-list-item[href="#${entry.target.id}"]`);
                    if (currentLinks.length > 0) {
                        currentLinks.forEach((link) => link.classList.add('is-current'));
                    }
                }
            });
        }, {
            threshold: threshold,
        });

        document.querySelectorAll('.section').forEach((section) => observer.observe(section));
    }

    // Функция для проверки видимости последней секции
    function isLastSectionInView(entry) {
        const rect = entry.target.getBoundingClientRect();
        return rect.bottom <= window.innerHeight;
    }

    // Инициализация observer
    createObserver();

    // Обработчик изменения размера экрана (ресайз)
    window.addEventListener('resize', () => {
        observer.disconnect(); // Отключаем предыдущий observer
        createObserver();      // Создаем новый с обновленными параметрами
    });

    // Добавляем обработчик кликов для плавного перехода по якорям с учетом высоты шапки
    navItems.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Получаем высоту шапки
                const headerHeight = header ? header.clientHeight : 0;

                // Скроллим к секции с учетом высоты шапки
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight, // Корректируем прокрутку
                    behavior: 'smooth',
                });
            }
        });
    });
}

export default navigation;
