/*----- constants -----*/

const sequence = []

/*----- state variables -----*/

let playerSequence = []
let round = 0
let highestScore = 0 //initializes the highest score

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
}

function startGame() {
    sequence.length = 0
    playerSequence.length = 0
    round = 0
    scores.player = 0 //resets the score
    updateScore(scores.player) //updates the score display to 0
    nextLevel()
    scores[winner] +=1
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
    scores.player += 0
    updateScore(scores.player)
    updateHighestScore(scores.player)
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
        startGame() //resets the game
        return
    }
    playSequence(panelColor)
        if (playerSequence.length === sequence.length) {
            setTimeout(() => {
                nextLevel()
                scores.player += 1 //increases the score by 1
                updateScore(scores.player) //updates the displayed score
            }, 400)
    }
}

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        panelClicked(panel.id)
    })
})

// transfer/visualize all state to the DOM

function updateScore(currentScore) {
    const scoreEl = document.getElementById('currentScore')
    scoreEl.innerText = currentScore
}

function updateHighestScore(currentScore) {
    if (currentScore >= highestScore) {
        highestScore = currentScore
        const highestScoreEl = document.getElementById('highestScore')
        highestScoreEl.innerText = highestScore
    }
}
