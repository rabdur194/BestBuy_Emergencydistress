FT.manifest({
    "filename": "index.html",
    "width": 480,
    "height": 320,
    "clickTagCount": 7,
    "richLoads": [
        {
            "name": "Richload",
            "src": "BestBuy_2024_ContinuityRL_480x320"
        }
    ],
    "instantAds": [
        {
            "name": "Richload",
            "type": "richload",
            "default": "BestBuy_2024_ContinuityRL_480x320"
        },
        {
            "name": "IntroHeadline1",
            "type": "text",
            "default": "<span style='font-size: 32px; line-height: 1.1em;'>Need an <br><span style='color:#fff800;'>appliance</span> fast?"
		},
        {
            "name": "IntroHeadline2",
            "type": "text",
            "default": ""
		},        
		{
            "name": "Frame_4_Headline",
            "type": "image",
            "default": "images/MappGot_2024_480x320.png"
		},
        {
            "name": "Icon1",
            "type": "image",
            "default": "images/free_delivery_480x320.png"
		},
        {
            "name": "FeedEndpoint",
            "type": "text",
            "default": "https://fm.flashtalking.com/feed/175/specific/6471414,6471410,6471407,6471411,6471405,6471412?shuffle=true"
		},
        {
            "name": "Default_FeedEndpoint",
            "type": "text",
            "default": "https://fm.flashtalking.com/feed/175/specific/6471414,6471410,6471407,6471411,6471405,6471412?shuffle=true"
		},
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
            "default": "images/blank.png"
		},
        {
            "name": "Product1_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "Product2_Image",
            "type": "image",
            "default": "images/blank.png"
		},
        {
            "name": "Product2_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "Product3_Image",
            "type": "image",
            "default": "images/blank.png"
		},
        {
            "name": "Product3_URL",
            "type": "text",
            "default": "useFeed"
		},
        {
            "name": "default_fallback_image",
            "type": "image",
            "default": "FY2024_HolidayDefault_480x320.jpg"
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
