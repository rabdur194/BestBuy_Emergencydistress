FT.manifest({
    "filename": "index.html",
    "width": 970,
    "height": 250,
    "clickTagCount": 7,
    "richLoads": [
        {
            "name": "Richload",
            "src": "BestBuy_2024_ContinuityRL_970x250"
        }
    ],
    "instantAds": [
        {
            "name": "Richload",
            "type": "richload",
            "default": "BestBuy_2024_ContinuityRL_970x250"
        },
        {
            "name": "IntroHeadline1",
            "type": "text",
            "default": "Need a new <span style='color:#fff800;'>appliance?</span>"
		},
        {
            "name": "IntroHeadline2",
            "type": "text",
            "default": ""
		},        
		{
            "name": "Frame_4_Headline",
            "type": "image",
            "default": "MappGot_2024_970x250.png"
		},
        {
            "name": "Icon1",
            "type": "image",
            "default": "Icon1_970x250.png"
		},
        {"name": "FeedEndpoint", 	 	"type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6448442,6550554,6400437,6400433,6546716?shuffle=true"},
	    {"name": "Default_FeedEndpoint", "type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6448442,6550554,6400437,6400433,6546716?shuffle=true"},
        {
            "name": "Use_Feed",
            "type": "text",
            "default": "yes"
		},
        {
            "name": "Legal_Text",
            "type": "text",
            "default": "©2024 Best Buy"
		},
        {
            "name": "Product1_Image",
            "type": "image",
            "default": "blank.png"
		},
        {
            "name": "Product1_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "Product2_Image",
            "type": "image",
            "default": "blank.png"
		},
        {
            "name": "Product2_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "Product3_Image",
            "type": "image",
            "default": "blank.png"
		},
        {
            "name": "Product3_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "default_fallback_image",
            "type": "image",
            "default": "7x9_default_newBranding.png"
		}
	],
    "trackingEvents": [
        {
            "name": "left_arrow_clicked",
            "type": "string"
		},
        {
            "name": "right_arrow_clicked",
            "type": "string"
		},
        {
            "name": "FeedFail_Image",
            "type": "standard"
		}
	]
});
