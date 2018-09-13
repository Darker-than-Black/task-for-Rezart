"use strict";
// move menu by scrolling page
var lastScrollTop = 0;
$(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop && $(document).scrollTop() >= 50){
        $('.navbar').css({
            "margin": '0',
            "position": 'fixed'
        });
        $('.content').css('padding-top', '150px');
   } else if ($(document).scrollTop() == 0) {
        $('.navbar').css("margin", '50px 0');
   }
   lastScrollTop = st;
});


// Slider
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots: true,
    autoplay:false,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    items: 1
});


// Create Lightbox 
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

// different text for button
$('.card-header button').click(function(){
    if($('.card .collapse').hasClass('show')) {
        console.log('yes');
        $(this).text('show more');
    } else {
        $(this).text('show less');
    }
});

// Animate navbar-toggler in mobile and tablet device
$('.navbar__toggler').on(isMobile ? 'touchend' : 'click', function () {
    if($(this).hasClass('clickTransform')) {
        $(this).removeClass('clickTransform');
        $(this).addClass('clickTransformBack');
    } else {
        $(this).addClass('clickTransform');
        $(this).removeClass('clickTransformBack');
    }
});


// Smooth scroll to anchor
$('.navbar-nav a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });