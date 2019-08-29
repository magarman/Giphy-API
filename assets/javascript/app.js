$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("page loaded");
})

var searchArray = ['Cat', 'Dog', 'Bird', 'Horse', 'Panther', 'Elephant', 'Squirell', 'Capybara', 'Duck', 'Monkey', 'Camel', 'Snake', 'Panda'];

//This function takes as arguments the animals array, class to add and area to add to
function populateButtons(searchArray,classToAdd,areaToAddTo){
    //empty the user input field
    $(areaToAddTo).empty();
    console.log('a');
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
        console.log('b');
    }
}

//This function can tell what data we are storing (based on what the user clicks, this is how you modify the API call.
$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    console.log(type);   
    //If you uncomment/comment this, you'll see the type after each time you click on an animal

    //With this below, whenever I click on one of the animal buttons, it should return an object with a data array that contains the top 10 gifs related to the data type that is stored on the button I/the user clicks
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=8ydzDeZ6zw220SyngrbBmA3O4lGq4Mnv&limit=10'
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response) {
            console.log(response);
            //Looping through the data array
            for(var i=0;i<response.data.length;i++){
            //create a reference to the div that will be modified
            var searchDiv = $('<div class="search-item">');
            //below, store the rating of the gif. Use dot notation because .rating belong to an object
            var rating = response.data[i].rating;
            //reference a paragraph tag, and contain the text of rating, 
            var p = $('<p>').text('Rating: '+rating);
            //the variables below are so that the code can collect the animated and the still version of the gifs and display them as applicable
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            //Below references to a string "still", not a URL
            image.attr('data-state','still');
            image.addClass('searchImage');
            //Here we add the p (rating)
            searchDiv.append(p);
            //here we add the gif image
            searchDiv.append(image);
            //Now images are posted on the screen
            $('#searches').append(searchDiv);
        }
    })
})


$(document).on('click','.searchImage', function(){
    var state = $(this).attr('data-state');
    //If the gif is still
    if(state === 'still') {
        //change it's attribute to animated
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})

$('#search-submit').click(function(){
    event.preventDefault();
    //this will grab the users new search (on search box) and add it to the newSearch variable. eq(0) is looking for input
    var newSearch = $('input').eq(0).val();
    //to add this into our search array
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton','#buttonsArea');
    //return false to prevent the page from re-loading
    return false;
})
