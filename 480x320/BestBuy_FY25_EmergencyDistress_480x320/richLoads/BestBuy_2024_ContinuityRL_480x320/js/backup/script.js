// object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false, 
        configurable: true, 
        writable: false, 
        value: function (prop, handler) {
            var oldval = this[prop], 
                newval = oldval, 
                getter = function () { return newval; }, 
                setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                };
            
            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                      get: getter, 
                      set: setter, 
                      enumerable: true, 
                      configurable: true
                });
            }
        }
    });
}

// set HTML element global variables
var container   = document.getElementById('container'),
    logo        = document.getElementById('logo'),
    bg      = document.getElementById('bg'),
    frame1      = document.getElementById('frame1'),
    frame1_img  = document.getElementById('frame1_img'),
    frame1_copyImg  = document.getElementById('frame1_copyImg'),
    frame1_logo = document.getElementById('frame1_logo'),
    frame2      = document.getElementById('frame2'),
    frame5      = document.getElementById('frame5'),
    Frame4Headline      = document.getElementById('Frame4Headline'),
    frame5_img      = document.getElementById('frame5_img'),
    ctaBox      = document.getElementById('ctaBox'),
    block_click = false,
    products_info = [],
    delayTime = 2.8,
    isError = false,
    carousel_speed = 0.35,
    car_here = false,
    bus_here = false,
    feedresponse_has_fired = false,
    refire = true,
    endCarouselActive = true,
    clickerDrag = .05,
    currentFrame = 0,
    imgArray = [],
    imgCtr = 0,
    useFeed = false;

    Ad = {

        /*
         *  Ad and image sizes.  Just change these numbers to update the ad.
         */
        WIDTH      : 480,
        HEIGHT     : 250,
        IMG_HEIGHT : 155,
        IMG_WIDTH  : 155,

        LOADED : false, // ad status. do not change.


/*
 *  Initialize creative
 */
        init : function(){
            // build creative
            Ad.addElements();
            Ad.watch('LOADED', Ad.ready);

        },

        goChristmasIntroFrame: function () {
            // CHANGES   2020.Oct.08 - new animation for the Christmas Intro Frame    

            var christmasTL = new TimelineMax();

            christmasTL.set(ChristmasIntroFrame, {
                opacity: 1
            });

            christmasTL.set(["#CI_Frame3CopyCont", "#CI_Frame2CopyCont", "#bestBuyLogo", "#icon1"], {
                rotation: 0.01,
                rotationZ: 0.01,
                backfaceVisibility: "hidden",
                perspective: '1000px',
                force3D: true,
            }); // this line is for preventing most of the jittering issues on every browser

            christmasTL.set([CI_Frame2CopyCont, icon1], {x: Ad.WIDTH})

            christmasTL.set(["#CI_Frame2Copy", "#CI_Frame3Copy"], {
                rotation: 0.01,
                rotationZ: 0.01,
                backfaceVisibility: "hidden",
                perspective: '1000px',
                force3D: true,
            }); // this line is for preventing most of the jittering issues on every browser

            christmasTL.from(bestBuyLogo, 0.3, {opacity: 0});

            christmasTL.to(bestBuyLogo, 0.5, {opacity: 0, delay: 2,}, "-=0.5")
                .set(bestBuyLogo, {scale: 0.7, x: -165, y: -116, z: .01});

            christmasTL.addLabel("frame2"); // insert a label when the best buy logo starts to go to the top right corner
            
            christmasTL.to([bestBuyLogo, f2bg], .5, {opacity: 1}, 'frame2')
            // christmasTL.to([bestBuyLogo], .5, {opacity: 1}, 'frame2')
            // return;
            christmasTL.to(CI_Frame2CopyCont, 1, {x: 30, y:4, ease: Linear.easeNone}, "frame2")
                .to(CI_Frame2CopyCont, 1.7, {x: -20, y: 4, ease: Linear.easeNone, delay: -.1})
                .to(CI_Frame2CopyCont, 1, {opacity: 0, x: -Ad.WIDTH});
            // return;
            // christmasTL.to([decoration, glow], 1, {x: 20, opacity: 1, ease: "none", onComplete: () => {
            //     TweenMax.to([decoration, glow], 30, {x: -Ad.WIDTH});
            // }}, "frame2");

            // return;
           
            christmasTL.addLabel("frame3"); // insert a label a little bit after when the gift box finishes to slowly pan 


            var checkBlank = myFT.instantAds.Icon1.toLowerCase().indexOf("blank") > -1;
        if (checkBlank && myFT.instantAds.IntroHeadline2 == ''){ // image and headline are blank
            christmasTL.addLabel("endFrame", ">-1"); // insert a label when the endframe copy stops moving then adjust it a little backwards

            christmasTL.to(ChristmasIntroFrame, 0.5, {
                opacity: 0
            },"endFrame");
            // christmasTL.to(CI_Frame2CopyCont, 0.5, {
            //     y: 500,
            //     scale: 10,
            // },"endFrame");
            christmasTL.to(ChristmasIntroFrame, 0, {
                display: "none",
                onStart: function () {
                    // start carousel
                    if (products_info.length > 1) {
                        Ad.animate();
                    }
                }
            });

        } else if (checkBlank && myFT.instantAds.IntroHeadline2 != ''){ // only image is blank
            christmasTL.to(CI_Frame2CopyCont, 0.5, {
                scale: 2,
                x: -300,
                y: -100,
                delay: .5,
                ease: "power1.out"
            },"frame3");
            christmasTL.from(CI_Frame3CopyCont, 0.5, {
                opacity: 0
            }, "-=0.5");
            christmasTL.to(CI_Frame2CopyCont, 0.5, {
                scale: 2,
                x: -600,
                y: -200,
                opacity: 0,
                ease: "power1.out"
            }, "-=.5");
            
            christmasTL.add( function(){
    //            christmasTL.pause(); 
            });
            christmasTL.to(CI_Frame3CopyCont, 3, {
                x: -10,
                ease: "none"
            });
            
            christmasTL.addLabel("endFrame", ">-1"); // insert a label when the endframe copy stops moving then adjust it a little backwards
            
            christmasTL.to(ChristmasIntroFrame, 0.5, {
                opacity: 0
            },"endFrame");
            // christmasTL.to(CI_Frame3CopyCont, 0.5, {
            //     scale: 10,
            // },"endFrame");
            christmasTL.to(ChristmasIntroFrame, 0, {
                display: "none",
                onStart: function () {
                    // start carousel
                    if (products_info.length > 1) {
                        Ad.animate();
                    }
                }
            });

        } else if (!checkBlank && myFT.instantAds.IntroHeadline2 == ''){// Change on this condition only --MUKIMUT
            christmasTL.to(icon1, 1, {x: 10, ease: "none", delay: -.85});
            
            christmasTL.to(icon1, 1.7, {x: -20, ease: "none"})
                .to(icon1, 1, {opacity: 0, x: -Ad.WIDTH});
            
            christmasTL.addLabel("endFrame", ">-.5"); // insert a label when the endframe copy stops moving then adjust it a little backwards
            
            christmasTL.to(ChristmasIntroFrame, 0.5, {
                opacity: 0
            },"endFrame");
            // christmasTL.to(icon1, 0.5, {
            //     scale: 10,
            // },"endFrame");
            christmasTL.to(ChristmasIntroFrame, 0, {
                display: "none",
                onStart: function () {
                    // start carousel
                    if (products_info.length > 1) {
                        Ad.animate();
                    }
                }
            });
        }

        },
    
        
        preloadChristmasIntroFrame: function () {
            // CHANGES 2020.Oct.08 - preload new Christmas Intro Frame Images
            CI_Frame2Copy.innerHTML = myFT.instantAds.IntroHeadline1;
            CI_Frame3Copy.innerHTML = myFT.instantAds.IntroHeadline2;

            Ad.preloadChristmasIntroFrameImage(document.getElementById("bestBuyLogo"), "images/christmasIntroAssets/best_buy_logo.png");
            Ad.preloadChristmasIntroFrameImage(document.getElementById("arrow_left"), "images/arrow_prev_300x250.png");
            Ad.preloadChristmasIntroFrameImage(document.getElementById("arrow_right"), "images/arrow_next_300x250.png");
            Ad.preloadChristmasIntroFrameImage(document.getElementById("icon1"), myFT.instantAds.Icon1);
            Ad.checkChristmasIntroFrameImages();
        },

        preloadChristmasIntroFrameImage: function (elem, img) {
            imgCtr++;
            var temp = new Image();
            temp.src = img;
            temp.onload = function (e) {
                imgArray.push(temp);
            }
            elem.src = temp.src;
        },
        checkChristmasIntroFrameImages: function () {
            var checkImageInterval = setInterval(function () {
                if (imgCtr == imgArray.length) {
                TweenLite.to(container, 0.5, {
                    opacity: 1,
                    delay: .5,
                    onStart: function () {
                        Ad.goChristmasIntroFrame();
                    }
                });
                    clearInterval(checkImageInterval);
                }
            }, 500);
        },


        /*
         *  Animate creative
         */
        animate : function() {
            TweenMax.to(container, 0.3, {opacity: 1});

            if(isError){
                return;
            }

            container.classList.remove('hidden');
            // logo.classList.remove('hidden');
            frame1.classList.remove('hidden');
            frame2.classList.remove('hidden');

            /*  animate text in line by line  */
            function animateTextFrame (frame, animation, callback) {
                var frameText  = frame.childNodes[0].childNodes[0].childNodes,
                    delay      = 0.5, // delay before showing first line
                    lineCount  = 0;
                
                // animate each <span> in the frame
                for(var i = 0; i < frameText.length; i++){
                    TweenMax.to(frameText[i], 0.3, {left: 0, right: 0, delay: delay, ease: Strong.easeInOut, onComplete: function() {
                        lineCount++; // add one more line to the count
                         if(lineCount === frameText.length && frame.id === 'frame1'){
                            
                            TweenMax.delayedCall(1.35,zoomOut);
                            // logo.classList.remove('hidden');
                            TweenMax.to(logo, .5,{opacity:1, ease: Strong.easeInOut,delay: 1.25})
                        }
                    }});
                    delay += 0.4; // extend delay to add time between lines
                }
            }
            /*  animate text in line by line  */
            function zoomOut() {
                
                frame1.style.backgroundImage = 'none';
                frame1_img.style.backgroundImage = 'none';
                TweenMax.set([frame1,frame1_img],{transformOrigin:"50% 50%"});
                
                var tl = new TimelineMax();
                tl.addLabel("startProducts",.3);

                // tl.to([frame1, frame1_img],.75,{scaleX:.42,scaleY:.42,top:"+=143",left:"+=159", ease:  Strong.easeOut});//,onComplete:zoomIn});
                tl.to([frame1, frame1_img],.20,{opacity:0,delay:.1});//,onComplete:zoomIn});

                TweenMax.delayedCall(.3,startClick);
                
                // tl.add(zoomIn,"startProducts");
                TweenMax.delayedCall(0,zoomIn);

            }
            
            function startClick() {
                 clickerDrag+=.0115;
                if(refire){
                    var d = clickerDrag+.11;
                    TweenMax.delayedCall(d,startClick);
                }

            }

            function zoomIn() {
                car_here = true;
                var noFeedCta = document.getElementById('noFeedCta');

                TweenMax.to([frame1,frame1_img],.15,{opacity:0,delay:.01});
                var fstProd = frame2.childNodes[0];
    
                TweenMax.to(fstProd,.0,{opacity:1,ease:Circ.easeOut, delay:0,onComplete:function () {
                    TweenMax.delayedCall(0.5,moveCarousel);
                }});

                TweenMax.to([arrow_left, arrow_leftOverlay], 0.5, {opacity: 1, display:'block', left:'-5px', ease: Strong.easeInOut, delay:0.1}); // slide in
                TweenMax.to([arrow_right, arrow_rightOverlay], 0.5, {opacity: 1, display:'block', right:'-5px', ease: Strong.easeInOut, delay:0.1}); // slide in
            }

            function moveCarousel() {
                var carouselItems = frame2.childNodes,
                    holdTime      = .85,
                    tl            = new TimelineMax(),
                    id            = 1;
                TweenMax.set(carouselItems,{left:Ad.WIDTH,opacity:1,top:-250});
                TweenMax.set(carouselItems[0],{left:0});
                
                for(var i = 0; i < (carouselItems.length-1); i++){
                    if (i != 0) {
                        holdTime= 1.85;
                    }
                    tl.addLabel('autoFrames'+i,"+="+holdTime);
                    tl.to(carouselItems[i],.35,{left:-Ad.WIDTH,ease:Strong.easeOut},'autoFrames'+i);
                    tl.to(carouselItems[i+1],.35,{left:0,ease:Strong.easeOut,onComplete:function(){
                        currentFrame++;
                    }},'autoFrames'+i);
                }

                id = carouselItems.length-1; 
                function frm5(){
                        car_here = false;
                        bus_here = true;

                        TweenMax.delayedCall(1,animateTextFrame,[frame2,'slideUp',animateEndFrame]);
                        TweenMax.delayedCall(.4,animateEndFrame);

                };
                frm5.name = 'frm5';
                tl.addLabel("prodOut","+="+holdTime);
                tl.to(carouselItems[id],1.3,{opacity:0,ease: Strong.easeOut},"prodOut");
                tl.add(frm5,'prodOut');
            }


            /*  animate final frame  */
            function animateEndFrame () {

                // frame2.style.zIndex = "3";

                //ARROWS
                TweenMax.to(arrow_left,.35,{left:"45px",delay:.5});
                TweenMax.to(arrow_right,.35,{right:"45px",delay:.5});

                TweenMax.to(arrow_leftOverlay,.35,{opacity:0, display:'none'});
                TweenMax.to(arrow_rightOverlay,.35,{opacity:0, display:'none'});


                frame5.classList.remove('hidden');
                frame5_img.classList.remove('hidden');
                // ctaBox.classList.remove('hidden');

                ctaBox.style.display = "block";
                arrow_left.style.display = "block";
                arrow_right.style.display = "block";


                var headline = frame5.childNodes[0],
                    cta      = document.getElementById('ctaCopy'),
                    hover    = document.getElementById('cta_hover'),
                    slide2,
                    slide3;
                // if(myFT.instantAds.Frame_4_Headline.indexOf("blank") >= 0){
                //  legal    = frame5_img.childNodes[2];
                // }else{
                //  legal    = frame5_img.childNodes[2];
                // }
                TweenMax.set(cta, {opacity:0});

                // TweenMax.to((frame5,frame5_img), 0.5, {top: 0, ease: Strong.easeInOut}); // slide in

                // TweenMax.from([text_wrapper_fm6, frame5_copyImg], 0.5, {left: -300, ease: Strong.easeInOut, delay:.25});
                TweenMax.to([Frame4Headline], 0.5, {opacity: 1, ease: Circ.easeInOut, delay:.25});
                TweenMax.set(carousel,{opacity:1,delay:.05});
                TweenMax.to(carousel, 0.5, {opacity: 1, ease: Strong.easeOut, delay:.05,onComplete:function () {
                    currentFrame = 0;
                    TweenMax.set(carousel.children,{opacity:1});
                    if(products_info.length > 2){
                        rightItem = products_info[1].slide;
                        TweenMax.set(rightItem,{opacity:.7});
                        TweenMax.to(rightItem, 0.5, {left: 175, ease: Strong.easeInOut, delay:.15});
                        
                        leftItem = products_info[products_info.length-1].slide;
                        TweenMax.set(leftItem,{opacity:.7});
                        TweenMax.to(leftItem, 0.5, {left: -175, ease: Strong.easeInOut, delay:.15});
                    } else {
                        rightItem = products_info[1].slide;
                        // TweenMax.set(rightItem,{opacity:.7});
                        TweenMax.to(rightItem, 0.5, {left: 175, ease: Strong.easeInOut, delay:.15});
                    }
                }});

                Ad.setUpCarousel();

                TweenMax.to(arrow_left, 0.5, {opacity: 1, ease: Strong.easeInOut, delay:.75}); // slide in
                TweenMax.to(arrow_right, 0.5, {opacity: 1, ease: Strong.easeInOut, delay:.75}); // slide in

                TweenMax.to(headline, 0.5, {left: 0, delay: 0.5, ease: Strong.easeInOut});
                
                TweenMax.to(legal, 0.5, {opacity: 1, delay: 0.5, ease: Strong.easeInOut});

                TweenMax.set(cta, {opacity:0});
                TweenMax.to(cta, 0.5, {opacity: 1, delay: 0.5, ease: Strong.easeInOut});

                Ad.setUpCarousel();

            }

            /*  move frame off screen  */
            function moveFrame (frame, direction, callback){
                var offsetX = 0,
                    offsetY = 0;
                // determine which way to animate and set coordinates
                switch(direction){
                    case 'slideUp':     offsetY = -Ad.HEIGHT; break;
                    case 'slideDown':   offsetY =  Ad.HEIGHT; break;
                    case 'slideLeft':   offsetX = -Ad.WIDTH;  break;
                    case 'slideRight':  offsetX =  Ad.WIDTH;  break;
                    default: break;
                }

                // move frame
                TweenMax.to(frame, 0.5, {top: offsetY, left: offsetX, ease: Strong.easeInOut, onComplete: function(){
                    callback(); // run callback
                    if(direction !== ''){
                        frame.classList.add('hidden'); // hide frame
                    }
                }});
            }

            TweenMax.set(frame2, {top: Ad.HEIGHT});
            // animateTextFrame(frame1, 'slideDown', zoomOut);
            zoomOut();
        },
        /*
         *  Special end frame carousel with preview products to either side of main, end frame copy displays not price/name
         */
        setUpCarousel : function(){
            console.log(products_info.length+' === '+"lastFrame");
            car_here = true;
            for(var i = 0; i < products_info.length; i++){
                //TODO add check in case array is above 3 products but still works for 1,2 or 3
                //(imgHold)
                (products_info[i].slide).style.opacity =1;

                //(products_info[i].clicker).style.opacity = 0;
                (products_info[i].footer).style.opacity = 0;
                (products_info[i].slide).style.top ="0px";
                TweenMax.set((products_info[i].imageHold),{scaleX:.9,scaleY:.9});
                TweenMax.set((products_info[i].imageHold),{opacity:0});
                
                if (products_info.length <= 3){
                    if(i == 0){
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                    }
                    if(i == 1){
                        (products_info[i].slide).style.left = "480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});
                    }
                    if(i == 2){
                        (products_info[i].slide).style.left = "-480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});

                    }
                } else if (products_info.length == 4){
                    if(i == 0){
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                    }
                    if(i == 1){
                        (products_info[i].slide).style.left = "480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});
                    }
                    if(i == 3){
                        (products_info[i].slide).style.left = "-480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});

                    }
                } else if (products_info.length == 5){
                    if(i == 0){
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                    }
                    if(i == 1){
                        (products_info[i].slide).style.left = "480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});
                    }
                    if(i == 4){
                        (products_info[i].slide).style.left = "-480px";
                        (products_info[i].slide).style.opacity = .0;
                        TweenMax.set((products_info[i].imageHold),{opacity:1});
                        TweenMax.set((products_info[i].imageHold),{scaleX:.45,scaleY:.45});

                    }
                }
            }
        },

        // ctaClick : function(e) {
        //  myFT.clickTag(3, myFT.instantAds.clickTag3);
        // },   

        prodClick : function(e){
            console.log("prodClick :: "+e.target.id);
            
            if (car_here) {
                var prodCounter = currentFrame+1;

                if(myFT.instantAds.Use_Feed.toLowerCase() === "yes") {
                    var url = products_info[currentFrame].url;
                } else {
                    // var url = myFT.instantAds["Product" + prodCounter + "_URL"];
                    var url = myFT.instantAds["Product1_URL"];
                }
                
                var trackStr = products_info[currentFrame].powerfeeds_id;
                //myFT.stateTrackingEvent(trackStr, 'ft_section');
                Tracker.clickTrackEvent(trackStr, 'ft_section', false);

                console.log("skuString on click is :: "+products_info[currentFrame].powerfeeds_id);
                console.log("currentFrame " + (currentFrame+1));
                myFT.clickTag(parseInt(currentFrame+1), url);
            }else {
                myFT.clickTag(1, "");
            }
        },
        /*
         *  Carousel from endFrame layout to end carousel (displays only one product and product price at a time)
         */
        resetCarousel : function(e){

            for(var i = 0; i < products_info.length; i++){ 
                TweenMax.set((products_info[i].imageHold),{opacity:1});
            }

            //cta off
            TweenMax.to([Frame4Headline], 0.5, {opacity: 0, ease: Strong.easeInOut});
            document.getElementById('ctaCopy').style.display = 'none';
            // hover.style.display = 'none';
            //ARROWS
            TweenMax.to(arrow_left,.35,{left:"-=60px"});
            TweenMax.to(arrow_right,.35,{right:"-=60px"});
            //fade out copy on frame 6 and cta
            // TweenMax.to([text_wrapper_fm6,cta], .1,{opacity:0, delay:0});
            //animate the footer background in
            
            TweenMax.to('.prod_img_holder',.35,{scaleX:1,scaleY:1,ease:Strong.easeOut});
            TweenMax.to('.footer_hold',.35,{opacity:1,delay:.5});
            if (products_info.length > 2) {
                if(e.target.id == 'arrow_right'){
                    currentFrame = 1;
                    if (products_info.length == 3){
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:-Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide1',.25,{opacity:1,left:0,ease:Strong.easeOut});
                    } else if (products_info.length == 4){
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide'+(products_info.length-2),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:-Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide1',.25,{opacity:1,left:0,ease:Strong.easeOut});
                    } else if (products_info.length == 5){
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide'+(products_info.length-2),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide'+(products_info.length-3),.25,{opacity:1,left:-Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:-Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide1',.25,{opacity:1,left:0,ease:Strong.easeOut});
                    }
                }else{
                    currentFrame = products_info.length-1;
                    if (products_info.length == 3){
                        TweenMax.to('#slide1',.25,{opacity:1,left:Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:0,ease:Strong.easeOut});
                    } else if (products_info.length == 4){
                        TweenMax.to('#slide1',.25,{opacity:1,left:Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:0,ease:Strong.easeOut});
                        TweenMax.to('#slide'+(products_info.length-2),.25,{opacity:1,left:Ad.WIDTH});
                    } else if (products_info.length == 5){
                        TweenMax.to('#slide1',.25,{opacity:1,left:Ad.WIDTH});
                        TweenMax.to('#slide0',.5,{left:Ad.WIDTH,ease:Strong.easeOut});
                        TweenMax.to('#slide'+(products_info.length-1),.25,{opacity:1,left:0,ease:Strong.easeOut});
                        TweenMax.to('#slide'+(products_info.length-2),.25,{opacity:1,left:Ad.WIDTH});
                        TweenMax.to('#slide'+(products_info.length-3),.25,{opacity:1,left:Ad.WIDTH});
                    }
                }
            } else {
                currentFrame = 1;
                if(e.target.id == 'arrow_right'){
                    TweenMax.to('#slide0',.5,{left:-Ad.WIDTH,ease:Strong.easeOut});
                    TweenMax.fromTo('#slide1',.25,{left:Ad.WIDTH},{opacity:1,left:0,ease:Strong.easeOut});
                }else{
                    TweenMax.to('#slide0',.5,{left:Ad.WIDTH,ease:Strong.easeOut});
                    TweenMax.to('#slide1',.25,{left:0},{opacity:1,ease:Strong.easeOut});
                }
            }
        },
        /*
         *  Carousel arrow clicks
         */
        onArrowClick : function(e) {
            ctaBox.style.display = "none";
            var isRightClick = (e.target.id === 'arrow_right');

            if (endCarouselActive) {
                //set flag to false
                endCarouselActive = false;
                TweenMax.to(legal, 0.5, {opacity: 0, ease: Strong.easeInOut});
                Ad.resetCarousel(e);

                return;
            }

            var elm =  document.getElementById('slide'+currentFrame);//element to slide out
            var elm2;//element to slide in

            if(!block_click){
                //set flag to prevent click while transitioning
                block_click = true;
                //element to move out
                if(isRightClick){
                    currentFrame++;
                    myFT.tracker('next_arrow_clicked',null,"next_arrow_clicked");
                    TweenMax.to(elm, carousel_speed,{left:-Ad.WIDTH,ease:Strong.easeOut, delay:carousel_speed});
                    if (currentFrame > products_info.length-1) {
                        currentFrame = 0;
                    }
                    elm2 =  document.getElementById('slide'+currentFrame);
                    TweenMax.set(elm2,{left:Ad.WIDTH});
                    TweenMax.to(elm2, carousel_speed,{left:0,ease:Strong.easeOut, delay:carousel_speed,onComplete:function () {
                        block_click = false;
                    }});
                    
                }else{
                    currentFrame--;
                    myFT.tracker('prev_arrow_clicked',null,"prev_arrow_clicked");

                    TweenMax.to(elm, carousel_speed,{left:Ad.WIDTH,ease:Strong.easeOut, delay:carousel_speed});
                    if (currentFrame < 0) {
                        currentFrame = products_info.length-1;
                    }
                    elm2 =  document.getElementById('slide'+currentFrame);
                    TweenMax.set(elm2,{left:-Ad.WIDTH});
                    TweenMax.to(elm2, carousel_speed,{left:0,ease:Strong.easeOut, delay:carousel_speed,onComplete:function () {
                        block_click = false;
                    }});
                }
            }
        },

        cta_over : function(e) {
            // TweenMax.to(hover, 0.5, {opacity: 1, ease: Strong.easeInOut});
            document.getElementById('ctaCopy').style.backgroundColor = '#ffffff';
            document.getElementById('ctaCopy').style.borderColor = '#ffe70b';
        },

        cta_out : function(e) {
            // TweenMax.to(hover, 0.5, {opacity: 0, ease: Strong.easeInOut});
            document.getElementById('ctaCopy').style.backgroundColor = '#FFF200';
            document.getElementById('ctaCopy').style.borderColor = '#FFF200';
        },

        onCT_7 : function(){
            // myFT.clickTag(7);
            myFT.clickTag(1, myFT.instantAds.Product1_URL);
        },

        /*
         *  Create and add elements to container
         */
        addElements : function() {
            useFeed = true;
            
            bg.style.top = "-529px";
            
            // legal
            legal = document.createElement('p');
            legal.innerHTML = myFT.instantAds.Legal_Text;
            legal.classList.add('legal');
            
            myFT.applyButton(ChristmasIntroFrame, Ad.onCT_7);
            
            // images
            logo2.style.backgroundImage = "url('images/bb_logo_480x320.png')";
            bg.style.backgroundColor = "#ffffff";

            Frame4Headline.style.backgroundImage = "url('" + myFT.instantAds.Frame_4_Headline + "')";
            frame1.style.opacity = 0;
            
            myFT.applyButton(arrow_left, Ad.onArrowClick);
            myFT.applyButton(arrow_right, Ad.onArrowClick);

            // frame 5
            frame5_img.appendChild(legal);
            frame5.style.opacity = 0;

            // connect and add feed data
            Feed.connect();

            myFT.applyButton(logo, Ad.prodClick);
            container.addEventListener("mouseover", Ad.cta_over);
            container.addEventListener("mouseout", Ad.cta_out);

            myFT.applyButton(ctaBox, Ad.prodClick);
            container.addEventListener("mouseover", Ad.cta_over);
            container.addEventListener("mouseout", Ad.cta_out);

        },

        ellipsisMe : function(str){
            var revStr = str.split('').reverse().join('');
            var lastSpc = revStr.indexOf(' ')+1;
            revStr = revStr.slice(lastSpc,(revStr.length));
            str = revStr.split('').reverse().join('');
            str = str+ '...';
            return str;
        },

        /*
         *  Error handler
         */
        error : function(error) {
            Tracker.impressionTrackEvent('null');
            
            if(!feedresponse_has_fired){
                feedresponse_has_fired = true;
                Ad.LOADED = false;
                console.log(error);
                isError = true;
                container.style.opacity = 1;
                feedFail.style.opacity = 1;
                frame1.style.opacity = 0;
                frame1_img.style.opacity = 0;
                frame2.style.opacity = 0;
                frame5.style.opacity = 0;
                frame5_img.style.opacity = 0;
                logo.style.opacity = 0;

                myFT.applyClickTag(feedFail, 1);
                feedFail.src = myFT.instantAds.default_fallback_image;
                feedFail.style.zIndex = "999";
                
                myFT.tracker('fallback_img', null, "fallback_img");
            }

        },
        /*
         *  Ad is ready, begin and show
         */
        ready : function() {
            // show banner

            // TweenMax.delayedCall(.25, Ad.animate);
            TweenMax.delayedCall(.25, Ad.preloadChristmasIntroFrame);
        },

        /*
         *  Split headline at line breaks and return node to be added to element
         */
        splitHeadline3 : function (headline) {
            var ar = headline.split('<br>');
            var color;
            var newHeadline = "";
            var splitter = /<\/span><\/span>/gi,
                wrapper  = document.createElement('div');

            for(var i = 0; i < ar.length; i++){
                if(ar[i].indexOf(/<\/span>/ ) === -1){
                    ar[i] += "</span>";
                }

                if(ar[i].indexOf('<span')=== -1){
                    ar[i] = "<span style='"+color+"'>"+ar[i];
                }else{
                    var stColor = ar[i].indexOf('color');
                    var endColor = ar[i].indexOf(";'");
                    color = ar[i].slice(stColor, endColor);
                }
                newHeadline += ar[i];

            }
            newHeadline = newHeadline.replace(splitter, '</span>'); // replace <br> with spans

            wrapper.id = 'page_text';
            wrapper.innerHTML = "<span>"+newHeadline+"</span>"; // wrap headline with identifier
            wrapper.className = 'text-wrapper';

            return wrapper;
        },

        splitHeadline2 : function(headline) {
            var splitter = /<br>/gi,
                wrapper  = document.createElement('div');

            headline = headline.replace('>', '><span>'); // add extra opening span for first word
            headline = headline.replace('</', '</span></'); // add extra closing span for last word
            headline = headline.replace(splitter, '</span><span>'); // replace <br> with spans

            wrapper.classList.add('text-wrapper');
            wrapper.id = 'text_wrapper_fm6';
            wrapper.innerHTML = headline; // wrap headline with identifier

            return wrapper;
        }

    };

    Feed = {

        /*
         *  Set feed parameters and connect
         */
        connect : function(FeedObj) {
            
            var feedParams, ftFeed;

            // set dynamic parameters
            feedParams = new FTFeedParams();
            feedParams.segmentId = "";
            feedParams.defaultFeedEndpoint = myFT.instantAds.Default_FeedEndpoint;
            feedParams.feedEndpoint = myFT.instantAds.FeedEndpoint;

            // send connection request
            ftFeed = new FTFeed(myFT, feedParams);
            ftFeed.getFeed(Feed.success, Ad.error);
        },
        /*
         *  Parse data and apply to creative
         */
        createItem : function(data, num,sku) {
            //IMAGES FOR FRM 2-5
            var imageHold       = document.createElement('div'),
                image       = new Image(),
                footer      = document.createElement('div'),
                priceHold   = document.createElement('div'),
                price       = document.createElement('p'),
                nameHold    = document.createElement('div'),
                name        = document.createElement('p'),
                wrapper     = document.createElement('div'),
                clicker     = document.createElement('div'),
                cta         = document.createElement('div'),
                imageSize   = '&w='+ Ad.IMG_WIDTH +'&h='+ Ad.IMG_HEIGHT,
                dollarSign  = '<span style="padding-right:1px;">$</span>',
                dollarSpSign  = '<span style="padding-right:1px;">$</span>',
                // dollarSign  = '<span style="font-size:.9em">$</span>',
                // dollarSpSign  = '<span style="font-size:.9em">$ </span>',
                savePrefix  = 'Save '+ dollarSign,
                dollarSave,
                salePrice;

            //carousel images
            var carousel    = document.getElementById('carousel'),
                prodNumber  = num-1,
                wrapperClone,
                imageClone;

            if(data){
                footer.className = 'footer_hold';
                imageHold.className = 'prod_img_holder';

                dollarSave = '<span style="color:#000">'+data.dollarsavings+'</span>';
                salePrice = '<span style="color:#000">'+data.saleprice+'</span>';
                newsalePrice = '<span style="color:#000">'+data.saleprice+'</span>';
                // create image node
                image.onerror = function() {
                    image.onerror = '';
                    image.src = 'bblogo.png';
                    return true;
                };
                
                
                image.classList.add('prod_img');

                imageHold.appendChild(image);
                // create price node
                priceHold.className = "prod_price_hold";
                price.innerHTML = (Number(data.percentsavings) > 15) ? savePrefix + dollarSave+ ' <span style="font-size: 14px">' + dollarSpSign + newsalePrice + '</span>' : dollarSign + salePrice;
                price.classList.add('price');
                priceHold.appendChild(price);
                footer.appendChild(priceHold);

                // create name node
                nameHold.className = "prod_name_hold";
                name.innerHTML = data.name.length > 110 ? Ad.ellipsisMe(data.name.substr(0, 110)) : data.name;
                name.classList.add('name');
                nameHold.appendChild(name);
                footer.appendChild(nameHold);
                
                var prodCounter = num+1;
                image.src = data.powerfeeds_image + imageSize;
                
                // create cta
                cta.classList.add('cta_copy_nofeed');
                cta.innerHTML = "Shop Now";

                clicker.classList.add('clicker');

                //add nodes to wrapper
                wrapper.appendChild(imageHold);
                wrapper.appendChild(footer);
                wrapper.appendChild(clicker);

                wrapper.classList.add('item');
                TweenMax.set(wrapper,{transformOrigin:'right bottom',top:-250});

                wrapper.classList.add('ad-size');

                wrapper.style.opacity = 0;

                frame2.appendChild(wrapper); // add item to frame

                //create prod carousel
                prodNumber++;
                wrapperClone = wrapper.cloneNode(true);


                wrapperClone.classList.remove('item');
                wrapperClone.classList.add('slide');
                if(prodNumber ===0){
                    wrapperClone.style.left = "0px";
                }
                wrapperClone.id = "slide"+prodNumber;
                carousel.appendChild(wrapperClone);

                var prodUrl = data.url,
                    imageHolder = wrapperClone.childNodes[0],
                    footerHolder = wrapperClone.childNodes[1],
                    priceHolder = footerHolder.childNodes[0],
                    nameHolder = footerHolder.childNodes[1];

                products_info.push({id:prodNumber, slide:wrapperClone, url:prodUrl,footer:footerHolder,priceHold:priceHolder,nameHold:nameHolder,imageHold:imageHolder,clicker:clicker,imgURL: data.powerfeeds_image + imageSize,sku:sku});

            }
        },

        /*
         *  Feed connected successfully, route data
         */
        success : function(feedData, feedUrl) {
            console.log(feedData)
            var productCount = (feedData.length > 5)? 5 : feedData.length; 
            if(!feedresponse_has_fired){
                feedresponse_has_fired  = true;
                var skuString="";

                for(var i = 0; i < productCount; i++){
                    Feed.createItem(feedData[i], i, feedData[i].powerfeeds_id);
                    skuString += feedData[i].powerfeeds_id+"||";
                }

                for(i = 0; i <products_info.length;i++){
                    var img = products_info[i].imageHold.childNodes[0];
                    /** DISABLED. No fallback logo
                    img.onerror = function(e) {
                        e.target.onerror = '';
                        e.target.src = 'bblogo.png';
                        return true;
                    };
                    /** */

                    //IF USEFEED IS SET TO YES
                    var prodCounter = i+1; 
                    img.src = products_info[i].imgURL;
                    
                }

                //}
                skuString = skuString.slice(0,skuString.length-2);
                console.log('skuString on impression is :: '+skuString);
                Tracker.impressionTrackEvent(skuString);

                Ad.LOADED = true; // ad is loaded
            }

        }

    };
myFT.on("instantads", function () {
    
    Ad.init();
}); //initialize ad once ready