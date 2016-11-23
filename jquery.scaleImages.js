(function( $ ) {

  $.fn.scaleImages = function(options) {

    //Get Viewport Size
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    //Declare Image Size Variables
    var imageWidth, imageHeight, imageFinalWidth, imageFinalHeight;

    //Set Scaling Options
    var settings = $.extend({
      lazy: false,
      scaling: 100,
      max: 3000,
    }, options);

    //Cycle through the images
    return this.each(function(){

      //Get Image Width and Height
      if (settings.lazy == false) {
        imageWidth = $(this)[0].naturalWidth;
        imageHeight = $(this)[0].naturalHeight;
      } else {
        var imgBorder = (parseInt($(this).css('border-width')))*2;
        imageWidth = $(this).attr('width') + imgBorder;
        imageHeight = $(this).attr('height') + imgBorder;
      }

      //Get Aspect Ratios
      var ratioLandscape = (imageWidth / imageHeight).toFixed(2);
      var ratioPortrait = (imageHeight / imageWidth).toFixed(2);

      //Calculate the Image Sizes

      //If browser is landscape
      if ( windowWidth > windowHeight ) {

        //Set Image Height to Window Height
        imageFinalHeight = Math.round(windowHeight);
        //Scale Image Width to Retain Ratio
        imageFinalWidth = Math.round( (imageFinalHeight * ratioLandscape) );

        //Correction for Square-ish Viewports (Image Width Exceeds Window Width)
        if ( imageFinalWidth > windowWidth ) {

          //Set Image Height to Window Height
          imageFinalWidth = Math.round(windowWidth);
          //Scale Image Width to Retain Ratio
          imageFinalHeight = Math.round((imageFinalWidth * ratioPortrait));

        }

      //If browser is portrait
      } else {

        //Set Image Height to Window Height
        imageFinalWidth = Math.round(windowWidth);
        //Scale Image Width to Retain Ratio
        imageFinalHeight = Math.round((imageFinalWidth * ratioPortrait));

        //Correction for Square-ish Viewports (Image Height Exceeds Window Height)
        if ( imageFinalHeight > windowHeight ) {

          //Set Image Width to Window Width
          imageFinalHeight = Math.round(windowHeight);
          //Scale Image Height to Retain Ratio
          imageFinalWidth = Math.round( (imageFinalHeight * ratioLandscape) );

        }

      }

      //Do a final scaling, if desired
      if (settings.scaling !== 100 ) {

        imageFinalWidth = Math.round(imageFinalWidth * (settings.scaling * 0.01));
        imageFinalHeight = Math.round(imageFinalHeight * (settings.scaling * 0.01));

      }

      //If the image size is larger than the max, downsize
      if (imageFinalWidth > settings.max) {

        imageFinalWidth = settings.max;
        imageFinalHeight = settings.max * ratioPortrait;

      } else if (imageFinalHeight > settings.max) {

        imageFinalHeight = settings.max;
        imageFinalWidth = settings.max * ratioLandscape;

      }

      //Set Image Width and Height
      $(this).attr("width", imageFinalWidth);
      $(this).attr("height", imageFinalHeight);

      return this;

    });

  };

}( jQuery ));
