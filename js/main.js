
 /*----- constants -----*/

const soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
const soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
const soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
const soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')

/*----- state variables -----*/

let sequence = []   // sequence with which the color flashes
let playerSequence = [] // sequence with which the player is pressing the sequence
let highestScore = 0 //initializes the highest score
let gameActive = true   // whether or not the game is in play or not

/*----- cached elements  -----*/

const startButton = document.getElementById('startButton')
const panels = document.querySelectorAll('.color-panel')
const scoreEl = document.getElementById('currentScore')
const highestScoreEl = document.getElementById('highestScore')


/*----- event listeners -----*/

startButton.addEventListener('click', startGame)

panels.forEach(function(panel) {
    panel.addEventListener('click', function() {
        panelClicked(panel.id)
    })
})


/*----- functions -----*/
init()
function init() {
    scores = {}
    results = {}
}

function startGame() {
    sequence.length = []
    playerSequence.length = []
    gameActive = true
    scores.player = 0 //resets the score
    updateScore(scores.player) //updates the score display to 0
    nextLevel()
    // scores[winner] += 1
}

function playSequence(color) {
    const panel = document.getElementById(color)
    panel.classList.add('active')
    playSound(color)
    setTimeout(() => {
        panel.classList.remove('active')
    }, 400)
}
// console.log(playSequence)

function nextLevel() {
    // updateScore(scores.player)
    updateHighestScore(scores.player)
    if (gameActive) {
        playerSequence = []
        sequence.push(nextColor())
        sequence.forEach((color, index) => {
            setTimeout(function() {
                playSequence(color)
            }, (index + 1) * 600)
        })
    } else {
        return
    }
}

function nextColor() {
    const colors = ['red', 'blue', 'green', 'yellow']
    return colors[Math.floor(Math.random() * colors.length)]
}


function panelClicked(panelColor) {
    if (!gameActive) return

    playerSequence.push(panelColor)
    playSound(panelColor)
    const index = playerSequence.length - 1
    if (playerSequence[index] !== sequence[index]) { // game over logic
        // alert('Game over!')
        endGame(false)
        setTimeout(function() {
            document.getElementById('gameOverMessage').style.display = '' // hide game over message
            // startGame() //resets the game
        }, 2000)
        return
    }
    playSequence(panelColor)
    if (playerSequence.length === sequence.length) {
        setTimeout(function() {
            scores.player += 1 //increases the score by 1
            updateHighestScore(scores.player) // checks and update highest score
            updateScore(scores.player) //updates the displayed score
            nextLevel()
        }, 500)
    }
}


function playSound(color) {
    switch (color) {
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


// transfer/visualize all state to the DOM

function updateScore(newScore) {
    const scoreEl = document.getElementById('currentScore')
    scoreEl.innerText = newScore
    if (newScore === 3) {   // assumen the number is the winning score
        gameActive = false  // stops the game
        // const winMessageEl = document.getElementById('winMessage')
        // winMessageEl.style.display = 'block'
        endGame(true)
        setTimeout(() => {
            document.getElementById('winMessage').style.display = ''
        }, 2000)
    }
}


function updateHighestScore(currentScore) {
    if (currentScore > highestScore) {
        highestScore = currentScore
        const highestScoreEl = document.getElementById('highestScore')
        highestScoreEl.innerText = highestScore
    }
}



function endGame(win) {
    gameActive = false
    sequence.length = 0 //reset the game
    playerSequence.length = 0
    if (win) {
        document.getElementById('winMessage').style.display = 'block'
    } else {
        document.getElementById('gameOverMessage').style.display = 'block'
    }
}