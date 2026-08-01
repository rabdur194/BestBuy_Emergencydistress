var adWidth,adHeight, arrowClicked = false;
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
			Banner.hasFrame4 = null;

			/* Build global elements */
			legal.innerHTML = myFT.instantAds.Legal_Text;
			Images.add(myFT.instantAds.Frame_4_Headline, f4_headline);
			Images.add("images/arrow_next.png", arrow_next);
			Images.add("images/arrow_prev.png", arrow_prev);
			Images.add("images/FY2024_withoutGlowBG_728x90.png", logo);
			
			
			if (Banner.hasFrame4) {
				TweenMax.set(carousel, { width: "+=70" });
				TweenMax.set(arrow_next, { right: "+=70" });
			}
			
			/* Add carousel event handlers */
			Banner.carouselPlayer = null;
			arrow_prev.addEventListener("click", Banner.invokeArrowClick);
			arrow_next.addEventListener("click", Banner.invokeArrowClick);
			
			/* Build intro elements */
			CI_Frame2Copy.innerHTML = myFT.instantAds.IntroHeadline1;
			CI_Frame3Copy.innerHTML = myFT.instantAds.IntroHeadline2;
			introFrame.addEventListener("click", Banner.invokeClickTag7);
			Images.add(myFT.instantAds.Icon1, intro_icon1);
			Images.add("images/image_728x90_logo_CircleR_v03.svg", intro_logo);


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

		mainTL.set([legal, f4_headline], { opacity: 0 });
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
		introTL.to(intro_logo, 0.5, {delay: 2, opacity:0}, "-=0.5") 
			.set(intro_logo, {scale: .6, x: -300,y:-3, z: .01});

		introTL.addLabel("frame2");
		if (hasFrame3) {
			introTL.to([intro_logo, f2bg], .5, {opacity: 1}, 'frame2')
			introTL.to(CI_Frame2Copy, 1, {x: -7, opacity: 1, ease: Linear.easeNone}, "frame2")
				.to(CI_Frame2Copy, 1.7, {x: -27, ease: Linear.easeNone, delay: -.1})
				.to(CI_Frame2Copy, 1, {opacity: 0, x: -adWidth});

			introTL.addLabel("frame3");
			
		}
		introTL.to(intro_icon1, 1, {x: -160 , ease: Linear.easeNone}, "-=1.2");
		introTL.to(intro_icon1, 1.7, {x:-220, rotation: 0.01, ease: "none" })
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
		for (var i = 0; i < items.length - 1; i++) {
			Banner.carouselPlayer.to(items[i], 0, {
				delay: 2.8,
				onComplete: function () {
					if (Banner.carouselPlayer) Banner.moveCarousel(">");
				}
			});
		}
		Banner.carouselPlayer.add(function () {
			Banner.playEndFrame();
		}, "+=2.8");
	},

	playEndFrame: function () {
		if(arrowClicked) {
			return;
		}
		var endFrameTL = new TimelineMax();

		endFrameTL.to([carousel_items, ".product-info, .product-cta"], 0.35, {
			opacity: 0,
			onComplete: function () {
				Banner.moveCarousel(">", 0);
				endFrameTL.set(".product.active", { x: 103 }, "fadein");
				endFrameTL.set(".product.active .product-image", { marginRight: 13 }, "fadein");
				endFrameTL.set(".product.active .product-info", { display: "none" }, "fadein");
				endFrameTL.set(".product.active .product-cta", { opacity: 1 }, "fadein");
			}
		});
		endFrameTL.add("fadein", ">");
		endFrameTL.to(carousel_items, 0.5, { opacity: 1, }, "fadein");
		endFrameTL.set("#product_1 .product-cta", {x:152, y: 19, scale: 0.85 },"fadein");  
		endFrameTL.to(legal, 0.35, { opacity: 1 }, "fadein");
		endFrameTL.to(arrow_prev, 0.35, { x: 98}, "fadein");
		endFrameTL.to(arrow_next, 0.35, { x: -258}, "fadein");
		endFrameTL.add(function () {
			var currItem = carousel_items.querySelector(".product.active");
			var nextItem = currItem.nextElementSibling;
			var lastItem = carousel_items.lastElementChild;
			endFrameTL.addLabel("shrink", ">");
			if (nextItem) {
				endFrameTL.to(nextItem, 0, { opacity: Banner.hasFrame4 ? 0 : 0.7 }, "shrink");
				endFrameTL.to(nextItem.querySelector(".product-image"), 0, { scale: 0.5 }, "shrink");
				endFrameTL.fromTo(nextItem, { x: "100%" }, { duration: 0.35, x: 240 }, "shrink+=0.35");
			}
			if (lastItem && lastItem !== nextItem && lastItem !== currItem) {
				endFrameTL.to(lastItem, 0, { opacity: 0.7 }, "shrink");
				endFrameTL.to(lastItem.querySelector(".product-image"), 0, { scale: 0.5 }, "shrink");
				endFrameTL.fromTo(lastItem, { x: "-100%" }, { duration: 0.35, x: -37 }, "shrink+=0.35");
			}
			endFrameTL.to([f4_headline], 0.5, { opacity: 1 });
		});

		return endFrameTL;
	},

	buildManualCarousel: function () {
		// container.style.backgroundColor = "#001e73";
		legal.classList.add("manual");
		carousel.classList.add("manual");
		arrow_next.style.display = "none";
		arrow_prev.style.display = "none";

		var productHTML =
			'<div id="product_{{id}}" class="product ad-size absolute" data-id="{{id}}" data-url="{{url}}">' +
			'<div class="product-image absolute ad-size"></div><div class="product-cta absolute">Shop Now</div>' +
			"</div></div>";

		for (var i = 1; i <= 3; i++) {
			var productImage = myFT.instantAds["Product" + i + "_Image"];
			var productURL = myFT.instantAds["Product" + i + "_URL"];
			carousel_items.insertAdjacentHTML(
				"beforeend",
				productHTML.mustache({
					id: i,
					url: productURL
				})
			);

			Images.add(productImage, "#product_" + i + " .product-image");
			if (i == 1) document.querySelector("#product_" + i).classList.add("active");
			if (i > 1) TweenMax.set("#product_" + i, { x: "-100%" });
		}

		container.addEventListener("click", Banner.invokeProductClick);
	},

	/**
	 * Move carousel to a specified direction
	 * @param {forward|backward|=|-|>|<} direction
	 * @param {Number} speed
	 */
	moveCarousel: function (direction, speed) {
		var forward = direction.match(/^(backwards?|\-|\<)$/i) ? false : true;
		var current = carousel_items.querySelector(".active");
		var next =
			current[(forward ? "next" : "previous") + "ElementSibling"] ||
			carousel_items[(forward ? "first" : "last") + "ElementChild"];

		speed = isNaN(speed) || Number(speed) < 0 ? 0.35 : speed;
		if (current && next && next != current) {
			TweenMax.fromTo(
				current,
				{ x: 0 },
				{
					duration: speed,
					x: forward ? -Banner.width : Banner.width,
					ease: Sine.easeOut,
					rotation: 0.01,
					force3D: true,
					ease: Sine.easeOut
				}
			);
			TweenMax.fromTo(
				next,
				{ x: forward ? Banner.width : -Banner.width },
				{
					x: 0,
					duration: speed,
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
		arrowClicked = true;
		if (e) e.stopPropagation();
		var next = e.target.id == "arrow_next" ? true : false;
		if (Banner.carouselPlayer) {
			//if (Banner.carouselPlayer.progress() !== 1) return;
			Banner.carouselPlayer = null;
			TweenMax.to("#product_1 .product-cta", 0.35, { x:0,y: 0 });   
			TweenMax.to([f4_headline], 0.35, { opacity: 0 });
			var currItem = carousel_items.querySelector(".product.active");
			document.getElementsByClassName('product')[0];
			var nextItem = next ? currItem.nextElementSibling : carousel_items.lastElementChild;
			if(!nextItem) {
				nextItem = document.getElementsByClassName('product')[0];
			}
			if(next) {
				TweenMax.to(currItem, 0.25, { x: -adWidth, opacity: 0 });
				TweenMax.set(nextItem, {x: adWidth});
			}
			var lastItem = next ? carousel_items.lastElementChild : currItem.nextElementSibling;
			if (currItem !== nextItem) {
				TweenMax.set(nextItem.querySelector(".product-cta"), { opacity: 2 });
				TweenMax.to(nextItem, 0.25, { x: 0, opacity: 1 });
				TweenMax.to(
					nextItem.querySelector(".product-image"),
					0.25,
					{
						scale: 1,
						onComplete: function () {
							currItem.classList.remove("active");
							nextItem.classList.add("active");
						}
					},
					"<"
				);
				TweenMax.to(currItem, 0.25, { opacity: 0 }, "<");
				if (lastItem && lastItem != currItem && lastItem != nextItem) {
					TweenMax.to(lastItem, 0.25, { x: next ? "-100%" : "100%" }, "<");
				}
				TweenMax.set(nextItem.querySelector(".product-image"), { marginRight: 0 });
				TweenMax.to(arrow_prev, 0.25, { x: 0 });
				TweenMax.to(arrow_next, 0.25, { x: 0 }, "<");
				TweenMax.to(nextItem.querySelector(".product-info"), 0.35, {
					opacity: 1,
					delay: 0.5,
					onComplete: function () {
						TweenMax.set(currItem, { x: next ? "-100%" : "100%" });
						TweenMax.set(".product, .product-image", { scale: 1, opacity: 1 });
						TweenMax.set(".product-info, .product-cta", { opacity: 1, display: "block" });
					}
				});
			}
		} else {
			Banner.moveCarousel(next ? ">" : "<");
		}

		var eventName = (next ? "right" : "left") + "_arrow_clicked";
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
		myFT.clickTag(1,myFT.instantAds.Product1_URL);

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
		// Feed.items = items.slice(0, 3);

		if (Feed.items.length === 1) TweenMax.set("#arrow_prev, #arrow_next", { display: "none" });
		if (Feed.items.length === 0) {
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
				'</div><div class="product-cta">Shop Now</div></div>';

			var productImage = items[i].powerfeeds_image + "&w=120&h=120";
			var productPrice = '{{USD}}<span style="color: #000;">' + items[i].saleprice + "</span>";
			if (!isNaN(items[i].percentsavings) && Number(items[i].percentsavings) > 15) {
				dollarSign  = '<span style="padding-right:1px;color: #000;">$</span>';
				dollarSpSign  = '<span style="padding-right:1px;color: #000;">$</span>';
				productPrice = 'Save {{USD}}<span style="color: #000;">' + items[i].dollarsavings +' '+'<span style="font-size: 14px;color: #000;">' + dollarSpSign + items[i].saleprice + '</span>'+ "</span>";
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
