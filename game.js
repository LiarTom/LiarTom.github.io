const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choices')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('choice')
      button.addEventListener('click', () => selectOption(option))
      choicesElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'question 1',
    options: [
      {
        text: 'option 1',
        /*setState: {}*/
        nextText: 2
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
        /*requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true }*/
        nextText: 3
      },
      {
        text: 'option 2',
        /*requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true }*/
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
        /*requiredState: (currentState) => currentState.sword,*/
        nextText: 9
      },
      {
        text: 'option 3',
        /*requiredState: (currentState) => currentState.shield,*/
        nextText: 10
      },
      {
        text: 'option 4',
        /*requiredState: (currentState) => currentState.blueGoo,*/
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

