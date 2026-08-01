FT.manifest({
    "filename": "index.html",
    "width": 300,
    "height": 50,
    "clickTagCount": 7,
    "richLoads": [
        { "name": "Richload", "src": "BestBuy_2024_ContinuityRL_300x50" }
    ],
    "instantAds":[
        { "name": "Richload",            	"type": "richLoad", "default": "BestBuy_2024_ContinuityRL_300x50" },
		{ "name": "IntroHeadline1", 	 	"type": "text",  	"default": "<style>#CI_Frame2Copy { font-size: 14px; margin-top: 3px;}</style>Need a new <span style='color:#fff800;'>appliance?</span>" },
		{ "name": "IntroHeadline2", 	 	"type": "text",  	"default": "" },
		{ "name": "Frame_4_Headline", 		"type": "image",  	"default": "blank.png" },
		{ "name": "Icon1", 	 	        	"type": "image", 	"default": "Icon1_300x50.png" },
		{ "name": "FeedEndpoint", 	 		"type": "text",  	"default": "https://fm.flashtalking.com/feed/1642/random/?numItems=5&shuffle=true" },
	    { "name": "Default_FeedEndpoint", 	"type": "text",  	"default": "https://fm.flashtalking.com/feed/1642/random/?numItems=5&shuffle=true" },
	    { "name": "Use_Feed", 				"type": "text",  	"default": "yes"},
	    { "name": "Legal_Text", 	  		"type": "text", 	"default": "©2024 Best Buy" },
		{ "name": "Product1_Image", 	 	        	"type": "image", 	"default": "blank.png" },
		{ "name": "Product1_URL", 	 		"type": "text", 	"default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?			id=pcmcat321600050000#jl-appliance-deals" },
		
		{ "name": "Product2_Image", 	 	        	"type": "image", 	"default": "blank.png" },
		{ "name": "Product2_URL", 	 		"type": "text",  	"default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?id=pcmcat321600050000#jl-appliance-deals" },
		
		{ "name": "Product3_Image", 	 	        	"type": "image", 	"default": "blank.png" },
		{ "name": "Product3_URL", 	 		"type": "text",  	"default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?id=pcmcat321600050000#jl-appliance-deals" },
	    { "name": "default_fallback_image",	"type": "image",	"default": "images/300x50_default_newBranding.png" }
	],
	"trackingEvents":[
		{ "name":"prev_arrow_clicked",	"type":"string" },
		{ "name":"next_arrow_clicked",	"type":"string" },
		{ "name":"fallback_img",		"type":"string" }
	]
});