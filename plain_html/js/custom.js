AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});


document.addEventListener('touchstart', e => {
	;[...e.changedTouches].forEach(touch => {
		const dot = document.createElement('i')
		dot.classList.add('animate_dot')
		dot.style.top = `${touch.pageY}px`
		dot.style.left = `${touch.pageX}px`
		dot.id = touch.identifier
		document.body.append(dot)
	})
})

document.addEventListener('touchmove', e => {
	;[...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier)
		dot.style.top = `${touch.pageY}px`
		dot.style.left = `${touch.pageX}px`
	})
})

document.addEventListener('touchend', e => {
	;[...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier)
		dot.remove()
	})
})

document.addEventListener('touchcancel', e => {
	;[...e.changedTouches].forEach(touch => {
		const dot = document.getElementById(touch.identifier)
		dot.remove()
	})
})

$('body').on('click', '.nav_link', function (e) {
	var link = location.href;
	var href = $(this).attr('href')
	if (link.indexOf(href) >= 0) {
		const toast = document.querySelector(".toast_notify");
		const progress = document.querySelector(".toast_progress");

		let timer1, timer2;
		document.querySelector('.text-1').innerHTML = '系統通知'
		document.querySelector('.text-2').innerHTML = `你已在頁面 ${$(this).text()} 了`
		document.querySelector('.toast_icon').innerHTML = `<i class="fa-solid fa-bell check"></i>`
		/* document.querySelector('html').style.pointerEvents = 'none' */
		toast.classList.add("active");
		progress.classList.add("active");

		timer1 = setTimeout(() => {
			toast.classList.remove("active");
		}, 3000); //1s = 1000 milliseconds

		timer2 = setTimeout(() => {
			progress.classList.remove("active");
			/* document.querySelector('html').style.pointerEvents = 'all' */
		}, 3300);
	} else {
		window.location.replace(href);
		window.location.href = href;
	}
	e.preventDefault();

});
$('body').on('click', '.toast_close', function (e) {
	document.querySelector(".toast_notify").classList.remove("active");

	setTimeout(() => {
		document.querySelector(".toast_progress").classList.remove("active");
	}, 300);

	clearTimeout(timer1);
	clearTimeout(timer2);
});
$(document).ready(function () {
	let urlString = window.location.pathname;
	let paramString = urlString.split('/')[3];
	$(".data_json").each(function () {

		fetch('json/home.json')
			.then((response) => response.json())
			.then((json) => {
				data_json = $(this).attr("data-json");
				data_json_type = $(this).attr("data-json-type");

				/* if (paramString == 'index.html') { */
				if (json.chi[data_json] == null) {
					$(this).html('<span style="color:red;">${Wrong Data}</span>')
				} else if (data_json_type == 'text') {
					$(this).html(json.chi[data_json])
				} else if (data_json_type == 'css_bg') {
					$(this).css('background-image', 'url(https://image.yogurtstudio.tk/public/' + json.chi[data_json] + ')');
				}
				/* }else{ 
					if (json.eng[data_json] == null) {
						$(this).html('<span style="color:red;">${Wrong Data}</span>')
					} else if (data_json_type == 'text') {
						$(this).html(json.eng[data_json])
					} else if (data_json_type == 'css_bg') {
						$(this).css('background-image', 'url(' + json.eng[data_json] + ')');
					}
				 } */
			});
	});
});
/*--------------------------------------------------
   Back to Top
 ---------------------------------------------------*/

if ($('#back-to-top').length) {
	var scrollTrigger = 100, // px
		backToTop = function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
	backToTop();
	$(window).on('scroll', function () {
		backToTop();
	});
	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
}


var scrollElement = document.querySelector('#scroll');

window.addEventListener('scroll', function () {
	var height = document.body.scrollHeight - this.innerHeight;
	var scrolledPixels = this.scrollY;
	var width = ((scrolledPixels / height) * 100).toFixed(2);
	scrollElement.style.width = width + '%';
});




$(function () {

	'use strict';

	window.onscroll = function (e) {
		if (this.oldScroll > this.scrollY == false && $(window).scrollTop() <= 500) {//down
			$('.site-nav').addClass("sticky");
			$('.site-nav').removeClass("remove_sticky");
		}
		else if (this.oldScroll > this.scrollY == false && $(window).scrollTop() >= 501) {//down
			if ($(".site-nav").hasClass("sticky")) {
				$('.site-nav').addClass("remove_sticky");
				$('.site-nav').removeClass("sticky");
				setTimeout(function () {
					$('.site-nav').removeClass("remove_sticky");
				}, 500);
			}
		} else
			if (this.oldScroll > this.scrollY == true && $(window).scrollTop() >= 2) {//up
				$('.site-nav').addClass("sticky");
				$('.site-nav').removeClass("remove_sticky");
			}
		if ($(window).scrollTop() <= 1) {
			$('.site-nav').removeClass("sticky");
			$('.site-nav').addClass("remove_sticky");
			setTimeout(function () {
				$('.site-nav').removeClass("remove_sticky");
			}, 500);
		}

		this.oldScroll = this.scrollY;

	};



	$(".loader").delay(10).fadeOut("slow");
	$("#overlayer").delay(10).fadeOut("slow");

	var siteMenuClone = function () {

		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);
				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 500);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$(this).css("height", $(this).closest('.has-children').css('height'));
				$this.addClass('active');
			}
			e.preventDefault();

		});
		setTimeout(() => {
			$('.site-mobile-menu .has-children .arrow-collapse').each(function () {
				if ($(this).closest('.has-children').css('height') != '0px') {
					$(this).css("height", $(this).closest('.has-children').css('height'));

				}
			})
		}, 1500);


		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
					$('body').find('.js-menu-toggle').removeClass('active');
				}
			}
		});
	};
	siteMenuClone();

	var owlPlugin = function () {
		if ($('.owl-single').length > 0) {
			var owl = $('.owl-single').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				stopLoop: "on",
				stopAtSlide: -1,
				stopAfterLoops: -1,
				autoplay: false,
				smartSpeed: 1000,
				items: 1,
				nav: true,
				navText: ['']
			});

			owl.on('initialized.owl.carousel', function () {
				owl.trigger('refresh.owl.carousel');
			});

			/* $('.custom-owl-next').click(function (e) {
				e.preventDefault();
				owl.trigger('next.owl.carousel');
			})
			$('.custom-owl-prev').click(function (e) {
				e.preventDefault();
				owl.trigger('prev.owl.carousel');
			}) */
		}


		if ($('.owl-logos').length > 0) {
			var owl3 = $('.owl-logos').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 10,
				stopLoop: "on",
				stopAtSlide: -1,
				stopAfterLoops: -1,
				autoplay: true,
				smartSpeed: 700,
				items: 4,
				stagePadding: 0,
				nav: true,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 1
					},
					800: {
						items: 2
					},
					1000: {
						items: 3
					},
					1100: {
						items: 5
					}
				}
			});
		}

		if ($('.owl-3-slider').length > 0) {
			var owl3 = $('.owl-3-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 10,
				stopLoop: "on",
				stopAtSlide: -1,
				stopAfterLoops: -1,
				autoplay: true,
				smartSpeed: 700,
				items: 4,
				stagePadding: 0,
				nav: true,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>'],
				responsive: {
					0: {
						items: 1
					},
					600: {
						items: 1
					},
					800: {
						items: 2
					},
					1000: {
						items: 2
					},
					1100: {
						items: 3
					}
				}
			});
		}
		$('.js-custom-next-v2').click(function (e) {
			e.preventDefault();
			owl3.trigger('next.owl.carousel');
		})
		$('.js-custom-prev-v2').click(function (e) {
			e.preventDefault();
			owl3.trigger('prev.owl.carousel');
		})
	}
	owlPlugin();

	var portfolioMasonry = function () {
		$('.filters ul li').click(function () {
			$('.filters ul li').removeClass('active');
			$(this).addClass('active');

			var data = $(this).attr('data-filter');
			$grid.isotope({
				filter: data
			})
		});


		if (document.getElementById("portfolio-section")) {
			var $grid = $(".grid").isotope({
				itemSelector: ".all",
				percentPosition: true,
				masonry: {
					columnWidth: ".all"
				}
			})

			$grid.imagesLoaded().progress(function () {
				$grid.isotope('layout');
			});

		};


	};
	portfolioMasonry();

	$('.js-search-toggle').on('click', function () {
		$('.search-wrap').toggleClass('active');

		setTimeout(function () {
			$('#s').focus();
		}, 400);
	})

	$(document).mouseup(function (e) {
		var container = $(".search-wrap form");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ($('.search-wrap').hasClass('active')) {
				$('.search-wrap').removeClass('active');
			}
		}
	});

	var siteStellar = function () {
		$(window).stellar({
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	};
	siteStellar();

	var pricing = function () {
		$('.js-period-toggle').on('click', function (e) {
			var $this = $(this),
				pricingItem = $('.pricing-item');
			if ($('.period-toggle').hasClass('active')) {
				$this.removeClass('active');
				pricingItem.removeClass('yearly');
			} else {
				$this.addClass('active');
				pricingItem.addClass('yearly');
			}
			e.preventDefault();
		})
	}
	pricing();

})

