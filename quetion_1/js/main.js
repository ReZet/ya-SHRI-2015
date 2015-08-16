$(function() {
	var $tabloHead = $('.tablo_head_fix');
	var tabloOffsetTop = $tabloHead.offset().top;
	var tabloOffsetLeft = $('.flight_list').offset().left;
	fixTabloHead();
	
	$(window).on('scroll', function() {
		fixTabloHead();
	});
	$(window).on('resize', function() {
		tabloOffsetLeft = $('.flight_list').offset().left;
		var x = 0 - $(window).scrollLeft();
		if($tabloHead.hasClass('fixed')) {
			$tabloHead.css({
				left: x + tabloOffsetLeft
			});
		}
	});
	
	$('.type_flight').on('click', function() {
		if($(this).is(':checked')) {
			$('.' + $(this).val()).show();
		} else {
			$('.' + $(this).val()).hide()
		}
	});
	
	$('.flight_list td').on('mouseover mouseleave', function (e) {
		$(this).parent().toggleClass('hover', e.type == 'mouseover');
		$('.flight_list col').eq($(this).index()).toggleClass('hover', e.type == 'mouseover');
		$('.tablo_head_row th').eq($(this).index()).toggleClass('hover', e.type == 'mouseover');
	});
	
	function fixTabloHead() {
		var x = 0 - $(window).scrollLeft();
		
		if($(window).scrollTop() > tabloOffsetTop && !$tabloHead.hasClass("fixed")) {
			$tabloHead.addClass("fixed");
		} else if($(window).scrollTop() <= tabloOffsetTop && $tabloHead.hasClass("fixed")) {
			$tabloHead.removeClass("fixed").css({left: 0});
		}
		
		if($tabloHead.hasClass('fixed')) {
			$tabloHead.css({
				left: x + tabloOffsetLeft
			});
		}
	}
});
