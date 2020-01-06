var h1 = document.querySelector("h1");
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var goalColor = pickcolor();

// variable to hold target color : 
var goalColorDisplay = document.getElementById("targetcolor");

//grab the onclick event :
var messageDisplay = document.getElementById("message");

var resetButton = document.querySelector("#reset");

var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");

easybtn.addEventListener("click",function(){
    h1.style.background = "steelblue";
    hardbtn.classList.remove("selected");
    easybtn.classList.add("selected");
    numSquares =3;
    colors = generateRandomColors(numSquares);
    goalColor = pickcolor();
    goalColorDisplay.textContent = goalColor;
    for(var i=0; i<squares.length; i++){
        if (colors[i]){
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
});

hardbtn.addEventListener("click",function(){
    h1.style.background = "steelblue";
    goalColorDisplay.textContent = goalColor;
    hardbtn.classList.add("selected");
    easybtn.classList.remove("selected");
    numSquares= 6;
    colors = generateRandomColors(numSquares);
    goalColor = pickcolor();
    goalColorDisplay.textContent = goalColor;
    for(var i=0; i<squares.length; i++){
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }
    
});

//to change h1 text to goal color rgb value():
goalColorDisplay.textContent = goalColor;
var squares = document.querySelectorAll(".square");
for (var i=0; i<squares.length; i++){

    // Assign Colors to square divs:
    squares[i].style.backgroundColor = colors[i];

    //Add click listners to squares :
    squares[i].addEventListener("click",function(){
        
    //  grab color of clicked square
    var clickedcolor = this.style.backgroundColor; 
    //compare color to picked color
    if (clickedcolor === goalColor){
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again";
        changeColors(clickedcolor);
        h1.style.backgroundColor = goalColor;
    }
    else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "try Again";
    }
    })
}

//change colors of squares when clicked right :
function changeColors(color){
    h1.style.background = "steelblue";
    for(var i=0; i<squares.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}
function pickcolor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    arr =[];
    for(var i=0; i<num; i++){
        arr.push(randomcolor());
    }
    return arr;
}
// generating and returning three random colours rgb:
function randomcolor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" +r+ ", "+g+", "+b+")";
}
resetButton.addEventListener("click",function(){
    h1.style.background = "steelblue";
    colors = generateRandomColors(numSquares);
    goalColor = pickcolor();
    goalColorDisplay.textContent = pickcolor();
    this.textContent = "New Colors";
    messageDisplay.textContent = "";
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
});