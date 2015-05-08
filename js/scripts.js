jQuery(document).ready(function($) {

//////////////////////////////////////////////////
// GLOBAL VARIABLES


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

// HELPER FUNCTIONS  ------------------------------------------------

function showModal (targetE) {
	var $target = $(targetE);
	$target.on('click', function(event) {

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

		// WARNING:  make section.modalBoxes invisible and hidden because right now it's blocking access to the planet layer preventing you from being able to click any more planets
		$('section.modalBoxes').hide('fast').css('z-index', '-10');


		// on click go up to the parent and change its css property to display none so it vanishes
		$(this).parents('section.modal').css('display', 'none');
	});

}

// // END HELPER FUNCTIONS ------------------------------------------------



//////////////////////////////////////////////////
// EXECUTION CODE

showModalSetup();
hideModalSetup();

// testing
// showModal('section.planet.mercury');
// hideModal('section.planet.mercury span.fa');
// console.log($('.modal.mercury'));

//////////////////////////////////////////////////

});  //end doc.onready function
