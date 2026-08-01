FT.manifest({
    "filename": "index.html",
    "width": 160,
    "height": 600,
    "clickTagCount": 7,
    "richLoads": [
        { "name": "Richload",                   "src": "BestBuy_2024_ContinuityRL_160x600" }
    ],
    "instantAds":[
        {"name": "Richload",            "type": "richLoad",     "default": "BestBuy_2024_ContinuityRL_160x600" },
		{"name": "IntroHeadline1", 	 	"type": "text",  "default": "<style>#CI_Frame2Copy { font-size: 21px; }</style>Need an <br><span style='color: #fff800;'>appliance</span> fast?"},
		{"name": "IntroHeadline2", 	 	"type": "text",  "default": " "},
		{"name": "Frame_4_Headline", 	"type": "image",  "default": "MappGot_2024_160x600.png"},
		{"name": "Icon1", 	 	        "type": "image", "default": "free_delivery_160x600.png"},
		{"name": "FeedEndpoint", 	 	"type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6546682,6286368,6368981,6546679,6546683,6368963,6286367,6488871,6488857,6399691,6399703,6508235,6338021,6338026,6338015,6497199,6497207?shuffle=true&numItems=100"},
	    {"name": "Default_FeedEndpoint", "type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6546682,6286368,6368981,6546679,6546683,6368963,6286367,6488871,6488857,6399691,6399703,6508235,6338021,6338026,6338015,6497199,6497207?shuffle=true&numItems=100"},
	    {"name": "Use_Feed", "type": "text",  "default": "yes"},
	    {"name": "Legal_Text", 	  		"type": "text",  "default": "©2024 Best Buy"},
		{"name": "Product1_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product1_URL", 	 	"type": "text",  "default": "useFeed"},
		{"name": "Product2_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product2_URL", 	 	"type": "text",  "default": "useFeed"},
		{"name": "Product3_Image", 	 	"type": "image", "default": "blank.png"},
		{"name": "Product3_URL", 	 	"type": "text",  "default": "useFeed"},

	    {"name": "default_fallback_image", 	  		"type": "image", "default": "images/FY2024_HolidayDefault_160x600.jpg"}

	],
	"trackingEvents":[
		{"name":"prev_arrow_clicked", "type":"string"},
		{"name":"next_arrow_clicked", "type":"string"},
		{"name":"fallback_img", "type":"string"}
	]
});