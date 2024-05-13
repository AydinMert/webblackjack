let deck;
let playerList = [];
var currentPlayerIndex = 1;
var currentPlayer;
var turnOrder;
var standClicked = false;
var delersTurn = false;
var dealer ;

class Player {

    #username;
    #playerType;
    #playerCards = [];
    #splittedCards = [];
    #splittedPoints = 0;
    #playerPoints = 0;
    #cardImages = [];
    #splittedCardImages = [];
    #isSplitted = false;
    #busted = false;
    #blackjack = false;

    constructor(playerType, username, cards){
        this.#playerType = playerType;

        if(username != null){
            this.#username = username;
        }else{
            this.#username = "dealer";
        } 

        if(cards != null) {
            cards.forEach(card => {
                this.addCard(card);
            });
        }
    }

    getCard() {
        var card = deck.pop();
        return card;
    }
    
    addCard(card){
        this.#playerCards.push(card);
    }

    addToSplitted(card){
        this.#splittedCards.push(card);
    }

    setCardImages(cards){
        var cardImages = [];
        var src = "./assets/images/cards/";
        var ext  = ".png";
        cards.forEach(c => {
            var cardImage = src + c + ext;
            var card = document.createElement("div");
            card.classList.add("card"); 
            var img = document.createElement("img");
            img.src = cardImage;
            card.appendChild(img);
            cardImages.push(card);
        });
    
        return cardImages;
    }
    
    isEqual() {
        var firstCard = this.#playerCards[0].split("_of_")[0];
        var isEqual = true;
    
        this.#playerCards.forEach(card => {
            if(card.split("_of_")[0] !== firstCard){
                isEqual = false;
            }
        });

        return isEqual;
    }

    isBusted(){
        return this.#busted;
    }

    isBlackJack(){
        return this.#blackjack;
    }

    splitCards(){
        if (this.isEqual()) {
            this.resetCardImages();
            this.#splittedCards.push(this.#playerCards.pop());
            this.#splittedCards.push(deck.pop());
            this.#splittedPoints = this.calculatePoints(this.#splittedCards)

            this.#playerCards.push(deck.pop());
            this.#playerPoints = this.calculatePoints(this.#playerCards)

            this.setCardImages(this.#playerCards).forEach(element => {
                this.#cardImages.push(element);
            });

            this.setCardImages(this.#splittedCards).forEach(element => {
                this.#splittedCardImages.push(element);
            });

            this.setAsSplitted()
        }
    }

    checkStates (){
        if(this.#playerPoints > 21)
            this.#busted = true;

        if(this.#playerPoints == 21)
            this.#blackjack = true;
    }

    setAsSplitted(){
        this.#isSplitted = true;
    }

    isSplitted(){
        return this.#isSplitted;
    }

    getCards(){
        return this.#playerCards;
    }

    getCardImages(){
        return this.#cardImages;
    }

    getSplittedCardImages(){
        return this.#splittedCardImages;
    }

    getSplittedCards(){
        return this.#splittedCards;
    }

    getSplittedPoints(){
        return this.#splittedPoints;
    }

    getUsername(){
        return this.#username;
    }

    getPlayerType(){
        return this.#playerType;
    }

    getPoints(){
        return this.#playerPoints;
    }

    resetCardImages(){
        this.#cardImages = [];
    }
    resetSplittedCardImages(){
        this.#splittedCardImages = [];
    }

    getValue(card) {
        let data = card.split("_of_");
        let value = data[0];

        if(isNaN(value) && value != "ace") {
            return 10;
        }

        if(value == "ace") {
            return 11;
        }

        return parseInt(value);
    }

    calculatePoints(cards) {
        let totalPoints = 0;
        let aceCount = 0;
    
        for (let i = 0; i < cards.length; i++) {
            let cardValue = this.getValue(cards[i]);
            totalPoints += cardValue;
            if (cardValue === 11) {
                aceCount++;
            }
        }
    
        while (totalPoints > 21 && aceCount > 0) {
            totalPoints -= 10;
            aceCount--;
        }
    
        return totalPoints;
    }
    
    setPoints(){
        this.#playerPoints = this.calculatePoints(this.getCards());
        this.#splittedPoints = this.calculatePoints(this.getSplittedCards());
    }
}

function buildDeck() {
    let values = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king",];
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    deck = [];

    for (let a = 0; a < 8; a++) {   
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "_of_" + suits[i]);
            }
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp; 
    }
}

function positionPlayerCards(player) {
    if(player.getUsername() == "dealer"){
        return;
    } else {
        var areaId = document.getElementById(player.getUsername());
        var cardElements = areaId.querySelectorAll(".card");
        
        var j = 0, i = 0;

        cardElements.forEach(card => {
            var parentElement = card.parentNode;

            if(parentElement.classList.contains("splitted-player-cards")){
                if(j > 0) {
                    card.style.position = "relative";
                    card.style.top = -j + "vw";
                    card.style.left = j*-3 + "vw";
                } else {
                    card.style.position = "relative";
                    card.style.top = "0vw";
                    card.style.left = "0vw"; 
                }

                j++;
            }
            if(parentElement.classList.contains("player-cards")){
                if (i > 0) {
                    card.style.position = "relative";
                    card.style.top = -i + "vw";
                    card.style.left = i*-3 + "vw";
                    i++;
                
                } else {
                    card.style.position = "relative";
                    card.style.top = "0vw";
                    card.style.left = "0vw";
                    i++;
                }
            }
        });
    }
}

function setPlayerField(player){
    var playerArea = document.querySelector("." + player.getPlayerType() + "-area");
        var cardsContainer = playerArea.querySelector(".player-container");
        
        var playerField = document.createElement("div");
        playerField.classList.add("player");
        playerField.id = player.getUsername();
        
        cardsContainer.appendChild(playerField);
}

function setPlayerCards(player) {
    
    var playerField = document.querySelector('#'+ player.getUsername() +'.'+ 'player');        
    var cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");

    var playerName = document.createElement("div");
    playerName.innerHTML = player.getUsername();
    playerName.classList.add("player-name");
    playerField.appendChild(playerName); 

    if(player.isSplitted()){
        var splittedplayerCards = document.createElement("div");
        splittedplayerCards.classList.add("splitted-" + player.getPlayerType() + "-cards");
        player.getSplittedCardImages().forEach(element => {
            splittedplayerCards.appendChild(element)
        });
        cardsContainer.append(splittedplayerCards);
    }
    
    var playerCards = document.createElement("div");
    playerCards.classList.add(player.getPlayerType() + "-cards"); 
    player.getCardImages().forEach(element => {
        playerCards.appendChild(element);
    })

    cardsContainer.appendChild(playerCards);
    playerField.appendChild(cardsContainer);
    positionPlayerCards(player);
}

function setPlayerPoints(player) {
    var playerField = document.querySelector('#'+ player.getUsername() +'.'+ 'player');        
    var pointsContainer = document.createElement("div");
    pointsContainer.classList.add("player-points");
    var points = document.createElement("span");
    points.textContent = "points: " + player.getPoints();
    
    playerField.appendChild(pointsContainer);
    
    if(player.isSplitted()){         
        var splittedPoints = document.createElement("span");
        splittedPoints.textContent = "points: " + player.getSplittedPoints();
        pointsContainer.appendChild(splittedPoints);
    }

    pointsContainer.appendChild(points); 
}

function resetButtons(){
    var buttons = document.querySelector(".buttons");
    $(buttons).empty();
}

function setButtons(){
    var buttons = document.querySelector(".buttons");

    var hitButton = document.createElement("button");
    hitButton.textContent = "Hit";
    hitButton.id = "hit";
    hitButton.addEventListener("click", hit);

    var standButton = document.createElement("button");
    standButton.textContent = "Stand";
    standButton.id = "stand";
    standButton.addEventListener("click", stand);

    var splitButton = document.createElement("button");
    splitButton.textContent = "Split";
    splitButton.id = "split";
    if(currentPlayer.isEqual()){
        splitButton.disabled = false;
    }else{
        splitButton.disabled = true;
    }
    splitButton.addEventListener("click", split);

    buttons.appendChild(hitButton);
    buttons.appendChild(standButton);
    buttons.appendChild(splitButton);
}

function getCurrentPlayer() {
    turnOrder = Object.keys(playerList);
    return playerList[turnOrder[currentPlayerIndex]];
}

function processCurrentPlayerTurn() {
    currentPlayer = getCurrentPlayer();
    if(currentPlayer.getPlayerType() != "dealer"){
        resetButtons();
        setButtons();
        currentPlayer.checkStates();
        if(currentPlayer.isBusted()){
            stand();
        }
        if(currentPlayer.isBlackJack()){
            stand();
        }
    }else{
        resetButtons();
        while(currentPlayer.getPoints() < 17){
            hit();
        }
        currentPlayer.checkStates();
        if(currentPlayer.isBusted()){
            GameOver();
        }

        GameOver();
    }
    console.log("player: " + currentPlayer.getUsername() + ":  " + currentPlayer.getPoints()); 
}

function nextPlayerTurn() {
    currentPlayerIndex++
    if (currentPlayerIndex >= turnOrder.length) {
      currentPlayerIndex = 0
    }
    while (playerList[turnOrder[currentPlayerIndex]].isSplitted()) {
      currentPlayerIndex++
      if (currentPlayerIndex >= turnOrder.length) {
        currentPlayerIndex = 0
      }
    }
}

function updatePlayerArea(player) {     
    var playerArea = document.querySelector('#'+ player.getUsername() +'.'+ 'player');  
    $(playerArea).empty();
    setPlayerCards(player);
    setPlayerPoints(player);
}

function split() {
    currentPlayer.setAsSplitted();
    currentPlayer.splitCards();
    var splitButton = document.querySelector('#split');
    splitButton.disabled = true;
    updatePlayerArea(currentPlayer);
}

function hit() {
    currentPlayer.addCard(currentPlayer.getCard());
    currentPlayer.resetCardImages();
    currentPlayer.setCardImages(currentPlayer.getCards()).forEach(element => {
        currentPlayer.getCardImages().push(element);
    });
    currentPlayer.setPoints();
    currentPlayer.checkStates();
    updatePlayerArea(currentPlayer);
}

function hitForSplitted() {
    currentPlayer.addToSplitted(currentPlayer.getCard());
    currentPlayer.resetSplittedCardImages();
    currentPlayer.setCardImages(currentPlayer.getSplittedCards()).forEach(element => {
        currentPlayer.getSplittedCardImages().push(element);
    });
    currentPlayer.setPoints();
    updatePlayerArea(currentPlayer);
}

function stand() {
    if(standClicked){
        var hitButton = document.querySelector('button#hit');
        console.log(hitButton)
        hitButton.removeEventListener("click", hitForSplitted);
        hitButton.addEventListener("click", hit);
        nextPlayerTurn();
        processCurrentPlayerTurn();
    }
    if(!currentPlayer.isSplitted()){
        nextPlayerTurn();
        processCurrentPlayerTurn();
    }else{
        var hitButton = document.querySelector('button#hit');
        console.log(hitButton)
        hitButton.removeEventListener("click", hit);
        hitButton.addEventListener("click", hitForSplitted);
        console.log(currentPlayer)
    }
    currentPlayer.checkStates();
    standClicked = true;
}

function initializeCards(player) {
    player.addCard(player.getCard());
    player.addCard(player.getCard());
    player.setCardImages(player.getCards()).forEach(element => {
        player.getCardImages().push(element);
    });
    player.setPoints();
}

function GameOver() {
    console.log("game over");

    console.log(playerList)

    for (let i = 0; i < playerList.length; i++) {
        let player = playerList[i];

        if (player.getPlayerType() == "dealer") {
            continue;
        }

        //losing states
        if (player.isBusted() && !dealer.isBusted()) {
            console.log(player.getUsername() + " lose");
        } else if (!player.isBusted() && !dealer.isBusted() && player.getPoints() < dealer.getPoints()) {
            console.log(player.getUsername() + " lose");
        } else if (!player.isBlackJack() && dealer.isBlackJack()) {
            console.log(player.getUsername() + " lose");
        }
    
        //draw states
        else if (player.isBusted() && dealer.isBusted()) {
            console.log(player.getUsername() + " draw");
        } else if (player.isBlackJack() && dealer.isBlackJack()) {
            console.log(player.getUsername() + " draw");
        }
    
        //winning states
        else if (!player.isBusted() && dealer.isBusted()) {
            console.log(player.getUsername() + " win");
        } else if (!player.isBusted() && !dealer.isBusted() && player.getPoints() > dealer.getPoints()) {
            console.log(player.getUsername() + " win");
        } else if (player.isBlackJack() && !dealer.isBlackJack()) {
            console.log(player.getUsername() + " win");
        }
    }

    var container = document.querySelector(".container");
    var restartButton = document.createElement("button");
    restartButton.id = "restart-button";
    restartButton.textContent = "restart";
    console.log(restartButton);
    container.appendChild(restartButton);
    restartButton.onclick = function () {
        startGame();
    }
}

buildDeck();
shuffleDeck();

function startGame() {
    console.log(deck)
    dealer = new Player("dealer", "dealer");
    playerList.push(dealer);

    playerList.push(new Player("player", username.value));

    playerList.forEach(player => {
        initializeCards(player);
    })

    playerList.forEach(player => {
        console.log(player)
        setPlayerField(player);
        setPlayerCards(player);
        setPlayerPoints(player);
    });
    processCurrentPlayerTurn();
}


window.onload = function () {
    var div = document.querySelector(".startGame");
    var button = document.getElementById("start-button");
    var usernameInput = document.getElementById("username");
    var username;

    button.onclick = function () {
        username = usernameInput.value;
        startGame();
        div.parentNode.removeChild(div);
    }
}