// Quote API Categories
var path = "./assets/images/";

var categories = ["inspire", "management", "sports", "life", "funny", "love", "art", "students"];

var yodaImages = ["yoda1.jpeg","yoda2.jpeg", "yoda3.jpeg", "yoda4.jpeg", "yoda5.jpeg", "yoda6.jpeg"];// ****** TASK Create array of photos, find photos to use in case quote api does not provide us with a background

// var quoteBoxImages = ["inspireImage1.jpeg","inspireImage2.jpeg", "inspireImage3.jpeg", "inspireImage4.jpeg", "inspireImage5.jpeg", "inspireImage6.jpeg", "inspireImage7.jpeg"]

var quoteImage = "defaultQuote.jpg";

var yodaRandom = Math.floor(Math.random() * yodaImages.length);
console.log(yodaRandom);

// var quoteBoxRandom = Math.floor(Math.random() * quoteBoxImages.length);
// console.log(quoteBoxRandom);

var quote;

var uid;

// Quote API
function quotes(categoryName) {
    var api = "https://quotes.rest/qod?"
    var type = "category="

    var quotesURL = api + type + categoryName.toLowerCase();
    console.log(quotesURL);
    

    yodaRandom = Math.floor(Math.random() * yodaImages.length);
    $("#yodaImage").css("background-image", "url(" + path + yodaImages[yodaRandom] +")");

    try {
        $.ajax({
            url: quotesURL,
            method: "GET"
        }).then(function(response) {
            var author = response.contents.quotes[0].author;
            var backgroundQuote = response.contents.quotes[0].background;
            var quote = response.contents.quotes[0].quote;


            console.log(author);
            console.log(quote);

            if (backgroundQuote == null ) {
                backgroundQuote = path + quoteImage;
            }
            

            yoda(author, quote, backgroundQuote);
        });
    }
    catch(error) {
        console.log(error);
    }
    // if (quote==null) {
    //     author = "A message from the Team";
    //     quote = "Inspiring quote reserves are running low. Try creating your own!"; 
    //     yoda(author, quote, null);
    // }
}

// Yoda API
function yoda(author, quote, backgroundQuote) {
    
    var yodaURL = "https://api.funtranslations.com/translate/yoda.json?text=" + quote;
    try{
        $.ajax({
            url: yodaURL,
            method: "GET"
        }).then(function(response) {
            
            var yodaText = response.contents.translated;

            $("#authorName").text(author);
            $("#authorQuote").text(quote);
            $("#yodaQuote").text(yodaText);
            $("#yoda").text("Yoda");
            $("#authorImage").css("background-image", "url(" + backgroundQuote +")");
            
        });
        
    }
    catch(error) {
        console.log(error)
    }
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGsAlCfAQE1OF6vmxsh2i5B-PYrhvGiVA",
    authDomain: "project-yoda-d3e6f.firebaseapp.com",
    databaseURL: "https://project-yoda-d3e6f.firebaseio.com",
    projectId: "project-yoda-d3e6f",
    storageBucket: "project-yoda-d3e6f.appspot.com",
    messagingSenderId: "56017250700"
};

firebase.initializeApp(config);

var database = firebase.database();

// Get current User
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in
        var email = user.email;
        // *********** Below will get user Favorites from Firebase
        uid = user.uid;
        
        $("#userName").text(email);
        database.ref(uid).on("child_added", function(childSnapshot) {
            
            var getFavoriteAuthor = childSnapshot.val().author;
            var getFavoriteQuote = childSnapshot.val().quote;
            var getKey = childSnapshot.key;
            

     
                 
                        // Create the new row
                        //add IDs to both getFavorite quote and yoda quote
                        // hide yodaquote at start 
                        // add button to each row ; adding actual quote isible by default and button is visible 4 items but only able to see 3
                        // event listener to button that when its pressed changes display properties of either the yoda or the favorite 
                

            var newRow = $("<tr>").append(
                
                $("<td id='author_" + getKey + "'>").text(getFavoriteAuthor),
                // button same class unique ID
                
                $("<td id='quote_" + getKey + "'>" ).text(getFavoriteQuote),
                $("<button id='button_" + getKey + "' class='1btn' >").text("To Yoda"),
                $("<button id='delete_" + getKey + "' class='deleteButton' >").text("Remove Favorite")
                // yoda button

            );
             

            // Append the new row to the table
            $("#favoriteQuotes > tbody").append(newRow); 
                    
            
        });
        $("#loginContainer").hide();        
        $("#registerContainer").hide();
        $("#nofavoritesContainer").hide();
        $("#favoritesContainer").show();
        $("#logoutContainer").show();
        $("#favoriteButton").show();
    } else {
        // User is signed out.
        $("#loginContainer").show();
        $("#registerContainer").show();
        $("#nofavoritesContainer").show();
        $("#favoritesContainer").hide();
        $("#logoutContainer").hide();
        $("#favoriteButton").hide();
    }
});


// yoda favorite button
$(document).on("click", ".1btn", function(event) {
event.preventDefault();
var key = this.id.split("button_")[1];
var getFavoriteQuote = $("#quote_" + key).text();
var getAuthor = "";
    console.log(getFavoriteQuote);

    yoda(getAuthor, getFavoriteQuote, null);

});

// delete button 
$("#favoriteQuotes").on('click', '.deleteButton', function () {
    $(this).closest('tr').remove();
    
        
                var getfavoriteQuote = firebase.database().ref(uid);
                getFavoriteQuote.remove()
            }
            )
    

    // database.ref(uid).push({
  

// // Clear

function clear() {
    localStorage.clear();
    sessionStorage.clear();
    Session.abondon();
}

// Initialize Everything
function InitializeWindow() {
    for (var i=0; i<categories.length; i++) {
        // var tableRow =  $("<tr>");
        var tableItem = $("<li>");
        var categoriesButton = $("<button>");
        categoriesButton.css("outline", "0");
        categoriesButton.addClass("categoriesButton");
        categoriesButton.attr("id", i);
        categoriesButton.text(categories[i].toUpperCase());
        // tableRow.append(tableItem);
        tableItem.append(categoriesButton);
        $("#quoteCategories").append(tableItem);
        
        $("#authorImage").css("background-image", "url(" + path + quoteImage +")");
        $("#yodaImage").css("background-image", "url(" + path + yodaImages[yodaRandom] +")");
    }
}

// Login Form
$(function() {
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});

// Register Form
$(function() {
    var button = $('#registerButton');
    var box = $('#registerBox');
    var form = $('#registerForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#registerButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});




$(document).on('click','#topnavleft', function() {
    var categoryName = $(this).text();
    quotes(categoryName);
});



//On Enter - Translate what is typed into textbox
$("#userQuote").keypress(function(event) {
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        

        yoda(null, $("#userQuote").val(), null);      
    }
});




// On Click - Search for Category from Button
$(document).on('click','.categoriesButton', function() {
    var categoryName = $(this).text();
    quotes(categoryName);
});

    

// On Click - Add to Favorite
$(document).on('click','#favoriteButton', function() {
    var authorFavorite = $(authorName).text();
    var quoteFavorite = $(authorQuote).text();
    if (authorFavorite != "" && quoteFavorite != "") {
        database.ref(uid).push({
            author: authorFavorite,
            quote: quoteFavorite,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }
});

// Login Link
$("#login").on("click", function(event) {
    event.preventDefault();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
    });
});

// Register Link
$("#register").on("click", function(event) {
    event.preventDefault();
    var email = $("#emailRegister").val().trim();
    var password = $("#passwordRegister").val().trim();
    console.log(email);
    console.log(register);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
      });
});

// Logout Link
$("#logoutButton").on("click", function(event) {
    event.preventDefault();
    firebase.auth().signOut().then(function() {
        clear();
    }).catch(function(error) {
        console.log(error);
    });
}); 

// Everything starts here
window.onload = function() {
    InitializeWindow();
}
     
  
