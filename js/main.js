/*----- constants -----*/

const sequence = []

/*----- state variables -----*/

let playerSequence = []
let round = 0

/*----- cached elements  -----*/
const startButton = document.getElementById('startButton')
const panels = document.querySelectorAll('.color-panel')



/*----- event listeners -----*/

startButton.addEventListener('click', startGame)

/*----- functions -----*/
init()

function init() {
    scores = {}
    results = {}
    render()
}
function startGame() {
    sequence.length = 0
    playerSequence.length = 0
    round = 0
    nextLevel()
    scores[winner] +=1
    render()
}
function playSequence(color) {
    const panel = document.getElementById(color)
    // const sound = new Audio(Element.getAttribute('data-sound'))
    // data-sound.play()
    panel.classList.add('active')
    setTimeout(() => {
        panel.classList.remove('active')
    }, 400)
}
console.log(playSequence)

function nextLevel() {
    playerSequence = []
    sequence.push(nextColor())
    sequence.forEach((color, index) => {
        setTimeout(() => {
            playSequence(color)
        }, 
        (index + 1) * 600)
    })
}


function nextColor() {
    const colors = ['red', 'blue', 'green', 'yellow']
    return colors[Math.floor(Math.random() * colors.length)]
}


// function playSequence


// function panelClicked

function panelClicked(panelColor) {
    playerSequence.push(panelColor)
    const index = playerSequence.length - 1
    if (playerSequence[index] !== sequence[index]) {
        alert('Game over!')
        startGame()
        return
    }
    playSequence(panelColor)
        if (playerSequence.length === sequence.length) {
            setTimeout(() => {
                nextLevel()
            }, 400)
    }
}

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        panelClicked(panel.id)
    })
})

// transfer/visualize all state to the DOM

function renderScores() {
    for (let key in scores) {
        const scoreEl = document.getElementById(`${key}-score`)
        scoreEl.innerText = scores[key]
    }
}
function render() {
    renderScores()
}

