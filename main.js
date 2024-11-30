import { videoGames } from "./video-games.js"
import { movies } from "./movies.js"

let currWord = ""
let score = 0
let streak = 0
let maxStreak = 0

window.getWord = () => {
    resetInput()
    const pairs = getCategoryFile()
    console.log(pairs)
    const randomIndex = Math.floor(Math.random() * pairs.length)
    const randomPair = pairs[randomIndex]
    const key = randomPair[0]
    currWord = key;
    const value = randomPair[1]
    document.getElementById("scrambled-word").innerText = scrambleWord(key)
    document.getElementById("hint").innerText = value
}

function getCategoryFile() {
    const cat = localStorage.getItem("category")
    const currPack = localStorage.getItem("currWordPack")
    console.log("getFile:" + cat)
    switch (cat) {
        case "video-games":
            console.log(1)
            return Object.entries(videoGames[currPack])
        case "movies":
            console.log(2)
            return Object.entries(movies[currPack])
        default:
            console.log(3)
            return Object.entries("minecraft")
    }
}

window.changeWordPack = (buttonTitle) => {
    const newWordPack = document.getElementById(buttonTitle)
    const wordPackCat = newWordPack.closest(".category").id
    document.querySelectorAll(".pack-select").forEach((pack) => { pack.classList.remove("active")})
    newWordPack.classList.add("active")
    localStorage.setItem("currWordPack", newWordPack.id)
    localStorage.setItem("category", wordPackCat)
}

function selectedWordPack() {
    const title = localStorage.getItem("currWordPack")
    title ? changeWordPack(title) : localStorage.setItem("currWordPack", "minecraft")
}

window.onload = selectedWordPack 

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