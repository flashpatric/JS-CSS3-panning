$(document).ready(function() {
	var sections = [],
		s = $('section'), ss, counter = 0,
		i, j, k, l, sub,  id, top, left;

	for (k = 0; k < s.length; k++) {
		ss = $(s[k]).children('section');
		if(ss.length > 0) {
			section = [];
			if (counter > 0) {
				left = (-1 * (counter * 100)) + "%";
			} else {
				left = counter;
			}

			for (l = 0; l < ss.length; l++) {
				if (l > 0) {
					top = (-1 * (l * 100))+"%";
				} else {
					top = l;
				}
				id = (counter+1)+'_'+(l+1);
				if (l+1 < ss.length) {
					$('#commands').append('<span class="data" data-id="#sl_'+id+'" data-top="'+top+'" data-left="'+left+'" title="sl_'+id+'">'+id+'</span> | ');
				} else {
					$('#commands').append('<span class="data" data-id="#sl_'+id+'" data-top="'+top+'" data-left="'+left+'" title="sl_'+id+'">'+id+'</span>');
				}
				
				// temporary controls
				$('#slideshow').prepend('<span class="command" id="sl_'+id+'">&nbsp;</span>');
				
				var sectionData = {'id':id, 'top':top, 'left':left};
				section.push(sectionData);
				sections.push(section);
			}
			// temporary controls divider
			$('#commands').append('<br>');

			counter++;
		}
	}
	
	$('.data').click(function() {
		var cssObj = {'top': $(this).data('top'),'left':$(this).data('left')};
		if (Modernizr.csstransitions) {
			$('.container .slider').css(cssObj);
			console.log('transition');
		} else {
			$('.container .slider').animate(cssObj);
			console.log('animate');
		}
	});


	var startTouch;
	var originalPosition = (parseInt($('.container .slider').css('left'),10) / 100) * 1024;
	var startX, pointX, deltaX, newX, directionX;
	var initiated = false;
	var obj = document.getElementById('slider');

	obj.addEventListener('touchstart', function(event) {
		console.log('originalPosition: '+parseInt($('.container .slider').css('left'),10));
		initiated = true;
		console.log('start swipe');
		startTouch = event.touches[0];
		startX = pointX = startTouch.pageX;
		deltaX = 0;
	});

	obj.addEventListener('touchmove', function(event) {
		if (!initiated) return;

		event.preventDefault();
		var touch = event.touches[0];

		deltaX = touch.pageX - pointX;
		newX = originalPosition + deltaX;
		directionX = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;

		obj.style.left = (newX * -directionX)+'px';
	}, false);

	obj.addEventListener('touchend', function(event) {
		if (!initiated) return;
		initiated = false;
		console.log('touchend');
		obj.style.left = "";

		console.log(directionX, Math.abs(deltaX));

		if (directionX == 1 && Math.abs(deltaX) > 50) {
			$('.container .slider').css("left","+100%");
		} else if (directionX == -1 && Math.abs(delta) > 50) {
			$('.container .slider').css("left","-100%");
		}
		originalPosition = (parseInt($('.container .slider').css('left'),10) / 100) * 1024
	});
});