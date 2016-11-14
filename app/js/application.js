(function($){

	'use strict'

		var width_window,
			width_window = $(document).width()

	// Navbar fixo ao rolar a tela
		// $(window).resize(function(){
		// 	width_window = $(document).width()
		// })

		// $(window).scroll(function(){
		// 	var $nav 	= $('.nav-primary').offset(),
		// 		topNav 	= 183

		// 	if ($(this).scrollTop() >= topNav) {
		// 		$('.shadow-nav-primary').removeClass('hide')
		// 		$('.nav-primary').addClass('fixed')
		// 	} else {
		// 		$('.shadow-nav-primary').addClass('hide')
		// 		$('.nav-primary').removeClass('fixed')
		// 	}
		// })
	// end: Navbar fixo ao rolar a tela

	if (window.location.pathname == "/index.html" || window.location.pathname == "" || window.location.pathname == "/") {
		setTimeout(function(){
			$('#loading').hide()
		},1000)
	}

	$(window).load(function(){
		if (window.location.pathname == "/index.html" || window.location.pathname == "" || window.location.pathname == "/") {
			$('#loading').remove()
		}

		// bindTabInformations()

		// var winH = $(window).scrollTop(),
		// 	disH = $(window).height() + 50,
		// 	$btnCall = $('#btn-call')

		// if (winH > disH) {
		//     $btnCall.addClass('available')
		// } else {
		//     $btnCall.removeClass('available')
		// }
	})

	$(function(){
		$('#menu-button').on('click',function(e){
			e.preventDefault()

			$(this).toggleClass('checked')
			$('.nav-mobile').toggleClass('is-active')
			if( $(this).hasClass('checked') ){
				$('body, html').toggleClass('no-scrolling')
			} else {
				$('body, html').toggleClass('no-scrolling')
			}
		})

		$('.nav-mobile .btn-treatments').on('click',function(e){
			e.preventDefault()

			$(this).parent('.item-treatments').find('.nav-submenu').toggleClass('open')
		})

		
	})

})(jQuery)