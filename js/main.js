/*----- constants -----*/

const sequence = []

const soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
const soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
const soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
const soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')


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
    scores[winner] += 1
}

function playSequence(color) {
    const panel = document.getElementById(color)
    panel.classList.add('active')
    playSound(color)
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
    playSound(panelColor)
    const index = playerSequence.length - 1
    if (playerSequence[index] !== sequence[index]) { // game over logic
        // alert('Game over!')
        document.body.style.backgroundColor = 'grey' // change background color to indicate game over
        document.getElementById('gameOverMessage').style.display = 'block' // game over message
        setTimeout(() => { 
            document.body.style.backgroundColor = '' // to reset background color after delay
            document.getElementById('gameOverMessage').style.display = '' // hide game over message
            // startGame() //resets the game
        }, 3000)
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

function updateScore(newScore) {
    const scoreEl = document.getElementById('currentScore')
    scoreEl.innerText = newScore
}

function updateHighestScore(currentScore) {
    if (currentScore > highestScore) {
        highestScore = currentScore
        const highestScoreEl = document.getElementById('highestScore')
        highestScoreEl.innerText = highestScore
    }
}


function playSound(color) {
    switch(color) {
        case 'red':
            sound = soundRed
            break
        case 'green':
            sound = soundGreen
            break
        case 'blue':
            sound = soundBlue
            break
        case 'yellow':
            sound = soundYellow
            break
            return
    }
    sound.currentTime = 0
    sound.play()
}
