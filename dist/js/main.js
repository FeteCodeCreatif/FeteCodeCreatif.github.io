$(document).ready(function() {
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        "gutter": ".gutter-sizer"
    })
    smoothScroll.init();

    $grid.imagesLoaded().progress( function() {
	  $grid.masonry('layout');
	});
});

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#main-nav').addClass('stick');
    } else {
    	$('#main-nav').removeClass('stick');
    }
}
$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});