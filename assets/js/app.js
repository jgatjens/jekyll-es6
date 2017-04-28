// Global App obj
var App = {
	// Add canvas animation.
	footer: {
		init: function () {

		}
	}
}

// Init app funcionality
$(function() {
	var slideIndex = 0;

	$('.bd-navigation').slick({
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.js-add-slide').on('click', function() {
		slideIndex++;
		$('.bd-navigation').slick('slickAdd','<div><span class="number">' + slideIndex + '</span></div>');
	});

	$('.js-remove-slide').on('click', function() {
		$('.bd-navigation').slick('slickRemove', slideIndex - 1);
		if (slideIndex !== 0){
			slideIndex--;
		}
	});

});
