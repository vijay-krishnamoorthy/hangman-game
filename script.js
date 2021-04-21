'use strict';
/*
    WEB230 Final Project - Hangman Game
    { name, student number, date }
*/
let words = ['superman', 'world', 'secret', 'guess me'];

let movesCount = 0;

const secretWord = (words[Math.floor(Math.random() * words.length)]).toUpperCase();
const secretWordArray = secretWord.split('');
localStorage.clear();
console.log(secretWord);
let divs = document.querySelectorAll('div');
let letters = document.getElementById('letters');
let clueSpace = document.getElementById("clue");
clueSpace.removeChild(document.querySelector("p"));
let pElement = document.createElement('p');
pElement.innerHTML = secretWord.split('').map(letter => { if (letter != " ") { return "_" } }).join('');
clueSpace.appendChild(pElement);
let usedWords = [];
let guessedWords;
divs.forEach(item => {
    item.addEventListener('click', function($event) {
        addMoves($event.target.id);
    })
});

function checkWords(clickedWord) {
    guessedWords = secretWord.split('').map(letter => ((usedWords.indexOf(letter) >= 0 && letter !== " ") ? letter : "_")).join('');
    console.log(guessedWords);
    let clueSpace = document.getElementById("clue");
    clueSpace.removeChild(document.querySelector("p"));
    let pElement = document.createElement('p');
    pElement.innerHTML = guessedWords.split('').map(letter => ((usedWords.indexOf(letter) >= 0 && letter !== " ") ? letter : "_")).join('');
    clueSpace.appendChild(pElement);
    document.querySelector('div#' + clickedWord).classList.add('used');
    let image = document.querySelector('img[alt="hangman"]');
    if (guessedWords == secretWord) {
        // alert('You have won');
        console.log(guessedWords);
        image.setAttribute('src', 'assets/winner.png');
        divs.forEach(item => {
            item.removeEventListener('click', function(e) {});
        });
        document.getElementById("gameover").children[0].style.display = 'block';
    } else {
        image.setAttribute('src', 'assets/hangman' + movesCount + '.png');
    }
}

function addMoves(clickedWord) {
    if (movesCount < 6) {
        if (usedWords.length) {
            let unUsedWord = usedWords.filter(word => clickedWord == word);
            if (unUsedWord.length <= 0) {
                usedWords.push(clickedWord);
                movesCount++;
                checkWords(clickedWord);
            } else {
                console.log(usedWords);
                console.log("You have already used that word, Please try a different word");
            }
        } else {
            usedWords.push(clickedWord);
            movesCount++;
            checkWords(clickedWord);
        }
    } else {
        let image = document.querySelector('img[alt="hangman"]');
        image.setAttribute('src', 'assets/hangman6.png');
        divs.forEach(item => {
            item.removeEventListener('click', function(e) {});
        });
        document.getElementById("gameover").children[0].style.display = 'block';
    }
}