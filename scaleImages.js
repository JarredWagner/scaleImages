function scaleImages(selector, scaling, max) {

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var images = document.querySelectorAll(selector);
    var imageWidth, imageHeight;

    for (var i = 0; i < images.length; i++) { 

      imageWidth = images.item(i).naturalWidth;
      imageHeight = images.item(i).naturalHeight;

      //console.log("Image "+(i+1)+": Width = "+imageWidth+"px, Height = "+imageHeight+"px");

      var ratioLandscape = (imageWidth / imageHeight).toFixed(2);
      var ratioPortrait = (imageHeight / imageWidth).toFixed(2);

      //console.log("L Ratio = "+ratioLandscape+", P Ratio = "+ratioPortrait);

      if ( windowWidth > windowHeight ) {

        var imageFinalHeight = Math.round(windowHeight);
        var imageFinalWidth = Math.round( (imageFinalHeight * ratioLandscape) );

        if ( imageFinalWidth > windowWidth ) {

          imageFinalWidth = Math.round(windowWidth);
          imageFinalHeight = Math.round((imageFinalWidth * ratioPortrait));

        }

      } else {

        var imageFinalWidth = Math.round(windowWidth);
        var imageFinalHeight = Math.round((imageFinalWidth * ratioPortrait));

        if ( imageFinalHeight > windowHeight ) {

          imageFinalHeight = Math.round(windowHeight);
          imageFinalWidth = Math.round( (imageFinalHeight * ratioLandscape) );

        }

      }

      if (scaling) {

        imageFinalWidth = Math.round(imageFinalWidth * (scaling * 0.01));
        imageFinalHeight = Math.round(imageFinalHeight * (scaling * 0.01));

      }

      if (max) {

        if (imageFinalWidth > max) {

          imageFinalWidth = max;
          imageFinalHeight = max * ratioPortrait;

        } else if (imageFinalHeight > max) {

          imageFinalHeight = max;
          imageFinalWidth = max * ratioLandscape;

        }

      }

      //console.log("Final Width = "+imageFinalWidth+"px, Final Height = "+imageFinalHeight+"px;");

      images.item(i).style.width = "auto";
      images.item(i).setAttribute("width", imageFinalWidth + "px");
      images.item(i).setAttribute("height", imageFinalHeight + "px");

    }

}

scaleImages("img", 80, 2000); 

window.onresize = function(){
  scaleImages("img", 80, 2000);  
};
