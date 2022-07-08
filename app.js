// To-do: 
//   button transform in css 


// Have a deck which will be an array, that will hold objects, the objects will be the cards and have a front / back property. 
// -CM

// Have a button to click for next card, which will randomly choose front or back of a different card. 
// -CM

// Some implementation for showing the answer which will display the opposite side of the card. - Easy fix, just display both front and back, by calling both key properties for the card object. 
// -CM *Note* : Update so front / back displays at their respective location. 

// Save card button will create a new object within the deck and then it will save the front of card text to the  "front" value, and the back of card text to the 'back' value.  -CM
// Functionality needs to be made to push a new card onto the stack. It will push an object onto the deck array.
// -CM 

// Use logic to show either front or back randomly, then when show answer is clicked, display both. 
// -CM

// Tell user their card has been saved somehow... Button transformation with styling to show button has been clicked, find from the 10 javascript projects with florinpop. 

// This is the array that holds the cards
let deck =[]
// CurrentCard array keeps track of the current card, necessary to provide answer when "show answer" is clicked. 
let currentCard=[] 
// Front text for new card 
const cardFrontText= document.querySelector('#cardFrontText')

const BURP='Blargh!'
// Back text for new card
const cardBackText= document.querySelector('#cardBackText')

// Front card content location: 
const front = document.querySelector('#frontDisplay')

// Back card content location: 
const back = document.querySelector('#backDisplay')

// Save button
const saveButton = document.querySelector('#saveButton')

// Show answer button
const showAnswerButton = document.querySelector('#showAnswer')

// Next card button
const nextCardbttn = document.querySelector('#nextCard')

// Modal selector and buttons
const showModal = document.querySelector('#showModal')
const modal = document.querySelector('#newCardModal')
const closeModal = document.querySelector('#closeModal')

showModal.addEventListener('click', () => { 
  modal.showModal()
  
})

closeModal.addEventListener('click', () => { 
  modal.close();
})

// check localStorage for a deck, if it has one then dump it into the deck array just created 
if (localStorage.getItem('localDeck') != null) {
  deck.push(...(JSON.parse(localStorage.getItem('localDeck'))))
}

// if it doesn't have a deck in localStorage, create it with the contents of deck 
else { 
  localStorage.setItem('localDeck', JSON.stringify(deck))
}

// Factory function to return an object with a front / back value
function newCard (front, back) {
  return {
  front, back
}}

// Added event listener to document for going to next card and for showing answer 
document.addEventListener('keydown', (event) => {
  let name = event.key;
  let code = event.code;
  if (name === 'ArrowRight') { 
    console.log('Right arrow pressed'); 
    nextCard(); 
    console.log('Next card delivered')
  }
  if (name ===' ') {
    console.log(code)
      try { answerPlease()} 
      catch{
        console.log('An error ocurred has ocurred retrieving answer from keyEvent') } 
    console.log('Answer delivered')
  }
})

// this saves the deck as a  localDeck item to localStorage, 
function saveToLocalStorage() {
    localStorage.setItem('localDeck',JSON.stringify(deck))
}

// Do this function on click event for save card button. 
// deck.push(newCard(frontContent, backContent))
saveButton.addEventListener('click', pushCard => {
  if (cardFrontText.value ==='' || cardBackText.value ==='') {
    alert('Please enter card front and back values')}
  else{
deck.push(newCard(cardFrontText.value, cardBackText.value))
console.log('clicked')
  saveToLocalStorage()  
  console.log('Current deck saved to Local Storage')}
  textInputReset()
})
modal.addEventListener('keyDown', (event) => {
  let name =event.key; 
  let code =event.code; 
  if (name === 'Enter') { 
    console.log('enter key pressed')
  }
})

// This randomly selects front / back in the object. 
function cardSide() {
  if (Math.random() <0.5) {
      return 'front' } 
      else { return 'back' } 
}

// Resets the text input 
function textInputReset() {
  cardFrontText.value='';
  cardBackText.value='';
}

// Function that provides the next card on click. 
function nextCard () {
  front.innerText='?'
  back.innerText='?'
    if (deck.length===0) {
    alert('Please create a new deck to begin')
    console.log('Error, no deck found')
    return
   }
    let coin=cardSide() 
    console.log(coin)
  // Set to empty string to make answer hidden, this is overwritten with a value provided within the function further down
  if (coin ==='front') {
  return (front.innerText = function() {
    let count = Math.floor((Math.random()*deck.length-1))+1
    console.log('front works')
    currentCard.pop()
    console.log(count)
    currentCard.push(deck[count])
    console.log(currentCard)
    setTimeout(textInputReset(), 1000)
    return deck[count][coin]
  }())} 
  else { 
    return back.innerText = function() { 
      let count = Math.floor((Math.random()*deck.length-1))+1
      console.log('back works')
      currentCard.pop()
      console.log(count)
      currentCard.push(deck[count])
      console.log(currentCard, 'current card') 
      setTimeout(textInputReset(), 1000) 
      return deck[count][coin]
    }()}
  }


// Displays the answer 
function answerPlease () {
  try { 
  frontDisplay.innerText=currentCard[0].front;
  backDisplay.innerText=currentCard[0].back;
  currentCard.pop()} 
  catch (err){
    console.log(err, 'No current Card value saved') 
  }
} 

nextCardbttn.addEventListener('click', nextCard)
showAnswerButton.addEventListener('click', answerPlease)








