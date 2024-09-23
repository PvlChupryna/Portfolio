import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function reviewsSwiper () {     
    const swiper = new Swiper('.swiper', {
        
        //loop: true,
      
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        // Navigation arrows
        navigation: {
          nextEl: '.slide-next',
          prevEl: '.slide-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
        }
      
        
      });

}
export default reviewsSwiper;