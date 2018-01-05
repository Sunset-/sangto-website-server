var caseCount = $('.swiper-slide-case').length;

var productSwiper = new Swiper('.cases-swiper', {
    loop: false,
    slidesPerColumn: caseCount < 4 ? 1 : (Sunset.Device.isXs() ? 2 : (caseCount > 9 ? 3 : 2)),
    slidesPerView: caseCount <4 ? 1 : (Sunset.Device.isXs() ? 2 : (caseCount > 9 ? 3 : 2))
})

$('.cases-swiper-container').on('click', '.swiper-outer-trigger', function () {
    productSwiper[$(this).hasClass('prev') ? 'slidePrev' : 'slideNext']();
});