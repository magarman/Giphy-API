$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("page loaded");
})

var searchArray = ['Dog', 'Cat', 'Bird'];

//This function takes as arguments the animals array, class to add and area to add to
function populateButtons(searchArray,classToAdd,areaToAddTo){
    //empty the user input field
    $(areaToAddTo).empty();
    //for each item on the array with animals
    for(var i=0;i<searchArray.length;i++){
        //grab the button 
        var a = $('<button>');
        //add the class to it
        a.addClass(classToAdd);
        //give it an attribute of data type 
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

//This function can tell what data we are storing (based on what the user clicks, this is how you modify the API call.
$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    //console.log(type);   -- If you uncomment this, you'll see the type after each time you click on an animal

    //With this below, whenever I click on one of the animal buttons, it should return an object with a data array that contains the top 15 gifs related to the data type that is stored on the button I/the user clicks
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=8ydzDeZ6zw220SyngrbBmA3O4lGq4Mnvlimit=15'
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response) {
            console.log(response);
            //Looping through the data array
            for(var i=0;i<response.data.length;i++)
            //create a reference to the div that will be modified
            var searchDiv = $('<div class="search-item">');
            //below, store the rating of the gif. Use dot notation because .rating belong to an object
            var rating = response.data[i].rating;
            //reference a paragraph tag, and contain the text of rating, 
            var p = $('<p>').text('Rating: '+rating);
            //the variables below are so that the code can collect the animated and the still version of the gifs and display them as applicable
            //var animated = 
            //var still = 
        })
})