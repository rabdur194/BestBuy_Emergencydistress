FT.manifest({
    "filename": "index.html",
    "width": 320,
    "height": 50,
    "clickTagCount": 7,
    "richLoads": [
        { "name": "Richload", "src": "BestBuy_2024_ContinuityRL_320x50" }
    ],
    "instantAds":[
        { "name": "Richload",            	"type": "richLoad", "default": "BestBuy_2024_ContinuityRL_320x50" },
		{ "name": "IntroHeadline1", 	 	"type": "text",  	"default": "<style>#CI_Frame2Copy { font-size: 16px; }</style>Need a new <span style='color:#fff800;'>appliance?</span></span>" },
		{ "name": "IntroHeadline2", 	 	"type": "text",  	"default": "" },
		{ "name": "Frame_4_Headline", 		"type": "image",  	"default": "blank.png" },
		{ "name": "Icon1", 	 	        	"type": "image", 	"default": "Icon1_320x50.png" },
		{ "name": "FeedEndpoint", 	 		"type": "text",  	"default": "https://fdz.flashtalking.com/services/bestbuy/FBI-2381/digitalinsert.php?c=home_theater_continuity" },
	    { "name": "Default_FeedEndpoint", 	"type": "text",  	"default": "https://cdn.flashtalking.com/feeds/bestbuy/digitalinsert/home_theater_continuity.json" },
	    { "name": "Use_Feed", 				"type": "text",  	"default": "YES" },
	    { "name": "Legal_Text", 	  		"type": "text", 	"default": "©2021 Best Buy" },
		{ "name": "Product1_Image", 	 	"type": "image", 	"default": "images/blank.png" },
		{ "name": "Product1_URL", 	 		"type": "text", 	"default": "" },
		{ "name": "Product2_Image", 	 	"type": "image", 	"default": "images/blank.png" },
		{ "name": "Product2_URL", 	 		"type": "text",  	"default": "" },
		{ "name": "Product3_Image", 	 	"type": "image", 	"default": "images/blank.png" },
		{ "name": "Product3_URL", 	 		"type": "text",  	"default": "" },
	    { "name": "default_fallback_image",	"type": "image",	"default": "images/320x50_default_newBranding.png" }
	],
	"trackingEvents":[
		{ "name":"prev_arrow_clicked",	"type":"string" },
		{ "name":"next_arrow_clicked",	"type":"string" },
		{ "name":"fallback_img",		"type":"string" }
	]
});