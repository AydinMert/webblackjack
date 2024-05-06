let deck;
let playerList = [];
var currentPlayerIndex = 1;
var currentPlayer;
var turnOrder;

class Player {

    #username;
    #playerType;
    #playerCards = [];
    #splittedCards = [];
    #splittedPoints = 0;
    #playerPoints = 0;
    #cardImages = [];
    #isSplitted = false;

    constructor(playerType, username, cards){
        this.#playerType = playerType;

        if(username != null){
            this.#username = username;
        }else{
            this.#username = "dealer";
        } 
    }

    getCard() {
        var card = deck.pop();
        this.#playerCards.push(card);
        return card;
    }

    getCardImage(card){
        var src = "./assets/images/cards/";
        var ext  = ".png";
        var cardImage = src + card + ext;
        this.#cardImages.push(cardImage);
    }

    setCardImages(){
        var cardImages = [];
    
        this.#cardImages.forEach(c => {
            var card = document.createElement("div");
            card.classList.add("card"); 
            var img = document.createElement("img");
            img.src = c;
            card.appendChild(img);
            cardImages.push(card);
        });
    
        return cardImages;
    }
    

    isEqual() {
        var firstCard = this.getValue(this.#playerCards[0]);
        var isEqual = true;
    
        this.#playerCards.forEach(card => {
            if(this.getValue(card) !== firstCard){
                isEqual = false;
            }
            return isEqual;
        });
    
        return isEqual;
    }

    splitCards(){
        if (this.isEqual()) {
            this.resetCardImages();
            console.log(this.#playerCards)
            this.#splittedCards.push(this.#playerCards.pop());
            console.log(this.#playerCards)

            this.#splittedCards.push(deck.pop());
            this.#splittedPoints = this.calculatePoints(this.#splittedCards)

            this.#playerCards.push(deck.pop());
            this.#playerPoints = this.calculatePoints(this.#playerCards)

            this.#playerCards.forEach(element => {
                this.getCardImage(element)
            });

            this.#splittedCards.forEach(element => {
                this.getCardImage(element);
            });

            // console.log(this.#playerCards)
            // console.log(this.#splittedCards)
        }
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
        // console.log(this.getCards());
        // console.log("eski: " + this.getPoints());
        this.#playerPoints = this.calculatePoints(this.getCards());
        this.#splittedPoints = this.calculatePoints(this.getSplittedCards());
    }

    /*deneysel*/
    addCard(card){
        this.#playerCards.push(card);

    }

}

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();

}

function buildDeck() {
    let values = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king",];
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "_of_" + suits[i]);
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

function positionPlayerCards(playerList) {
    playerList.forEach(player => { 
        if(player.getUsername() == "dealer"){
            return;
        } else {
            var areaId = document.getElementById(player.getUsername());
            var cardElements = areaId.querySelectorAll(".card");
            
            for (var i = 0; i < cardElements.length; i++) {
                var card = cardElements[i];
                
                if (i > 0) {
                    card.style.position = "relative";
                    card.style.top = -i + "vw";
                    card.style.left = i*-3 + "vw";
                } else {
                    card.style.position = "relative";
                    card.style.top = "0vw";
                    card.style.left = "0vw";
                }
            }
        }
    });
}

function setPlayerFields(playerList){
    // var players = Object.values(playerList);


    /*deneysel*/
    var playerArea = document.querySelector("." + playerList.getPlayerType() + "-area");
    var cardsContainer = playerArea.querySelector(".cards-container");


    var playerField = document.createElement("div");
    playerField.classList.add("player");
    playerField.id = playerList.getUsername();
    


    var cards = playerList.getCards();
    console.log(cards)
    if(playerList.isSplitted()){
        var splittedplayerCards = document.createElement("div");
        splittedplayerCards.classList.add("splitted-" + playerList.getPlayerType() + "-cards");
    }
    
    var playerCards = document.createElement("div");
    playerCards.classList.add(playerList.getPlayerType() + "-cards");

    var cardImages = playerList.setCardImages();
    console.log(cardImages);
    var cards = playerList.getCardImages();
    console.log(cards);

    

    cardImages.forEach(element => {
        console.log(element)
        var elem = document.querySelector('card')
        console.log(elem)

        if (cards.includes(element)) {
            
            playerCards.appendChild(element);
        } else {
            
            splittedplayerCards.appendChild(element);
        }
    });


    playerField.appendChild(playerCards);
    playerField.appendChild(splittedplayerCards);


    var pointsContainer = document.createElement("div");
    pointsContainer.classList.add("points-container");
    var points = document.createElement("h6");
    var splittedPoints = document.createElement("h6");
    points.textContent = "points: " + playerList.getPoints();
    splittedPoints.textContent = "points: " + playerList.getSplittedPoints();

    pointsContainer.appendChild(points);
    pointsContainer.appendChild(splittedPoints);
    playerField.appendChild(pointsContainer);

    cardsContainer.appendChild(playerField);

    // players.forEach(player => {
    //     var playerArea = document.querySelector("." + player.getPlayerType() + "-area");
    //     console.log(playerArea);
    //     var cardsContainer = playerArea.querySelector(".cards-container");
    //     var playerCards = document.createElement("div");
    //     playerCards.classList.add(player.getPlayerType() + "-cards");

    //     var playerField = document.createElement("div");
    //     playerField.classList.add("player");
    //     playerField.id = player.getUsername();
        

    //     player.setCardImages().forEach(element => {
    //         playerCards.appendChild(element);
    //     });
    //     // for döngüsü kullanarak her bir kart resmini ekleyin
        
    //     playerField.appendChild(playerCards);

    //     cardsContainer.appendChild(playerField);
    // });
    // positionPlayerCards(players);
}



function initializeCards(playerList) {
    var players = Object.values(playerList);

    players.forEach(player => {
        player.getCardImage(player.getCard());
        player.getCardImage(player.getCard());
        player.setPoints();
        console.log(player.getUsername() + ":  " + player.getPoints());
    });
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
    console.log("oynayan oyuncu: " + currentPlayer.getUsername() + ":  " + currentPlayer.getPoints()); 
    if(currentPlayer.getPoints() > 21)
        stand();
}

function nextPlayerTurn() {
    currentPlayerIndex++;
    if (currentPlayerIndex >= turnOrder.length) {
        currentPlayerIndex = 0;
    }
}

function updatePlayerArea(player) {
    console.log("#" + player.getUsername() + ".player")
    var playerArea = document.querySelector("#" + player.getUsername() + ".player")
    console.log(playerArea);

    //positionPlayerCards([player]);
}

function updatePoints(player){
    var points = player.getPoints();
}

function split() {
    currentPlayer.setAsSplitted();
    currentPlayer.splitCards();
    // var splitButton = document.querySelector('#split');
    // splitButton.disabled = false;
    updatePlayerArea(currentPlayer);
    updatePoints(currentPlayer);
    
}

function hit() {
    console.log(currentPlayer)
    currentPlayer.getCardImage(currentPlayer.getCard());
    currentPlayer.setCardImages();
    currentPlayer.setPoints();
    console.log(currentPlayer.getUsername() + ":  " + currentPlayer.getPoints());
    updatePlayerArea(currentPlayer);
    updatePoints(currentPlayer);
}

function stand() {
    nextPlayerTurn();
    processCurrentPlayerTurn();
}

function startGame() {
    // playerList = {
        //     dealer : new Player("dealer", null),
        //     player1 : new Player("player", "dümbük"),
        // };
        
    /*deneysel*/
    var cards = ['10_of_spades', '10_of_diamonds'];
    // console.log(cards)
    var niyazi = new Player("player", "niyazi");
    for(var i = 0; i < cards.length; i++){
        var card = cards[i];
        niyazi.addCard(card);
        niyazi.getCardImage(card);
        niyazi.setCardImages();
        niyazi.calculatePoints(cards);
    }

    currentPlayer = niyazi;
    split();
    console.log(niyazi);

    // initializeCards(playerList);
    setPlayerFields(niyazi);
    
    // processCurrentPlayerTurn();
    // setButtons();
}


