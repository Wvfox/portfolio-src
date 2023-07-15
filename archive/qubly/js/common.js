new WOW().init()

/* menu for mobile */

$('.hamburger').click(function () {
	$(this).toggleClass('active')

	if ($(this).hasClass('active')) {
		$('.menu_top').slideDown(300)
	} else {
		$('.menu_top').slideUp(300)
	}
})

/* menu for mobile  */

/* review tabs */

$('.comment_list > li').click(function () {
	const revID = $(this).data('revid')

	$('.comment_list > li').not(this).removeClass('active')
	$(this).addClass('active')

	$('.rev_item').not(revID).removeClass('active')
	$(revID).addClass('active')
})

/* review tabs */
