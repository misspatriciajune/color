var squares = document.querySelectorAll(".square");			
var guessColor = document.getElementById("guessColor");	
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var levelButtons = document.querySelectorAll(".level");


var squareCount = 6;	
var colors = [];
var pickedColor;	//color to be guessed

init();		//call init()

function init(){
	setLevel();		//Call to set the level(easy or hard)
	formSquares();	//Call to decide if the clicked square is correct
	reset();		//Call to reset the game board
}

function setLevel(){	//set the levels(easy and hard)
	for(var i = 0; i < levelButtons.length; i++){
		levelButtons[i].addEventListener("click", function(){		//add click listeners to level buttons
			levelButtons[0].classList.remove("selected");	
			levelButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? squareCount = 3: squareCount = 6;	//if easy is clicked, make it 3 squares, else make it 6(hard)
			reset();
		});
	}
}

function formSquares(){		//decides whether the correct square is selected by comparing the colors
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){	//add click listeners to each squares
			var colorSelected = this.style.background;	//get the color of the square that is clicked

			//compare if the color clicked matches the color to be guessed
			if(colorSelected === pickedColor){		//if correct 
				messageDisplay.textContent = "Correct!";	
				resetButton.textContent = "Play Again?";
				changeColors(colorSelected);
				h1.style.background = colorSelected;
			} else {	//if incorrect
				this.style.background = "black";	//change square color to black to match the background
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset(){	//reset the game board
	colors = generateRandomColors(squareCount);		//calls generateRandomColors() to form the set of random colors
	pickedColor = colorToGuess();	//calls colorToGuess() to select the random color to be guessed
	
	guessColor.textContent = pickedColor;		//change the color with the picked color
	resetButton.textContent = "New Colors"	
	messageDisplay.textContent = "";
	
	for(var i = 0; i < squares.length; i++){	
		if(colors[i]){	
			squares[i].style.display = "block";		//show the square if correct
			squares[i].style.background = colors[i]; //change the colors of squares
		} else {
			squares[i].style.display = "none";	//hide the square if incorrect
		}
	}
	h1.style.background = "darkgray";	//default color
}

function randomColor(){		//create random color
	var r = Math.floor(Math.random() * 256);	//red
	var g = Math.floor(Math.random() * 256);	//green
	var b = Math.floor(Math.random() * 256);	//blue

	return "rgb(" + r + ", " + g + ", " + b + ")";		//return the random color
}

function generateRandomColors(num){		//create an array of random colors
	var arrRandomColor = [];	//array of random colors

	for(var i = 0; i < num; i++){
		arrRandomColor.push(randomColor());	//push the random color inside the array
	}
	return arrRandomColor;	//return the array of random colors
}

function colorToGuess(){	//pick the color to be guessed
	var random = Math.floor(Math.random() * colors.length);	//get random color from the array of random colors
	return colors[random];	//return the random color to be guessed
}

function changeColors(color){	//change the color of the squares 
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;	//change the color of each square with the color given
	}
}

resetButton.addEventListener("click", function(){	//reset the game everytime the reset button is clicked
	reset();	//call the reset function
});
