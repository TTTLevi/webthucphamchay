// owl carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

//load trang
$(window).on('load',function(event) {
    $('body').removeClass('preloading');
    $('.load').delay(1500).fadeOut('fast');
});