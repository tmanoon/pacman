'use strict'

const PACMAN = '🐤'
var gPacman
const eatingSound = new Audio('js/ike.mp3')

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
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return    
    
    if (nextCell === FOOD) {
        updateScore(1)
        eatingSound.play()
    } 
    
    if (nextCell === CHERRY) {
        updateScore(10)
        eatingSound.play()
    }
    // DONE: hitting a ghost? call gameOver
    if (nextCell === SUPER_FOOD && gPacman.isSuper) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper === false) {
            return gameOver()
        } else {
            var idxOfGhost
            for (var i = 0; i < gGhosts.length; i++) {
                const currGhost = gGhosts[i]
                if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
                    idxOfGhost = i
                    break
                }
            }
            const deadGhost = gGhosts.splice(idxOfGhost, 1)[0]
            deadGhosts.push(deadGhost)
            console.log(deadGhosts)
        }
    }

    if (nextCell === SUPER_FOOD) {
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            const gGhostsLength = gGhosts.length
            const deadGhostsLength = deadGhosts.length
            for(var i = 0; i < gGhostsLength + deadGhostsLength; i++) {
                if(!(gGhosts.includes(deadGhosts[i]))) {
                    changeGhostsColor()
                    gGhosts.push(deadGhosts[i])
                }
            }
        }, 5000)
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
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
