// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	var mySlide = document.getElementById("slideshow");
	document.getElementById("photo").src = mImages[mCurrentIndex].img;
	var myDetails = document.getElementsByClassName("details");
	var tempLoc = document.getElementsByClassName("location");
	tempLoc[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;
	var tempDesc = document.getElementsByClassName("description");
	tempDesc[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;
	var tempDate = document.getElementsByClassName("date");
	tempDate[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;
	if(mCurrentIndex < mImages.length - 1)
	{
		mCurrentIndex++;
	}
	else
	{
		mCurrentIndex = 0;
	}
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images-short.json';
mRequest.onreadystatechange = function() {
	if(mRequest.readyState == 4 && mRequest.status == 200){
		try{
			mJson = JSON.parse(mRequest.responseText);
			
				for(var i = 0; i < mJson.images.length; i++){
				mImages.push(new GalleryImage(mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].imgPath));
				}
			console.log(mJson);
		} catch(err) {
			console.log(err.message);
		}
	}
};
mRequest.open("GET",mUrl, true);
mRequest.send();
//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	$('.moreIndicator').click(function(){
		if($("img.moreIndicator").hasClass("rot90"))
		{
			$(".moreIndicator").removeClass("rot90");
			$(".moreIndicator").addClass("rot270");
		}
		else
		{
			$(".moreIndicator").removeClass("rot270");
			$(".moreIndicator").addClass("rot90");
		}
	});
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);
//$('#prevPhoto').click(function(){
		//console.log ('Howdy partner');
		//if($("img.moreIndicator").hasClass("rot90"))
		//{
			//$(".moreIndicator").removeClass("rot90");
			//$(".moreIndicator").addClass("rot270");
		//}
		//else
		//{
			//$(".moreIndicator").removeClass("rot270");
			//$(".moreIndicator").addClass("rot90");
		//}
//});


function GalleryImage(loc, desc, dte, imge) {
	this.location = loc;
	this.description = desc;
	this.date = dte;
	this.img = imge;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
};


