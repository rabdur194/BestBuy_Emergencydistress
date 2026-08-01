FT.manifest({
    "filename": "index.html",
    "width": 728,
    "height": 90,
    "clickTagCount": 7,
    "richLoads": [
        {
            "name": "Richload",
            "src": "BestBuy_2024_ContinuityRL_728x90"
        }
    ],
    "instantAds": [
        {
            "name": "Richload",
            "type": "richload",
            "default": "BestBuy_2024_ContinuityRL_728x90"
        },
        {
            "name": "IntroHeadline1",
            "type": "text",
            "default": "Need a new <span style='color:#fff800;'>appliance?"
		},
        {
            "name": "IntroHeadline2",
            "type": "text",
            "default": " "
		},        
		{
            "name": "Frame_4_Headline",
            "type": "image",
            "default": "MappGot_2024_728x90.png"
		},
        {
            "name": "Icon1",
            "type": "image",
            "default": "Icon1_728x90.png"
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
