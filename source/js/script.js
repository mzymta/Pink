document.addEventListener('DOMContentLoaded', function(){

	var hamburger = document.querySelector(".main-nav__toggle");
	var reviewsPagination = document.querySelectorAll(".reviews-slider__pagination > li");
	var pricingPagination = document.querySelectorAll(".pricing__pagination > li");
	var arrows = document.querySelectorAll(".reviews-slider__arrow");
	var slides = document.querySelectorAll(".reviews-slider__item");
	var menuLinks = document.querySelectorAll(".main-nav__link");



	hamburger.addEventListener("tap", function(event) {
		event.preventDefault();
		openMenu();
	});


	for(var i = 0; i < reviewsPagination.length; i++ ) {
		reviewsPagination[i].addEventListener("tap", pageSlide.bind(null, reviewsPagination[i]));
	};

	for(var i = 0; i < arrows.length; i++ ) {
		arrows[i].addEventListener("tap", function(){
			arrowSlide(this);
		});

	};

	for(var i = 0; i < pricingPagination.length; i++ ) {
		pricingPagination[i].addEventListener("tap", pagePrice.bind(null, pricingPagination[i]));
	};

	for(var i = 0; i < menuLinks.length; i++ ) {
		menuLinks[i].addEventListener("tap", function(event) {
				event.preventDefault();
				scrollToAnchor(this);
		});
	};

	function scrollToAnchor(link) {
		var element = document.querySelector(link.getAttribute("href"));
		console.log(element);
		smoothScroll(element, 500);
	}

	function pagePrice(page) {
		var clsArray = ["pricing-table--left", "pricing-table--center", "pricing-table--right"];
		var table = document.querySelector(".pricing-table");

		for (var i = 0; i < clsArray.length; i++) {
			if( i === getIndex(page)) {
				table.classList.add(clsArray[i]);
				continue;
			}

			table.classList.remove(clsArray[i]);
		}

		activatePage(getIndex(page), "pricing__pagination-active");
	}


	function pageSlide(page) {
		console.log(page);
		var index = Array.prototype.indexOf.call(page.parentNode.children, page);

		activateSlide(index);
		activatePage(index, "reviews-slider__pagination-active");
	}

	function arrowSlide(arrow) {
		var activeSlide = document.querySelector(".reviews-slider__item--active");
		var direction = !!(arrow.classList.contains("reviews-slider__arrow--right")) ? "right" : "left";

		switch(direction) {
			case "right":
				var nextSlide = !!(activeSlide.nextElementSibling) ? activeSlide.nextElementSibling : slides[0];
				break;
			case "left":
				var nextSlide = !!(activeSlide.previousElementSibling) ? activeSlide.previousElementSibling : slides[slides.length - 1];
				break;
		}

		activateSlide(getIndex(nextSlide));
		activatePage(getIndex(nextSlide), "reviews-slider__pagination-active");
	}

	function activateSlide(index) {
		console.log(index);
		var activeSlide = document.querySelector(".reviews-slider__item--active");

		activeSlide.classList.remove("reviews-slider__item--active");
		slides[index].classList.add("reviews-slider__item--active");

	}

	function activatePage(index, cls) {
		var activePage = document.querySelector("."+cls);

		activePage.classList.remove(cls);
		(activePage.parentNode.children)[index].classList.add(cls);
	}

	function getIndex(element) {
		return Array.prototype.indexOf.call(element.parentNode.children, element);
	}

	function openMenu() {
		var navList = hamburger.parentNode.querySelector(".main-nav__list");
		var headerTop = document.querySelector(".page-header__top");

		hamburger.classList.toggle("main-nav__toggle--close");
		navList.classList.toggle("main-nav__list--open");
		headerTop.classList.toggle("page-header__top--open");
	}

	function findSiblings(origin, className) {
			return Array.prototype.filter.call(origin.parentNode.children, function(element) {
				if(className) {
					return (element !== origin) && element.classList.contains(className);
				}
				return element !== origin;
			});
	}

	function smoothScroll(target, time) {
    // time when scroll starts
    var start = new Date().getTime(),

        // set an interval to update scrollTop attribute every 25 ms
        timer = setInterval(function() {

            // calculate the step, i.e the degree of completion of the smooth scroll
            var step = Math.min(1, (new Date().getTime() - start) / time);

            // calculate the scroll distance and update the scrollTop
            document.body['scrollTop'] = (step * target.offsetTop);

            // end interval if the scroll is completed
            if (step == 1) clearInterval(timer);
        }, 25);
		}



});
