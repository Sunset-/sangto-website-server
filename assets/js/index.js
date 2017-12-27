var bannerSwiper = new Swiper('.banner-swiper', {
    loop: true,

    // 如果需要分页器
    pagination: '.swiper-pagination',

    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
})

var productSwiper = new Swiper('.product-swiper', {
    loop: true,
    slidesPerView: Sunset.Device.isXs() ? 1 : 3
})

$('.index-swiper-container').on('click','.swiper-outer-trigger',function(){
    productSwiper[$(this).hasClass('prev')?'slidePrev':'slideNext']();
})