/**
 * App BANCO NEON
 */
(function() {

	'use strict'

	var el_loading  = document.getElementById('loading'),
		el_tit_1    = document.getElementsByClassName('tit')[0],
		el_tit_2    = document.getElementsByClassName('tit')[1],
		_w_height 	= window.innerHeight,
		el_btn      = document.getElementById('btn-more')

	window.onload = function()
	{
		removeLoading(el_loading)

		setTimeout(function () {
			anime()
		}, 1000)

		actions()
	}

	function actions()
	{
		el_btn.addEventListener('mouseover', function() {

			document.body.classList.add('-overlay')

		})

		el_btn.addEventListener('mouseout', function() {

			document.body.classList.remove('-overlay')

		})
	}

	function removeLoading(el)
	{
		setTimeout(function() {
			el.classList.add('-inactive')
		}, 1000)

		setTimeout(function() {
			el.remove()
		}, 1000)
	}

	function anime()
	{
		var title_1  = new SplitText(el_tit_1, {type: 'words,chars', position: 'relative'}),
			title_2  = new SplitText(el_tit_2, {type: 'words,chars', position: 'relative'})

		TweenMax.staggerFrom(title_1.chars, 1.5, {opacity: 0, y: -50, ease:Back.easeOut}, 0.05)
		TweenMax.staggerFrom(title_2.chars, 1.5, {delay: 1.5, opacity: 0, y: 50, ease:Back.easeOut}, 0.05)
	}

	window.onscroll = function()
	{
		onRevealItem()
	}

	function onRevealItem()
	{
		var tl           = new TimelineMax(),
			el_pic       = document.getElementById('pic'),
			el_pic       = document.getElementById('pic'),
			el_tit_item  = document.getElementById('tit_item'),
			el_text      = document.getElementById('text'),
			_aux_pic     = el_pic.getBoundingClientRect(),
			_aux_tit     = el_tit_item.getBoundingClientRect(),
			_aux_text    = el_text.getBoundingClientRect(),
			_aux_btn     = el_btn.getBoundingClientRect(),
			trigger_pic  = _aux_pic.top + 400,
			trigger_tit  = _aux_tit.top + 400,
			trigger_text = _aux_text.top + 500,
			trigger_btn  = _aux_btn.top + 600

			var dist_top = document.getElementById('carousel')
				dist_top = dist_top.offsetTop

		onRevealScroll(el_pic, trigger_pic, 'css')
		onRevealScroll(el_tit_item, trigger_tit, 'css')
		onRevealScroll(el_text, trigger_text, 'gs')
		onRevealScroll(el_btn, trigger_btn, 'css')
	}

	function onRevealScroll(el, trigger, type)
	{
		var _aux = window.scrollY + window.innerHeight

		if (_aux >= trigger) {

			if (el.classList.contains('-inactive'))
				el.classList.remove('-inactive')

			if (type == 'gs') {

				if (!el.classList.contains('-animated')) {

					var text = new SplitText(el, {type: 'words', position: 'relative'})

					TweenMax.staggerFrom(text.words, 1.5, {opacity: 0, y: 5, ease:Back.easeOut}, 0.2)

					el.classList.add('-animated')
				}
			}
		}
	}

})()