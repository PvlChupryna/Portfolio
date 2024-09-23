function popupValidate() {
    function formValidate({ formSelector, rules, onSuccess }) {
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector(formSelector);
            
            if (!form) {
                console.error(`Form with selector "${formSelector}" not found`);
                return;
            }
    
            const successMessage = form.querySelector('.success-massage');
            const successBtn = form.querySelector('.success-massage__btn');
    
            if (!successMessage || !successBtn) {
                console.error('Success message elements not found');
                return;
            }
    
            // Обработчик для событий 'invalid' на каждом поле
            rules.forEach(({ selector, test }) => {
                const input = form.querySelector(selector);
    
                if (!input) {
                    console.error(`Input with selector "${selector}" not found`);
                    return;
                }
    
                input.addEventListener('invalid', function (e) {
                    e.preventDefault(); // Предотвращаем стандартные сообщения браузера
                    input.classList.add('_error'); // Добавляем класс _error
                });
    
                // Удаляем класс _error при вводе
                input.addEventListener('input', function () {
                    if (input.checkValidity()) {
                        input.classList.remove('_error');
                    }
                });
            });
    
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // Предотвращаем отправку формы по умолчанию
                
                let hasError = false;
    
                // Проверяем каждое поле по заданным правилам
                rules.forEach(({ selector, test }) => {
                    const input = form.querySelector(selector);
                    if (!input) return;
    
                    if (!test(input)) {
                        input.classList.add('_error');
                        hasError = true;
                    } else {
                        input.classList.remove('_error');
                    }
                });
    
                if (!hasError) {
                    // Если нет ошибок, вызываем onSuccess
                    onSuccess(form, successMessage, successBtn);


                    // Закрываем сообщение об отправке
                    successMessage.addEventListener('click', removeActiveClass);
                    successBtn.addEventListener('click', removeActiveClass);

                    function removeActiveClass() {
                        successMessage.classList.remove('success-massage--active');
                        successBtn.classList.remove('success-massage__btn--active');
                    }
                } else {
                    form.reportValidity(); // Показываем стандартные сообщения валидации
                }
            });
        });
    }
    
    // Валидация для формы 1
    formValidate({
        formSelector: '#popupForm',
        rules: [
            {
                selector: '#p-name',
                test: (input) => input.value.trim() !== '', // Проверка, что поле не пустое
            },
            {
                selector: '#p-message',
                test: (input) => input.value.trim() !== '', // Проверка, что поле не пустое
            }
        ],
        onSuccess: (form, successMessage, successBtn) => {
            successMessage.classList.add('success-massage--active');
            successBtn.classList.add('success-massage__btn--active');
            form.reset();
            console.log('Popup Form submitted successfully!');
        }
    });

    // Валидация для формы 2 с дополнительной проверкой email
    formValidate({
        formSelector: '#footer-form',
        rules: [
            {
                selector: '#c-name',
                test: (input) => input.value.trim() !== '', // Проверка на непустое поле
            },
            {
                selector: '#c-email',
                test: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value), // Проверка email
            },
            // {
            //     selector: '#c-phone',
            //     test: (input) => /^\+38\s\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(input.value), // Проверка номера телефона в формате +38 (XXX)-XXX-XX-XX
            // }
        ],
        onSuccess: (form, successMessage, successBtn) => {
            successMessage.classList.add('success-massage--active');
            successBtn.classList.add('success-massage__btn--active');
            form.reset();
            console.log('Contact Form submitted successfully!');
        }
    });

   
    
}
export default popupValidate;
