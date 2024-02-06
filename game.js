'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🥑'
const SIZE = 10
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gCherryInterval 

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gCherryInterval = setInterval(addingCherries(), 15000)
    // moveGhosts()
}

function buildBoard() {
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
        }
    }

    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function addingCherries() {
        var emptyCells = findEmptyCells()
        const randCellIdx = getRandomIntInclusive(0, emptyCells.length - 1)
        const randCell = emptyCells[randCellIdx]
        gBoard[randCell.i][randCell.j] = CHERRY
        renderCell(randCell, CHERRY) 
}

function findEmptyCells() {
    var emptyCells = []
        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                if (gBoard[i][j] === EMPTY) emptyCells.push({i:i, j:j})
            }
        }
        return emptyCells
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
    if (gGame.score === 60) {
        victory()
    }
}

// Add these lines of code to make it perfect
function gameOver(isWon) {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    const loserModal = document.querySelector('.game-over-modal')
    if(!isWon) {
        renderCell(gPacman.location, '🪦')
        loserModal.innerText = 'Lose'
    } else {
        loserModal.innerText = 'Victory'
    }
    
        loserModal.style.display = 'block'
    gGame.isOn = false
}

function victory() {
    console.log('You Won!')
    clearInterval(gIntervalGhosts)
    const modal = document.querySelector('.victory-modal')
    modal.style.display = 'block'
    gGame.isOn = false
}

function startAgain() {
    const loserModal = document.querySelector('.game-over-modal')
    const winnerModal = document.querySelector('.victory-modal')
    if (loserModal.style.display === 'block') loserModal.style.display = 'none'
    else winnerModal.style.display = 'none'
    onInit()
}
