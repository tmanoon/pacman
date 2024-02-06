'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🥑'
const SIZE = 10
const CHERRY = '🍒'

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
    gCherryInterval = setInterval(addCherry, 15000)
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
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function addCherry() {
        const emptyCells = findEmptyCells()
        const randCellIdx = getRandomIntInclusive(0, emptyCells.length - 1)
        const randCell = emptyCells[randCellIdx]
        gBoard[randCell.i][randCell.j] = CHERRY
        renderCell(randCell, CHERRY) 
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
    if (gGame.score === 60) gameOver(true)
}

function gameOver(isWon) {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    const btn = document.querySelector('.restart-button')
    const gameOverModal = document.querySelector('.game-over-modal')
    gameOverModal.style.display = 'block'
    btn.hidden = false
    if(!isWon) {
        renderCell(gPacman.location, '🪦')
        gameOverModal.innerText = 'You lost!'
    } else {
        gameOverModal.innerText = 'You won!'
    }
    
    gGame.isOn = false
}
