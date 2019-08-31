$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    //Pass the array, *the search button* and the 
    //div called buttons area. WHAT'S THE SEARCHBUTTON??
    // It's a generic name for the buttons displayed
    // with the name of each animal on the HTML. You need this because when
    // setting the API call, you need a re-usable way to reference 
    // to these buttons, so you can set a function that works for all of em. 
    console.log("page loaded");
    //Then console log this, so I know the arguments are passing fine
})

//This will be the animals array
var searchArray = ['Cat', 'Dog', 'Bird', 'Horse', 'Panther', 'Elephant', 'Squirell', 'Capybara', 'Duck', 'Monkey', 'Camel', 'Snake', 'Panda'];

//When invoking populateButtons, pass as arguments: 
//The array, class to add, and area to add to
function populateButtons(searchArray,classToAdd,areaToAddTo){
    //empty the user input field
    $(areaToAddTo).empty();
    //You can use console log to see it happen 
    //console.log('hi');
    //for each item on the array with animals
    for(var i=0;i<searchArray.length;i++){
        //put a button on the html
        var a = $('<button>');
        //name this button's class the following: classToAdd
        a.addClass(classToAdd);
        //the type of data should be equal to 
        //the item you are itearing on the array 
        //(a string of an animal, basically)
        a.attr('data-type', searchArray[i]);
        //The text you'll display, should also equal to
        //the item you are iterating on the array
        a.text(searchArray[i]);
        //Grab area to add to, and glue it at the end of 
        //this button - This will show below
        $(areaToAddTo).append(a);
    }
}

//This function can tell what data we are storing (based on 
//what the user clicks). This is how you modify the API call.
//On the document, when either one of the animal buttons is clicked
//*Remember that searchButton is the generic name to refer to all of these*
$(document).on('click', '.searchButton', function(){
    //make a variable called type, when and equal it 
    //to the same type of the button that was clicked
    var type = $(this).data('type');
    console.log(type);   
    //If you uncomment/comment this, you'll see the type 
    //after each time you click on an animal

    //With this below, whenever I click on one of the animal 
    //buttons, it should return an object with a data array that 
    //contains the top 10 gifs related to the data type that is 
    //stored on the button I/the user clicks
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=8ydzDeZ6zw220SyngrbBmA3O4lGq4Mnv&limit=10'
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response) {
            console.log(response);
            for(var i=0;i<response.data.length;i++){
            //Looping through the data array that we 
            //got as a response from the API call
            var searchDiv = $('<div class="search-item">');
            //Create a reference/variable for this new 
            //div that will be modified
            var rating = response.data[i].rating;
            //Then, store the rating of the gif. *Remember, you have  
            //to dot notation because .rating belongs to an object!!* 
            var p = $('<p>').text('Rating: '+rating);
            //reference a paragraph tag, and contain the text of rating,
            var animated = response.data[i].images.fixed_height.url;
            //Go to the referenced index of the response array, and
            //then to the animated version of that gif, and store it on 'animated'
            var still = response.data[i].images.fixed_height_still.url;
            //Same as above, but this time, collect the still version
            var image = $('<img>');
            //Make and store an img
            image.attr('src',still);
            //Grab this images we just saved, and give it the still attribute
            //NOTE: This is for naming purposes, but not the actual functionality
            //of setting the gif still
            image.attr('data-still',still);
            //Here's were you actually code the 'functionality' 
            //of displaying the gif's still version. You are 
            //giving this functionality to the variables
            //you stored above (still & animated) from the response array.
            //Please note that you'll actually use on the function below
            image.attr('data-animated',animated);
            //Now you do the same but with the animated version
            image.attr('data-state','still');
            image.addClass('searchImage');
            //add a class to searchImage, which is the generic name
            //to reference to the gif images displayed
            searchDiv.append(p);
            //Here we add the p (rating) at the end
            searchDiv.append(image);
            //here we add the gif image
            $('#searches').append(searchDiv);
            //Now images are posted on the screen
        }
    })
})


$(document).on('click','.searchImage', function(){
    //When the gif image is clicked
    var state = $(this).attr('data-state');
    //save the 'state' status (so I can act on it)
    if(state === 'still') {
        //if the state is still, then
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
        //switch the source as well as the state to animated
        //on that specific gif
    } else {
        //otherwise (if it ain't still, it can only be animated)
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
        //then switch both, the source as well as the state to animated
    }
})

$('#search-submit').click(function(){
    event.preventDefault();
    //Prevent the default form action for Ajax form submissions
    //You need this, considering that this is a submition form
    var newSearch = $('input').eq(0).val();
    //this will grab the users new search (on search box) and add 
    //it to the newSearch variable. eq(0) is looking for input
    searchArray.push(newSearch);
    //include on the array the item that the user just wrote
    populateButtons(searchArray, 'searchButton','#buttonsArea');
    //invoke this function, so that it populates a button named 
    //the same string that the user just searched for 
    return false;
    //return false to prevent the page from re-loading
})

// TA-DA!