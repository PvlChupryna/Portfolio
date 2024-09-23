function tabs() {
    const tabs = document.querySelectorAll('.tabs__btn');
    const all_content = document.querySelectorAll('.tabs__content');

    tabs.forEach((tab, index)=>{
        tab.addEventListener('click', (e)=>{
            tabs.forEach(tab => {tab.classList.remove('tabs__btn--active')});
            tab.classList.add('tabs__btn--active');


            // let indicator = document.querySelector('.btn-indicator');
            // indicator.style.width = e.target.offsetWidth + 'px';
            // indicator.style.left = e.target.offsetLeft + 'px';
            // indicator.style.bottom = e.target.offsetBottom + 'px';


            all_content.forEach(content=>{content.classList.remove('tabs__content--active')});
            all_content[index].classList.add('tabs__content--active');
        })

    })
}
export default tabs;

