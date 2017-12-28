
var productSwiper = new Swiper('.cases-swiper', {
    loop: false,
    slidesPerColumn : Sunset.Device.isXs() ? 2 : 3,
    slidesPerView: Sunset.Device.isXs() ? 2 : 3
})

$('.cases-swiper-container').on('click','.swiper-outer-trigger',function(){
    productSwiper[$(this).hasClass('prev')?'slidePrev':'slideNext']();
})