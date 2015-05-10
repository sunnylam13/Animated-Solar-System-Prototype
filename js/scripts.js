jQuery(document).ready(function($) {

//////////////////////////////////////////////////
// GLOBAL VARIABLES

// store reference to the sun image
var $solarRef = $('section.planetThumbs section.sun');

// timeline instances
// the sun
var solarCentreAnimSequence = new TimelineMax({repeat: -1});

// orbital animation sequence references
// set to {repeat:-1} for continuous infinite animation
var mercuryOrbit = new TimelineMax({repeat:-1});
var venusOrbit = new TimelineMax({repeat:-1});
var earthOrbit = new TimelineMax({repeat:-1});
var marsOrbit = new TimelineMax({repeat:-1});
var jupiterOrbit = new TimelineMax({repeat:-1});

var orbitPauseStatus = false;
var orbitArray1 = [mercuryOrbit,venusOrbit,earthOrbit,marsOrbit,jupiterOrbit];

// orbital speeds
var earthOrbitSpeed = 8;
var mercuryOrbitSpeed = earthOrbitSpeed*0.243835616;
var venusOrbitSpeed = earthOrbitSpeed*0.615619178;
var marsOrbitSpeed = earthOrbitSpeed*1.88;
var jupiterOrbitSpeed = earthOrbitSpeed*11.86;

// orbital distances (from the sun)
// distance from sun relatively speaking
// where Mercury is the reference value
// to change how much of a wide circle you want the planet to travel, change mercury's value and it should update everything else
// setting var mercuryDistance to about 150 allows it to circle tightly enough around the Sun
var mercuryDistance = 150;
var venusDistance = mercuryDistance*1.862068966;
var earthDistance = mercuryDistance*2.586206897;
var marsDistance = mercuryDistance*3.931034483;
var jupiterDistance = mercuryDistance*13.413793103;

// transformOrigin values
// this is what we actually insert into the animation
var mercury_transform_origin = "50% 50%" + " " + "-" + (mercuryDistance).toString();
var venus_transform_origin = "50% 50%" + " " + "-" + (venusDistance).toString();
var earth_transform_origin = "50% 50%" + " " + "-" + (earthDistance).toString();
var mars_transform_origin = "50% 50%" + " " + "-" + (marsDistance).toString();
var jupiter_transform_origin = "50% 50%" + " " + "-" + (jupiterDistance).toString();

//////////////////////////////////////////////////
// FUNCTIONS

function showModalSetup () {
	// loop through all of the section.planet sections and set them up to show the modals
	var $planets = $('section.planet');

	$.each($planets, function(index, val) {
		// as it iterates through the array it passes "this" object to the function
		showModal($(this));
	});
}

function hideModalSetup () {
	// loop through all of the section.modal sections and setup the close modal button
	
	var $modals = $('section.modal');

	$.each($modals, function(index, val) {
		hideModal($(this));
	});

}


// PLANET ORBIT FUNCTIONS  ------------------------------------------------

function pausePlayOrbits () {

	$(window).on('click', function(event) {
		event.preventDefault();
		switch(orbitPauseStatus) {
			case false:
				// pause all orbits when the window is clicked and the var orbitPauseStatus is false
				orbitArray1.forEach(function(element, index){
					element.pause();
				});
				orbitPauseStatus = true;
				break;
			case true:
				// turn on all orbits when the window is clicked and the var orbitPauseStatus is true
				orbitArray1.forEach(function(element, index){
					element.play();
				});
				orbitPauseStatus = false;
				break;
		}
	});

	
}

function mercuryOrbit1 () {
	// target the planet
	var $planetTarget = $('section.planetThumbs section.mercury');
	console.log("This is the planet we're targeting %s",$planetTarget);

	mercuryOrbit.to($planetTarget,mercuryOrbitSpeed,{rotationY:360, perspective: 200, transformOrigin:mercury_transform_origin, ease: Linear.easeNone});

	mercuryOrbit.play();
}

function venusOrbit1 () {
	// target the planet
	var $planetTarget = $('section.planetThumbs section.venus');
	console.log("This is the planet we're targeting %s",$planetTarget);

	venusOrbit.to($planetTarget,venusOrbitSpeed,{rotationY:360, transformOrigin:venus_transform_origin, ease: Linear.easeNone});

	venusOrbit.play();
}

function earthOrbit1 () {
	// target the planet
	var $planetTarget = $('section.planetThumbs section.earth');
	console.log("This is the planet we're targeting %s",$planetTarget);

	earthOrbit.to($planetTarget,earthOrbitSpeed,{rotationY:360, transformOrigin:earth_transform_origin, ease: Linear.easeNone});

	earthOrbit.play();
}

function marsOrbit1 () {
	// target the planet
	var $planetTarget = $('section.planetThumbs section.mars');
	console.log("This is the planet we're targeting %s",$planetTarget);

	marsOrbit.to($planetTarget,marsOrbitSpeed,{rotationY:360, transformOrigin:mars_transform_origin, ease: Linear.easeNone});

	marsOrbit.play();
}

function jupiterOrbit1 () {
	// target the planet
	var $planetTarget = $('section.planetThumbs section.jupiter');
	console.log("This is the planet we're targeting %s",$planetTarget);

	jupiterOrbit.to($planetTarget,jupiterOrbitSpeed,{rotationY:360, transformOrigin:jupiter_transform_origin, ease: Linear.easeNone});

	jupiterOrbit.play();
}

// helper function
// currently inactive
function setOrbits1 (planetTargetItem,orbitArrayItem) {
	// STATUS:  work in progress
	//where planetTargetItem is a jQuery object
	var $planetTarget = planetTargetItem;
	console.log("This is the planet we're targeting %s",$planetTarget);

	orbitArrayItem.to($planetTarget,5,{rotationY:360, rotationX:45, transformPerspective:200, transformOrigin:"50% 50% -500", ease: Power0.easeIn});

	orbitArrayItem.play();
}

// // END PLANET ORBIT FUNCTIONS ------------------------------------------------




// HELPER FUNCTIONS  ------------------------------------------------

// using a unique ID for acquiring target data from the planet may be more efficient and less complex than having to extract strings

function showModal (targetE) {
	var $target = $(targetE);
	$target.on('click', function(event) {

		// prevent this from activating any actions tied to the window object... i.e. $(window)
		event.stopPropagation();

		var $thisItem = $(this);
		event.preventDefault();

		// WARNING:  make section.modalBoxes visible because right now it's behind the planets layer
		$('section.modalBoxes').show('slow').css('z-index', '50');
		// $('section.modalBoxes').show('scale').css('z-index', '50');

		// retrieve the class name of the clicked element
		var className = $thisItem.attr('class');
		console.log('The class name of the clicked element is', className);
		
		// remove the class name planet from the array
		className = className.split(" ");
		// var indexNum = className.indexOf('parent');
		// className.splice(indexNum, 1);
		var removeItem = "planet";
		className = jQuery.grep(className,function (value) {
			// return the value as long as it doesn't match the item we want removed
			// How to remove specifc value from array using jQuery -- https://stackoverflow.com/questions/3596089/how-to-remove-specifc-value-from-array-using-jquery
			return value != removeItem;
		});
		// console.log('The class name of the clicked element is', className);
		// convert the array back into a string
		className = className.toString();
		console.log('The class name of the clicked element is', className);

		// create a reference to the correct modal box
		// we want this to be a jQuery ready reference so add the periods to target section.modal.planetName
		// var modalName = "'" + ".modal" + "." + className + "'"; // this syntax build is wrong
		var modalName = ".modal" + "." + className;
		console.log('The target modal name is %s', modalName);

		$(modalName).css('display', 'flex');

	});
}

function hideModal (targetE) {
	// since the modals are not dynamically generated we can set up the event handler early on with or without event delegation
	// targetE can be the entire section.modal and we can drill down for the close button

	var $target = $(targetE);
	console.log('Target element is', $target);

	$target.on('click', 'span.fa.fa-close', function(event) {
		event.preventDefault();

		// prevent this from activating any actions tied to the window object... i.e. $(window)
		event.stopPropagation();

		// WARNING:  make section.modalBoxes invisible and hidden because right now it's blocking access to the planet layer preventing you from being able to click any more planets
		$('section.modalBoxes').hide('fast').css('z-index', '-10');


		// on click go up to the parent and change its css property to display none so it vanishes
		$(this).parents('section.modal').css('display', 'none');
	});

}

// // END HELPER FUNCTIONS ------------------------------------------------



//////////////////////////////////////////////////
// EXECUTION CODE

// modals
showModalSetup();
hideModalSetup();

// orbits
mercuryOrbit1();
venusOrbit1();
earthOrbit1();
marsOrbit1();
jupiterOrbit1();
pausePlayOrbits();

// testing
// showModal('section.planet.mercury');
// hideModal('section.planet.mercury span.fa');
// console.log($('.modal.mercury'));

//////////////////////////////////////////////////

});  //end doc.onready function
