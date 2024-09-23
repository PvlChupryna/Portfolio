// Функция throttle для ограничения частоты вызова
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function headerSticky() {
    const header = document.querySelector('.header__bg');
    if (!header) return;  // Если header не найден, прекращаем выполнение функции
    let headerHeight = header.clientHeight;
    let initialYvalue = window.scrollY;
    const body = document.querySelector('body');
    console.log(headerHeight);
    if (body) {
        console.log(headerHeight)
        //добавление паддинга для body выcотой как header
        body.style.paddingTop = headerHeight + 'px';
    }

    let isItHidden = false;
    let isItFixed = false;

    // Обработчик прокрутки, обернутый в throttle
    const onScroll = throttle(() => {
        const scrollY = window.scrollY;

        // точка с которой убираем паддинги
        if (scrollY > headerHeight) { 
            makeItFixed();

            // точка с которой скрываем шапку
            if (scrollY > headerHeight + 100 && scrollY > initialYvalue) {
                if (!isItHidden) {
                    header.classList.add('hidden-header');
                    isItHidden = true;
                }
            } else {
                if (isItHidden) {
                    header.classList.remove('hidden-header');
                    isItHidden = false;
                }
            }
        } else {
            makeItNotFixed();
        }
        
        initialYvalue = scrollY;
    }, 100);  // ограничиваем частоту вызова до 100 миллисекунд

    window.addEventListener('scroll', onScroll);

    function makeItFixed() {
        if (!isItFixed) {
            header.classList.add('header__fixed');
            isItFixed = true;
        }
    }

    function makeItNotFixed() {
        if (isItFixed) {
            header.classList.remove('header__fixed');
            isItFixed = false;
        }
    }
}

export default headerSticky;
