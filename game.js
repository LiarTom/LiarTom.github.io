const textElement = document.getElementById('text') /* Assign the element #text to textElement for manipulation */
const choicesElement = document.getElementById('choices') /* Assign the #choices element to choicesElement for manipulation */

/*Define*/
let inventory = {}
let hp = 100
let strength = 100
let updateText= ''
let updateImage= ''
 
/* Set hp and strength by default, inventory empty and starts the game with the first text node */
function startGame() {
	document.getElementById("hp").innerHTML = "HP: " + hp
	document.getElementById("strength").innerHTML = "Strength: " + strength
	document.getElementById('currentImage').src = 'Mansion.jpg'
	inventory = {}
	showTextNode(1)
}

/* Shows the current text node after receiving the relative index */
function showTextNode(textNodeIndex) {
	
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) 	/* Assigns the current text node from list to textNode for display */
	textElement.innerText = textNode.text  	/* Inserts the text from current node into the #text html element */
	
	/* While loop removes all the options buttons so that we can add them as many as needed later for each node */
	while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild) 
  }

/* Creates the buttons with the relative options */
textNode.options.forEach(option => {
    const button = document.createElement('button')
    button.innerText = option.text /* Inserts text in each button for each option available */
    button.classList.add('choice')
    button.addEventListener('click', () => selectOption(option)) /* Adds event listener to button and links it to the selectOption() function*/
    choicesElement.appendChild(button) /* Insert the button in the choices div */
  }
 )
}

/* Function to set new text and options after selecting an option */
function selectOption(option) {
  const nextTextNodeId = option.nextText /* Set nextTextNodeId to contain the text for the next step*/
  
  /* Check if the text ID is negative, which is only held by "restart" options when game is over, restarts the game and resets stats */
  if (nextTextNodeId <= 0) {
    return startGame()
	var hp= 100
	var strength = 100
  }
  
  /* inventory = Object.assign(inventory, option.setState) */
  showTextNode(nextTextNodeId) /* Call showTextNode() function to pass onto the next node */
  hp = option.setHP /* Update hp value after choosing an option */
  updateText = option.setUpdate /* Update text value after choosing an option */
  updateImage = option.setImage /* Update image after choosing an option */
  
  /* Rewrite values into the HP and strength sections, feedback log and new image*/
  document.getElementById("hp").innerHTML = "HP: " + hp
  document.getElementById("strength").innerHTML = "Strength: " + strength
  document.getElementById("info").innerHTML =  "" + updateText
  document.getElementById('currentImage').src = updateImage
  
}


/* List with nodes. Each node will have ID, explanation text and 1 to 4 possible options that can link to different nodes or end the game. 
Each option can also modify the HP/strength value and/or add items to inventory*/
const textNodes = [
  {
    id: 1,
    text: 'question 1',
    options: [
      {
        text: 'option 1',
		setHP: 80,
        nextText: 2,
		setUpdate: 'You lost 20 HP!',
		setImage: 'test.jpg'
      },
      {
        text: 'option 2',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'question 2',
    options: [
      {
        text: 'option 1',
        nextText: 3,
		setHP: 100,
		setUpdate: 'You gained 20hp',
		setImage: 'Mansion.jpg'
      },
      {
        text: 'option 2',
        nextText: 3
      },
      {
        text: 'option 3',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'question 3',
    options: [
      {
        text: 'option 1',
        nextText: 4
      },
      {
        text: 'option 2',
        nextText: 5
      },
      {
        text: 'option 3',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'stop 1',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'stop 2',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Question 6',
    options: [
      {
        text: 'option 1',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'question 7',
    options: [
      {
        text: 'option 1',
        nextText: 8
      },
      {
        text: 'option 2',
        nextText: 9
      },
      {
        text: 'option 3',
        nextText: 10
      },
      {
        text: 'option 4',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'stop 3',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'stop 4',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'stop 5',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'win',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

/* Start the game */
startGame();