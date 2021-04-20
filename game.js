/* https://www.youtube.com/watch?v=R1S_NhKkvGA&ab_channel=WebDevSimplified gave me lots of ideas to build this code, mainly how to generate the buttons and the list containing all nodes for the game. A copy of the original parts can be found at this GitHub repository: https://github.com/WebDevSimplified/JavaScript-Text-Adventure */


const textElement = document.getElementById('text') /* Assign the element #text to textElement for manipulation */
const choicesElement = document.getElementById('choices') /* Assign the #choices element to choicesElement for manipulation */

/*Define*/
let inventory = {}
var hp = 100
var strength = 100
let updateText = ''
let updateImage = ''
let teamMembers = 4
 
/* Set hp, strength and teamMembers by default, updateText empty and starts the game with the first text node and image*/
function startGame() {
	document.getElementById("hp").innerHTML = "HP: " + hp
	document.getElementById("strength").innerHTML = "Strength: " + strength
	document.getElementById("team").innerHTML = "Team: " + teamMembers
	document.getElementById("info").innerHTML =  "" + updateText
	document.getElementById('currentImage').src = 'Mansion.png'
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
    button.classList.add('choice') /* Adds class choice to buttons */
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
	hp = 100
	strength = 100
	teamMembers = 4
	updateText = ''
    return startGame()
  }

  /* Update all values after choosing an option */
  hp = hp - option.setHP 
  strength = strength - option.setStrength 
  teamMembers = teamMembers - option.membersLost 
  
  showTextNode(nextTextNodeId) /* Call showTextNode() function to pass onto the next node */
  
  /* End the game if HP reach 0, also sets to 0 to not show negative values*/
  if (hp == 0 || hp < 0) {
	hp = 0
	showTextNode(99)
  }
  
  /*sets to 0 to not show negative values*/
  if (strength < 0) {
  strength = 0
  }
  
  /*sets to 0 to not show negative values*/
  if (teamMembers < 0) {
	teamMembers = 0
  }
  
  updateText = option.setUpdate /* Update text value after choosing an option */
  updateImage = option.setImage /* Update image after choosing an option */

  
  /* Rewrite values into the HP and strength sections, feedback log and new image*/
  document.getElementById("hp").innerHTML = "HP: " + hp
  document.getElementById("strength").innerHTML = "Strength: " + strength
  document.getElementById("info").innerHTML =  "" + updateText
  document.getElementById("team").innerHTML = "Team: " + teamMembers
  document.getElementById('currentImage').src = updateImage
}


/* List with nodes. Each node will have ID, explanation text and 1 to 4 possible options that can link to different nodes or end the game. 
Each option can also modify the HP/strength value and/or add items to inventory*/
const textNodes = [
  {
    id: 1,
    text: 'Welcome! Around 10am a group of terrorist kidnapped the son of the president and hid inside the mansion that you can see in the picture. Your job is to infiltrate the mansion and rescue him. We will send four of our best men to help you in this task. Keep in mind that the terrorist will show no mercy. Can you do it?',
    options: [
      {
        text: 'Yes!',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MansionEntrances.png',
		nextText: 2
		

      },
    ]
  },
  {
    id: 2,
    text: 'Great! The mansion has 3 possible entrances: One for the staff on the left (L),  the main entrance for visitors (M), and one on the right, close to the garden, that is normally used after landing the helicopter (R). Which one will you choose to begin the mission?',
    options: [
      {
        text: 'Left entrance (L)',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
        nextText: 3,
		setImage: 'LeftEntrance.png'
      },
      {
        text: 'Main entrance (M)',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallEntrance.png',
        nextText: 4
      },
      {
        text: 'Right entrance (R)',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'RightEntrance.png',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: ' You have a long corridor on your right that ends with a door on the left, and a door on your left that seems to link to a hall. The terrorists must be in the inner parts of the mansion, as you cannot hear a sound from here.',
    options: [
      {
        text: 'Go left',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'smallHallLowerEntrance.png',
        nextText: 6
      },
      {
        text: 'Follow the corridor',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'LeftEntranceRightSide.png',
        nextText: 7
      },
    ]
  },
  {
    id: 4,
    text: 'You are in the main hall. There is a big flight of steps that leads upstairs and there is a door on the right and a door on the left. You can hear some footsteps behind the one on the left',
    options: [
      {
        text: 'Move towards the door on the left',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpLeft.png',
        nextText: 10
      },
	  {
        text: 'Go Upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'Enter the room on the right.',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'RightEntranceFromHall.png',
        nextText: 18
      }
    ]
  },
  {
    id: 5,
    text: 'You enter a room full of equipment used for helicopter flights. There seems to be a small room on the left, and you can see a Hall through the door in front of you.',
    options: [
      {
        text: 'Move towards the door on the left',
		setHP: 30,
		setStrength: 35,
		setUpdate: 'Surprise attack!',
		membersLost: 2,
		setImage: 'RightEntranceKill.png',
        nextText: 16
      },
	  {
        text: 'Go to the hall',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpRight.png',
        nextText: 17
      },
    ]
  },
  {
    id: 6,
    text: 'You find yourself in a small Hall. There is a door on the opposite end of the hall, but you can hear some footsteps behind that door. On your left there are stairs to either go to the upper floor or to the lower.',
    options: [
      {
        text: 'Go downstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'warehouse.png',
        nextText: 8
      },
	  {
        text: 'Go Upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'Go towards the door',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'smallHallUpperEntrance.png',
        nextText: 10
      }
    ]
  },
  {
    id: 7,
    text: 'There is a door at the end, you can hear footsteps and the voices of at least 4 terrorists coming from behind it.',
    options: [
      {
        text: 'Go back to the opposite side of the corridor',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'smallHallLowerEntrance.png',
        nextText: 6
      },
      {
        text: 'Enter inside the room and fight the terrorists',
		setHP: 40,
		setStrength: 30,
		setUpdate: 'Hp lost: 40 | Strength decreased by: 30 | Team members lost: 2',
		membersLost: 2,
		setImage: '4Terroristsroom.png',
        nextText: 15
      }
    ]
  },
  {
    id: 8,
    text: 'You find a small warehouse. There is nothing here except some cool paintings and vintage books.',
    options: [
      {
        text: 'Go back',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'smallHallLowerEntrance.png',
        nextText: 6
      }
    ]
  },
  {
    id: 9,
    text: 'You are upstairs. There is a long corridor and 3 different doors: one is immediately to your right (1), one is a bit further (2) and the last one is at the end of the corridor (3). The hostage must be in one of these Rooms.',
    options: [
      {
        text: 'Go to door (1)',
		setHP: 70,
		setStrength: 50,
		setUpdate: 'A surprise attack! Hp lost: 70 | Strength decreased by: 50 | Team members lost: All',
		membersLost: 7,
		setImage: 'SurpriseAttack.png',
        nextText: 20
      },
	  {
        text: 'Go to door (2)',
		setHP: 0,
		setStrength: 0,
		setUpdate: 'Hostage Found!',
		membersLost: 0,
		setImage: 'Rescue.png',
        nextText: 21
      },
	  {
        text: 'Go to door (3)',
		setHP: 999,
		setStrength: 999,
		setUpdate: 'You were surrounded! Game over.',
		membersLost: 999,
		setImage: 'Surrounded.png',
        nextText: 98
      }
    ]
  },
  {
    id: 10,
    text: 'As you approach the door, you hear one of the terrorists speak through a radio. The sound is not very clear, but you were able to hear that the hostage is on the upper floor, and that he is well protected, but there will be a change of guards soon. He then leaves the radio and you can hear him coming towards your door.',
    options: [
      {
        text: 'Leave the door and head upstairs before he finds you',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'Enter the room and face the terrorist head on',
		setHP: 15,
		setStrength: 10,
		setUpdate: 'Hp lost: 15 | Strength decreased by: 10 | Team members lost: 1',
		membersLost: 1,
		setImage: '1TerroristroomKill.png',
        nextText: 11
      },
	  {
        text: 'Wait until he opens the door and surprise attack him',
		setHP: 0,
		setStrength: 20,
		setUpdate: 'Hp lost: 0 | Strength decreased by: 20 | Team members lost: 0',
		membersLost: 0,
		setImage: 'smallHallUpperEntranceKill.png',
        nextText: 12
      }
	  
    ]
  },
  {
    id: 11,
    text: 'You and the rest of your team enter the room and attack the terrorist, but he had a gun and managed to shoot one of the members of your team and kill him before you could stop him. Unfortunately, other terrorists have heard the shots and will probably come and check, so you have to move!',
    options: [
      {
        text: 'Go back and head upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'Run and leave through the door on the opposite side of the room',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpLeft.png',
        nextText: 14
      }
    ]
  },
  {
    id: 12,
    text: 'As soon as he enters the room you hit him from behind and make him lose conciousness. You then hide his body between some plants that decorate the wall, and the next room is now clear.',
      options: [
	  {
        text: 'Leave this hall and head upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'Enter the next room and check around you',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: '1Terroristroom.png',
        nextText: 13
      }
    ]
  },
  {
    id: 13,
    text: 'The only thing in this room is the radio. You could pick it up but decided not to because someone could hear you. There is a door on the opposite side of the room, it seems to link to a bigger hall.',
      options: [
	  {
        text: 'Go back and head upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
	  {
        text: 'leave through the door on the opposite side of the room',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpLeft.png',
        nextText: 14
      },
    ]
  },
  {
    id: 14,
    text: 'You are in the main hall. There is a big flight of steps that leads upstairs and there is a door on the right-side of the hall, it seems to be a room.',
      options: [
	  {
        text: 'Take the stairs to the next floor',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
	  {
        text: 'Reach the other side and enter that room',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'RightEntranceFromHall.png',
        nextText: 18
      },
	  
    ]
  }, 
  {
    id: 15,
    text: 'After a long fight, you were able to defeat the terrorists, but it came with a cost: you took some damage and lost some of your soldiers. There is only one door on the opposite side of the room.',
      options: [
	  {
        text: 'Go back to the corridor and move towards the other room',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'smallHallLowerEntrance.png',
        nextText: 6
      },
	  {
        text: 'Reach the other side and go through that door',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallDownLeft.png',
        nextText: 14
      },
	  
    ]
  }, 
  {
    id: 16,
    text: 'As soon as you reach the door one of the terrorists comes out and starts shooting! He must have heard you coming. You were able to neutralize him, but not before he could kill 2 of your soldiers and hit you on the shoulder.',
      options: [
	  {
        text: 'Go back and reach the hall',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpRight.png',
        nextText: 17
      },
	  {
        text: 'Sit and rest to heal a little bit risking to be found, then reach the hall',
		setHP: -20,
		setStrength: -20,
		setUpdate: 'Hp and streangth increased by 20.',
		membersLost: 0,
		setImage: 'MainHallUpRight.png',
        nextText: 17
      },
    ]
  }, 
  {
    id: 17,
    text: 'You are in the main hall. There is a big flight of steps that leads upstairs and there is a door on the left of the hall, it seems to be a room.',
      options: [
	  {
        text: 'Take the stairs to the next floor',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
	  {
        text: 'Move towards the door on the opposite side',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'MainHallUpLeft.png',
        nextText: 101
      },
	  
    ]
  }, 
  {
    id: 101,
    text: 'As you approach the door, you hear one of the terrorists speak through a radio. The sound is not very clear, but you were able to hear that the hostage is on the upper floor, and that he is well protected, but there will be a change of guards soon. He then leaves the radio and you can hear him coming towards your door.',
    options: [
      {
        text: 'Leave the door and head upstairs before he finds you',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
	  {
        text: 'Enter the room and face the terrorist head on',
		setHP: 15,
		setStrength: 10,
		setUpdate: 'Hp lost: 15 | Strength decreased by: 10 | Team members lost: 1',
		membersLost: 1,
		setImage: '1TerroristroomKill.png',
        nextText: 111
      },
	  {
        text: 'Wait until he opens the door and surprise attack him',
		setHP: 0,
		setStrength: 20,
		setUpdate: 'Hp lost: 0 | Strength decreased by: 20 | Team members lost: 0',
		membersLost: 0,
		setImage: 'MainHallUpLeftKill.png',
        nextText: 121
      }
	  
    ]
  },
  {
    id: 111,
    text: 'You and the rest of your team enter the room and attack the terrorist, but he had a gun and managed to shoot one of the members of your team and kill him before you could stop him. Unfortunately, other terrorists have heard the shots and will probably come and check, so you have to move!',
    options: [
      {
        text: 'Go back and head upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      }
    ]
  },
    {
    id: 121,
    text: 'As soon as he enters the room you hit him from behind and make him lose conciousness. You then hide his body between some plants that decorate the wall, and the next room is now clear.',
      options: [
	  {
        text: 'Leave this hall and head upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromLeft.png',
        nextText: 9
      },
    ]
  },
  {
    id: 18,
    text: 'You enter a room full of equipment used for helicopter flights. There seems to be a small room on the right',
    options: [
      {
        text: 'Enter that room',
		setHP: 30,
		setStrength: 35,
		setUpdate: 'Surprise attack!',
		membersLost: 2,
		setImage: 'RightEntranceKill.png',
        nextText: 19
      },
	  {
        text: 'Head back to the hall and go upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
    ]
  },
  {
    id: 19,
    text: 'As soon as you reach the door one of the terrorists comes out and starts shooting! He must have heard you coming. You were able to neutralize him, but not before he could kill 2 of your soldiers and hit you on the shoulder.',
      options: [
	  {
        text: 'Go back to the hall and go upstairs',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
	  {
        text: 'Sit and rest to heal a little bit risking to be found, then reach the hall and go upstairs',
		setHP: -20,
		setStrength: -20,
		setUpdate: 'Hp and streangth increased by 20.',
		membersLost: 0,
		setImage: 'UpperFloorFromHall.png',
        nextText: 25
      },
    ]
  },
  {
    id: 20,
    text: 'You and your team were hit and badly injured!',
      options: [
	  {
        text: 'Go back to the corridor',
		setHP: 0,
		setStrength: 0,
		setUpdate: '',
		membersLost: 0,
		setImage: 'UpperFloorAfterRoom.png',
        nextText: 22
      }, 
    ]
  },
  {
    id: 21,
    text: 'Congratulation! You have found and rescued the hostage!',
      options: [
	  {
        text: 'Play again!',
        nextText: -1
      }, 
    ]
  },
  {
    id: 22,
    text: 'You are back in the corridor, there is a door immediately to your right (1), and another one at the end of the corridor (2)',
      options: [
	  {
		text: 'Go to door (1)',
		setHP: 0,
		setStrength: 0,
		setUpdate: 'Hostage Found!',
		setImage: 'Rescue.png',
		membersLost: 0,
        nextText: 21
      },
	  {
        text: 'Go to door (2)',
		setHP: 999,
		setStrength: 999,
		setUpdate: 'You were surrounded! Game over.',
		membersLost: 999,
		setImage: 'Surrounded.png',
        nextText: 98
      }
    ]
  },
  {
    id: 25,
    text: 'You are upstairs. There is a long corridor and 3 different doors: one is immediately in front of you (1), one is on your left (2) and the last one is on your right (3). The hostage must be in one of these Rooms.',
    options: [
      {
		text: 'Go to door (1)',
		setHP: 0,
		setStrength: 0,
		setUpdate: 'Hostage Found!',
		membersLost: 0,
		setImage: 'Rescue.png',
        nextText: 21
      },
	  {
        text: 'Go to door (2)',
		setHP: 999,
		setStrength: 999,
		setUpdate: 'You were surrounded! Game over.',
		membersLost: 999,
		setImage: 'Surrounded.png',
        nextText: 98
      },
	  {
        text: 'Go to door (3)',
		setHP: 70,
		setStrength: 50,
		setUpdate: 'A surprise attack! Hp lost: 70 | Strength decreased by: 50 | Team members lost: All',
		membersLost: 7,
		setImage: 'SurpriseAttack.png',
        nextText: 20
      }
    ]
  },
  {
    id: 98,
    text: 'Oh no! The room was full of terrorists getting ready for the change of guards!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
    {
    id: 99,
    text: 'Your HP dropped below 0. Game Over.',
      options: [
	  {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
]

/* Start the game */
startGame();