FT.manifest({
    "filename": "index.html",
    "width": 300,
    "height": 600,
    "clickTagCount": 7,
    "richLoads": [
        { "name": "Richload",                   "src": "BestBuy_2024_ContinuityRL_300x600" }
    ],
    "instantAds":[
        {"name": "Richload",            "type": "richLoad",     "default": "BestBuy_2024_ContinuityRL_300x600" },
		{"name": "IntroHeadline1", 	 	"type": "text",  "default": "<span style='font-size: 32px; line-height: 1.1em;'>Need an <br><span style='color: #fff800;'>appliance</span> fast?"},
		{"name": "IntroHeadline2", 	 	"type": "text",  "default": ""},
		{"name": "Frame_4_Headline", 	"type": "image",  "default": "MappGot_2024_300x600.png"},
		{"name": "Icon1", 	 	        "type": "image", "default": "free_delivery_300x600.png"},
		{"name": "FeedEndpoint", 	 	"type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6448442,6550554,6400437,6400433,6546716?shuffle=true"},
	    {"name": "Default_FeedEndpoint", "type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6448442,6550554,6400437,6400433,6546716?shuffle=true"},
	    {"name": "Use_Feed", "type": "text",  "default": "yes"},
	    {"name": "Legal_Text", 	  		"type": "text",  "default": "©2024 Best Buy"},
		{"name": "Product1_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product1_URL", 	 	"type": "text",  "default": "useFeed"},
		{"name": "Product2_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product2_URL", 	 	"type": "text",  "default": "useFeed"},
		{"name": "Product3_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product3_URL", 	 	"type": "text",  "default": "useFeed"},

	    {"name": "default_fallback_image", 	  		"type": "image", "default": "2023_DefaultBackup_300x600.jpg"}

	],
	"trackingEvents":[
		{"name":"prev_arrow_clicked", "type":"string"},
		{"name":"next_arrow_clicked", "type":"string"},
		{"name":"fallback_img", "type":"string"}
	]
});