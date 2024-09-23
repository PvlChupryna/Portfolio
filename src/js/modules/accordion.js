function accordion() {
    const triggers = document.querySelectorAll('.accordion__trigger');

    // Открываем первый элемент при загрузке страницы
    if (triggers.length > 0) {
        const firstTrigger = triggers[0];
        const firstBox = firstTrigger.closest(".accordion");
        const firstContent = firstBox.lastElementChild;

        firstTrigger.classList.add('accordion__trigger--active');
        // scrollHeight почему то не раскрывает на 100%...
        // firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstContent.style.maxHeight = '100%';
        
    }

    triggers.forEach(item => item.addEventListener('click', (e) => {
        const currentBox = e.target.closest(".accordion");
        const currentTrigger = currentBox.firstElementChild;
        const currentContent = currentBox.lastElementChild;

        // // Закрываем все остальные боксы, кроме текущего
        // triggers.forEach(trigger => {
        //     if (trigger !== currentTrigger && trigger.classList.contains('accordion__trigger--active')) {
        //         trigger.classList.remove('accordion__trigger--active');
        //         trigger.nextElementSibling.style.maxHeight = 0;
        //     }
        // });

        //постоянно открыт только один, не закрывается
        triggers.forEach((trigger) => {
            if (trigger.classList.contains('accordion__trigger--active')) {
                trigger.classList.remove('accordion__trigger--active');
                trigger.nextElementSibling.style.maxHeight = 0;
            }  
        });

        // Переключаем состояние текущего элемента
        currentTrigger.classList.toggle('accordion__trigger--active');
        if (currentTrigger.classList.contains('accordion__trigger--active')) {
            currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
            // currentContent.classList.add('accordion__content--active');
        } else {
            currentContent.style.maxHeight = 0;
            // currentContent.classList.remove('accordion__content--active');
        }

        //currentBox.classList.toggle('active-box');
    }));
}

export default accordion;
