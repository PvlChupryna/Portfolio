function changeCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.follower');
    const links = document.querySelectorAll('.link');
    const body = document.querySelector('body');

    if (!cursor || !follower || !body) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Основная функция анимации курсора и follower
    function updateCursor() {
        // Плавное движение follower за мышью
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;

        // Устанавливаем позицию для курсора и follower
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

        follower.style.left = `${posX - 12}px`;
        follower.style.top = `${posY - 12}px`;

        requestAnimationFrame(updateCursor);
    }

    requestAnimationFrame(updateCursor);

    // Обработка движения мыши
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Убираем классы "out", если они присутствуют
        cursor.classList.remove('out');
        follower.classList.remove('out');
    });

    // Hover-эффект на ссылки
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });

        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // Скрытие курсора при выходе за пределы окна
    body.addEventListener('mouseleave', () => {
        cursor.classList.add('out');
        follower.classList.add('out');
    });

    // Скролл больше не скрывает курсор на обычных устройствах
    window.addEventListener('scroll', () => {
        cursor.classList.remove('out');
        follower.classList.remove('out');
    });

    // Для сенсорных устройств: удаление класса "active" только у follower
    window.addEventListener('touchmove', () => {
        follower.classList.remove('active');
    });
} 

export default changeCursor;
