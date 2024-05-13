    const bets = document.querySelectorAll('.bets');
    var playerArea = document.querySelector('.player-area');
    var cardsContainer = playerArea.querySelector('.cards-container');
    const pCrds = cardsContainer.querySelectorAll('.player-cards');
    const spltpCrds = cardsContainer.querySelectorAll('.player-cards');

    console.log("fawfwafaw")
    console.log(pCrds)

    const betpositions = [
        { x: 5.4, y: -15, rotate: 58 },
        { x: 0, y: -4.5, rotate: 30 },
        { x: 0, y: 0, rotate: 0 },
        { x: 0, y: -4.5, rotate: -30 },
        { x: -5.5, y: -15, rotate: -58 },
    ];

    const cardpositions = [
        { x: 4.5, y: -11.2, rotate: 58 },
        { x: 0.2, y: -3.4, rotate: 30 },
        { x: 0, y: 0, rotate: 0 },
        { x: 0, y: -3.4, rotate: -30 },
        { x: -4.4, y: -11.2, rotate: -58 }
    ];

    bets.forEach((bet, index) => {
        const { x, y, rotate } = betpositions[index]; // positions dizisinden konum ve dönüş değerlerini al
        if (x !== undefined && y !== undefined && rotate !== undefined) {
            bet.style.transform = `translate(${x}vw, ${y}vw) rotate(${rotate}deg)`; // kartın stilini güncelle
        }
    });

    pCrds.forEach((card, index) => {
        const { x, y, rotate } = cardpositions[index]; // positions dizisinden konum ve dönüş değerlerini al
        if (x !== undefined && y !== undefined && rotate !== undefined) {
            card.style.transform = `translate(${x}vw, ${y}vw) rotate(${rotate}deg)`; // kartın stilini güncelle
        }
    });

    // spltpCrds.forEach((card, index) => {
    //     const { x, y, rotate } = cardpositions[index]; // positions dizisinden konum ve dönüş değerlerini al
    //     if (x !== undefined && y !== undefined && rotate !== undefined) {
    //         card.style.transform = `translate(${x}vw, ${y}vw) rotate(${rotate}deg)`; // kartın stilini güncelle
    //     }
    // });
    

    
