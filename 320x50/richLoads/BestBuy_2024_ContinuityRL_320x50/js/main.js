var adWidth,adHeight;
window.onload = function () {
	adWidth=myFT.manifestProperties.width;
    adHeight=myFT.manifestProperties.height;
	Banner.init();
};

var Banner = {
	/* Build dynamic elements using IA vars */
	init: function () {
		myFT.addEventListener("instantads", function () {
			Banner.height = myFT.manifestProperties.height;
			Banner.width = myFT.manifestProperties.width;
			Banner.useFeed = myFT.instantAds.Use_Feed.trim().toLowerCase() == "yes";

			/* Build global elements */
			legal.innerHTML = myFT.instantAds.Legal_Text;
			Images.add("images/BB_Logo_320x50.png", logo);
			Images.add("images/arrow_next.png", arrow_next);
			Images.add("images/arrow_prev.png", arrow_prev);

			/* Add carousel event handlers */
			Banner.carouselPlayer = null;
			arrow_prev.addEventListener("click", Banner.invokeArrowClick);
			arrow_next.addEventListener("click", Banner.invokeArrowClick);

			/* Build intro elements */
			CI_Frame2Copy.innerHTML = myFT.instantAds.IntroHeadline1;
			CI_Frame3Copy.innerHTML = myFT.instantAds.IntroHeadline2;
			introFrame.addEventListener("click", Banner.invokeClickTag7);
			Images.add("images/image_320x50_logo_CircleR_v03.svg", intro_logo);
			Images.add(myFT.instantAds.Icon1, intro_icon1);

			var feedParams, ftFeed;
			feedParams = new FTFeedParams();
			feedParams.segmentId = "";
			feedParams.defaultFeedEndpoint = myFT.instantAds.Default_FeedEndpoint;
			feedParams.feedEndpoint = myFT.instantAds.FeedEndpoint;
			ftFeed = new FTFeed(myFT, feedParams);
			ftFeed.getFeed(Feed.success, Feed.error);

			Banner.checkLoaders();
		});
	},

	/* Check if feed and images are loaded, should run on IA load */
	checkLoaders: function () {
		var checkTimer = setInterval(function () {
			if (Feed.hasLoaded && Images.ready()) {
				clearInterval(checkTimer);
				Banner.ready();
			}
		}, 500);
	},

	/* Ad is ready, make it visible and run animations */
	ready: function () {
		var mainTL = new TimelineMax();

		mainTL.set(container, {
			opacity: 1,
			onComplete: function () {
				var productDescriptions = document.querySelectorAll(".product .product-desc");
				for (var i = 0; i < productDescriptions.length; i++) {
					Banner.reduceFontSize(productDescriptions[i]);
					Banner.addEllipsis(productDescriptions[i]);
				}
			}
		});
		if (!Feed.hasError) {
			mainTL.add(Banner.playIntro());
			if (Feed.items.length > 1) {
				mainTL.from(arrow_prev, 0.35, { x: -Banner.width, ease: Strong.easeInOut, delay: 0.1 });
				mainTL.from(arrow_next, 0.35, { x: Banner.width, ease: Strong.easeInOut, delay: 0.1 }, "<");
			}
			mainTL.add(Banner.playCarousel, ">");
		}
	},

	/* Play intro animation */
	playIntro: function () {
		var introTL = new TimelineMax();
		var hasFrame3 = myFT.instantAds.IntroHeadline2 != "" || myFT.instantAds.Icon1.match(/blank.(png|gif)$/) == null;

		introTL.set([CI_Frame2Copy, intro_icon1], {x: adWidth})
		introTL.set(introFrame, { opacity: 1, display: "block" });
		introTL.from(intro_logo, 0.3, {  opacity: 0 });
		// return
		introTL.to(intro_logo, 0.5,{delay: 2, opacity:0}, "-=0.5") 
			.set(intro_logo, {scale: .74, x: -121, z: .01});
		introTL.addLabel("frame2");
		if (hasFrame3) {
			introTL.to(intro_logo, .5, {opacity: 1}, 'frame2')
			
			introTL.to(intro_logo, .5, {opacity: 1}, 'frame2');
			introTL.to(CI_Frame2Copy, 1, {x: 25, opacity: 1, ease: Linear.easeNone}, "frame2")
				.to(CI_Frame2Copy, 1.7, {x: -20, ease: Linear.easeNone, delay: -.1})
				.to(CI_Frame2Copy, 1, {opacity: 0, x: -adWidth});
// return;	
			introTL.to(f2bg, 1, {opacity: 1}, 'frame2')
		}
		// return;

		introTL.to(intro_icon1, 0.5, { x: -110,rotation: 0.01, ease: Linear.easeNone }, "-=0.8");
// return
		introTL.to(intro_icon1, 3, { transform: "translate3d(-145px, 2px, 1px)", rotation: 0.01, ease: Linear.easeNone })
		 	.to(intro_icon1, 1, {opacity: 0, x: -adWidth});
		introTL.addLabel("endFrame", "=-.5");

		introTL.to(introFrame, 0.5, { opacity: 0 }, "endFrame");
		introTL.to(introFrame, 0, { display: "none" });
		return introTL;
	},

	/* Play carousel animation */
	playCarousel: function () {
		Banner.carouselPlayer = new TimelineMax();
		var items = carousel_items.children;
		for (var i = 0; i < items.length; i++) {
			Banner.carouselPlayer.to(items[i], 0, {
				delay: 2.8,
				onComplete: function () {
					if (Banner.carouselPlayer) Banner.moveCarousel(">");
				}
			});
		}
	},

	/**
	 * Move carousel to a specified direction
	 * @param {forward|backward|=|-|>|<} direction
	 */
	moveCarousel: function (direction) {
		var forward = direction.match(/^(backwards?|\-|\<)$/i) ? false : true;
		var current = carousel_items.querySelector(".active");
		var next =
			current[(forward ? "next" : "previous") + "ElementSibling"] ||
			carousel_items[(forward ? "first" : "last") + "ElementChild"];

		if (current && next && next != current) {
			TweenMax.fromTo(
				current,
				0.35,
				{ x: 0 },
				{
					x: forward ? -Banner.width : Banner.width,
					ease: Sine.easeOut,
					rotation: 0.01,
					force3D: true,
					ease: Sine.easeOut
				}
			);
			TweenMax.fromTo(
				next,
				0.35,
				{ x: forward ? Banner.width : -Banner.width },
				{
					x: 0,
					ease: Sine.easeOut,
					rotation: 0.01,
					force3D: true,
					onComplete: function () {
						current.classList.remove("active");
						next.classList.add("active");
					}
				}
			);
		}
	},

	invokeArrowClick: function (e) {
		if (e) e.stopPropagation();
		var next = e.target.id == "arrow_next" ? true : false;
		if (Banner.carouselPlayer) {
			Banner.carouselPlayer.pause();
			Banner.carouselPlayer = null;
		}

		Banner.moveCarousel(next ? ">" : "<");
		var eventName = (next ? "next" : "prev") + "_arrow_clicked";
		myFT.tracker(eventName, null, eventName);
	},

	invokeProductClick: function (e) {
		if (e) e.stopPropagation();
		var product = carousel_items.querySelector(".active");
		if (product) {
			var id = Number(product.getAttribute("data-id"));
			var url = product.getAttribute("data-url");
			var trackStr = Feed.items[id-1].powerfeeds_id;
			Tracker.clickTrackEvent(trackStr, 'ft_section', false);
			myFT.clickTag(id, url);
		}
	},

	invokeClickTag6: function (e) {
		if (e) e.stopPropagation();
		myFT.clickTag(6);
	},

	invokeClickTag7: function (e) {
		if (e) e.stopPropagation();
		myFT.clickTag(1, myFT.instantAds.Product1_URL);
	},

	reduceFontSize: function (e, maxHeight) {
		e = typeof e === "string" ? document.querySelector(e) : e;
		maxHeight = maxHeight || parseFloat(getComputedStyle(e)["max-height"]);
		while (e.scrollHeight > maxHeight) {
			var fontSize = parseFloat(getComputedStyle(e)["font-size"]);
			if (fontSize <= 6) break;
			e.style.fontSize = fontSize - 0.5 + "px";
			e.classList.add("--reduced-font-size");
		}
	},

	addEllipsis: function (e, maxHeight) {
		e = typeof e === "string" ? document.querySelector(e) : e;
		maxHeight = maxHeight || parseFloat(getComputedStyle(e)["max-height"]);
		shave(e, maxHeight);
	}
};

var Feed = {
	hasLoaded: false,
	hasError: false,

	/* Runs if feed has loaded or failed */
	done: function () {
		Feed.hasLoaded = true;
		Images.preload();
	},

	/* Runs if feed loads successfully */
	success: function (items, url) {
		Feed.url = url;
		Feed.items = items;

		if (items.length === 1) TweenMax.set("#arrow_prev, #arrow_next", { display: "none" });
		if (items.length === 0) {
			// Throw error if feed items is empty
			Feed.error("Feed error. Feed returned an empty array.");
			return;
		}
		var skuString="";

		var productCount = (Feed.items.length > 5)? 5 : Feed.items.length; //updated here 01.02.24
		for (var i = 0; i < productCount; i++) { 
			var id = i + 1;
			var productHTML =
				'<div id="product_{{id}}" class="product" data-id="{{id}}" data-url="{{url}}">' +
				'<div class="product-image"></div>' +
				'<div class="product-info">' +
				'<div class="product-price">{{price}}</div>' +
				'<div class="product-desc">{{desc}}</div>' +
				"</div></div>";

			var productImage = items[i].powerfeeds_image + "&w=120&h=120";
			var productPrice = '{{USD}}<span style="color: #000;">' + items[i].saleprice + "</span>";
			if (!isNaN(items[i].percentsavings) && Number(items[i].percentsavings) > 15) {
				productPrice = 'Save {{USD}}<span style="color: #000;">' + items[i].dollarsavings + "</span>";
			}
			skuString += items[i].powerfeeds_id+"||";

			productHTML = productHTML.mustache({
				id: id,
				desc: items[i].name,
				image: productImage,
				price: productPrice.mustache({ USD: '<span class="dollar-sign">$</span>' }),
				url: Banner.useFeed ? items[i].url : myFT.instantAds["Product1_URL"]
			});

			carousel_items.insertAdjacentHTML("beforeend", productHTML);
			Images.add(productImage, "#product_" + id + " .product-image");

			if (i == 0) document.querySelector("#product_" + id).classList.add("active");
			if (i > 0) TweenMax.set("#product_" + id, { x: "-100%" });
		}
		skuString = skuString.slice(0,skuString.length-2);
        Tracker.impressionTrackEvent(skuString);

		container.addEventListener("click", Banner.invokeProductClick);
		Feed.done();
	},

	/* Runs if feed fails to load */
	error: function (error) {
		TweenMax.set("#introFrame, #carousel, #logo, #legal", { display: "none" });
		container.insertAdjacentHTML("beforeend", '<img id="defaultImg"/>');
		container.addEventListener("click", Banner.invokeClickTag7);
		Images.add(myFT.instantAds.default_fallback_image, "#defaultImg");
		myFT.tracker('fallback_img', null, "fallback_img");

		console.error(error);
		Feed.hasError = true;
		Feed.done();
	}
};

/**
 * Handles image preloading
 */
var Images = {
	queue: [],
	add: function (url, node) {
		if (!url) return;
		Images.queue.push({ url: url, node: node });
	},
	preload: function () {
		Images.queue.forEach(function (image) {
			var url = image.url;
			var node = typeof image.node === "string" ? document.querySelector(image.node) : image.node;

			var o = new Image();
			o.src = url;
			o.addEventListener("load", function () {
				image.loaded = true;
				if (node.tagName.toLowerCase() === "img") {
					node.src = url;
				} else {
					node.style.backgroundImage = "url('" + url + "')";
				}
			});
		});
	},
	ready: function () {
		for (var i = 0; i < Images.queue.length; i++) {
			if (!Images.queue[i].loaded) return false;
		}
		return true;
	}
};

/**
 * Simple mustache template processing
 * @param {Object} data
 * @returns {String}
 */
String.prototype.mustache = function (data) {
	var rendered = "" + this;
	for (var key in data) {
		rendered = rendered.replace(new RegExp("{{" + key.trim() + "}}", "gm"), data[key]);
	}
	return rendered;
};
