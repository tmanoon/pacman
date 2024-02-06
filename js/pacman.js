'use strict'

const PACMAN = '🐤'
var gPacman
const eatingSound = new Audio('./audio/ike.mp3')

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === FOOD) {
        updateScore(1)
        eatingSound.play()
    }

    if (nextCell === CHERRY) {
        updateScore(10)
        eatingSound.play()
    }

    if (nextCell === SUPER_FOOD && gPacman.isSuper) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper === false) return gameOver(false)
        else killGhost(nextLocation)
    }

    if (nextCell === SUPER_FOOD) {
        gPacman.isSuper = true
        setTimeout(() => {
            reviveGhosts()
            changeGhostsColor()
        }, 5000)
    }


    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN

    renderCell(nextLocation, PACMAN)
}

function killGhost(nextLocation) {
    var idxOfGhost
    for (let i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
            idxOfGhost = i
            break
        }
    }
    const deadGhost = gGhosts.splice(idxOfGhost, 1)[0]
    gDeadGhosts.push(deadGhost)
}

function reviveGhosts() {
    gPacman.isSuper = false
    const gGhostsLength = gGhosts.length
    const deadGhostsLength = gDeadGhosts.length
    for (var i = 0; i < gGhostsLength + deadGhostsLength; i++) {
        if (!(gGhosts.includes(gDeadGhosts[i]))) {

            gGhosts.push(gDeadGhosts[i])
        }
    }
}

function changeGhostsColor() {
    for (let i = 0; i < gGhosts.length - 1; i++) {
        gGhosts[i].color = gGhostsColors[i]
    }
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
