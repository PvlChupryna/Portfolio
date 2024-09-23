function popup() {
    document.addEventListener('DOMContentLoaded', function () {
        const popup = document.querySelector('.popup');
        const openButton = document.querySelector('.contact-me__btn');
        const closeButton = document.querySelector('.popup__close');
        const popupContent = document.querySelector('.popup__content');
    
        // Открытие попапа при клике на кнопку
        openButton.addEventListener('click', () => {
            popup.classList.toggle('popup--active');
            popupContent.classList.toggle('popup__content--active');
            // popup.style.display = 'flex';
        });
    
        // Закрытие попапа при клике на кнопку закрытия
        closeButton.addEventListener('click', () => {
            popup.classList.toggle('popup--active');
            popupContent.classList.toggle('popup__content--active');
            // popup.style.display = 'none';
        });
    
        // Закрытие попапа при клике вне его содержимого
        popup.addEventListener('click',(event) => {
            if (event.target === popup) {
                popup.classList.toggle('popup--active');
                popupContent.classList.toggle('popup__content--active');
            }
        });
    });
}
export default popup;