FT.manifest({
    "filename": "index.html",
    "width": 300,
    "height": 250,
    "clickTagCount": 7,
    "richLoads": [
        {
            "name": "Richload",
            "src": "BestBuy_2024_ContinuityRL_300x250"
        }
    ],
    "instantAds": [
        {
            "name": "Richload",
            "type": "richload",
            "default": "BestBuy_2024_ContinuityRL_300x250"
        },
        {
            "name": "IntroHeadline1",
            "type": "text",
            "default": "<span style='font-size: 32px; line-height: 1.1em;'>Need an <br><span style='color: #fff800;'>appliance</span> fast?"
		},
        {
            "name": "IntroHeadline2",
            "type": "text",
            "default": ""
		},        
		{
            "name": "Frame_4_Headline",
            "type": "image",
            "default": "MappGot_2024_300x250.png"
		},
        {
            "name": "Icon1",
            "type": "image",
            "default": "free_delivery_300x250.png"
		},
        {"name": "FeedEndpoint", 	 	"type": "text",  "default": "https://fm.flashtalking.com/feed/175/specific/6546682,6286368,6368981,6546679,6546683,6368963,6286367,6488871,6488857,6399691,6399703,6508235,6338021,6338026,6338015,6497199,6497207?shuffle=true&numItems=10"},
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
            "default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?id=pcmcat321600050000"
		},
        {
            "name": "Product2_Image",
            "type": "image",
            "default": "blank.png"
		},
        {
            "name": "Product2_URL",
            "type": "text",
            "default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?id=pcmcat321600050000"
		},
        {
            "name": "Product3_Image",
            "type": "image",
            "default": "blank.png"
		},
        {
            "name": "Product3_URL",
            "type": "text",
            "default": "https://www.bestbuy.com/site/home-appliances/major-appliances-sale-event/pcmcat321600050000.c?id=pcmcat321600050000"
		},
        {
            "name": "default_fallback_image",
            "type": "image",
            "default": "FY2024_HolidayDefault_300x250.jpg"
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
