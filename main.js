import { words } from "./words.js"

let currWord = ""
let score = 0
let streak = 0
let maxStreak = 0

window.getWord = () => {
    const pairs = Object.entries(words)
    const randomIndex = Math.floor(Math.random() * pairs.length)
    const randomPair = pairs[randomIndex]
    const key = randomPair[0]
    currWord = key;
    const value = randomPair[1]
    document.getElementById("scrambled-word").innerText = scrambleWord(key)
    document.getElementById("hint").innerText = value
}

const scrambleWord = (str) => {
    const len = str.length
    let scrambled = ""

    for (let i=0; i<len; i++) {
        const ranInd = Math.floor(Math.random() * str.length)
        scrambled += str[ranInd]
        str = str.replace(str[ranInd], "")
    }
    return scrambled
}

function startTimer(seconds) {
    let counter = seconds;
    let timer = document.getElementById("timer")
  
    const interval = setInterval(() => {
      timer.innerText = counter + "s"
      counter--;
  
      if (counter < 0 ) {
        clearInterval(interval);
        gameOver()
      }
    }, 1000);
}

window.updateScore = (amount) => {
    const scoreDisplay = document.getElementById("scoreDisplay")
    streak > 1 && amount > 0 ? score += Math.floor(amount * (streak * .5)): score += amount
    score < 0 ? scoreDisplay.innerText = 0 : scoreDisplay.innerText = score
}

window.increaseStreak = (bool) => {
    const streakDisplay = document.getElementById("streakDisplay") 
    if (bool) {
        streak++
        streakDisplay.innerText = streak
    }
    else {
        streak = 0
        streakDisplay.innerText = streak
    }
    streak > maxStreak ? maxStreak = streak : maxStreak = maxStreak
}

function resetStats() {
    const scoreDisplay = document.getElementById("scoreDisplay") 
    const streakDisplay = document.getElementById("streakDisplay")
    score = 0
    streak = 0
    maxStreak = 0
    scoreDisplay.innerText = score
    streakDisplay.innerText = streak
}

function resetInput() {
    const input = document.getElementById('input')
    input.value = ""
}

function showModal() {
    const endScreen = document.getElementById('endScreen')
    const modal = new bootstrap.Modal(endScreen)
    modal.show()
}

function getEndStats() {
    const gameScore = document.getElementById("gameScore") 
    const gameStreak = document.getElementById("gameStreak")
    const bestScore = document.getElementById("bestScore") 
    const bestStreak = document.getElementById("bestStreak") 
    score > 0 ? gameScore.innerText = score : gameScore.innerText = 0
    gameStreak.innerText = maxStreak
}

window.checkAnswer = () => {
    const input = document.getElementById('input')
    if (input.value.toLowerCase() == currWord.toLowerCase()) {
        increaseStreak(true)
        updateScore(10)
        resetInput()
    }
    else {
        increaseStreak(false)
        updateScore(-4)
        resetInput()
    }
    getWord()
    input.focus()
}

window.startGame = (time) => {
    // add parameter for different word categories
    getWord()
    startTimer(time)
}

const gameOver = () => {
    const finalAnswer = document.getElementById("finalAnswer")
    getEndStats()
    finalAnswer.innerHTML =`<b>${currWord.charAt(0).toUpperCase() + currWord.slice(1)}</b>.`
    showModal()
    resetStats()
    resetInput()
}

window.onload = startGame(30) 