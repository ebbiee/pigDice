document.addEventListener('DOMContentLoaded', function () {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");    
    const score0 = document.getElementById("player-1-score");
    const score1 = document.getElementById("player-2-score");
    const player1Current = document.getElementById("player-1-current");
    const player2Current = document.getElementById("player-2-current");
    const cube = document.getElementById("cube");
    const btnRoll = document.querySelector("#roll-dice");
    const btnHold = document.querySelector(".hold");
    
    
    let scores, currentScore, activePlayer, playing;
    function init(){
        scores = [0, 0];
        currentScore = 0; 
        activePlayer = 0; 
        playing = true;
        score0.textContent = 0;
        score1.textContent = 0;
        player1Current.textContent = 0;
        player2Current.textContent = 0;
        player1.classList.add('active'); 
        player2.classList.remove('active');
        cube.style.transform = `rotateX(0deg) rotateY(0deg)`;
        document.querySelector('.winnerdeclaration').textContent = '';
    }
    function switchPlayer(){
        document.getElementById(`player-${activePlayer + 1}-current`).textContent = 0;
        currentScore = 0;
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        player1.classList.toggle("active");
        player2.classList.toggle("active");
    }

    function getDiceRotation(diceNumber) {
        switch (diceNumber) {
            case 1:
                return `rotateX(0deg) rotateY(0deg)`; // Front
            case 2:
                return `rotateX(0deg) rotateY(180deg)`; // Back
            case 3:
                return `rotateX(0deg) rotateY(-90deg)`; // Left
            case 4:
                return `rotateX(0deg) rotateY(90deg)`; // Right
            case 5:
                return `rotateX(-90deg) rotateY(0deg)`; // Top
            case 6:
                return `rotateX(90deg) rotateY(0deg)`; // Bottom
        }
    }

    btnRoll.addEventListener("click", function () {
        if (playing) {
            const diceNumber = Math.floor(Math.random() * 6) + 1;
            cube.style.transform = getDiceRotation(diceNumber);
            if (diceNumber !== 1) {
                currentScore += diceNumber;
                document.getElementById(`player-${activePlayer + 1}-current`).textContent =
                currentScore;
            } else {
                switchPlayer();
            }
        }
    });
    btnHold.addEventListener("click", function(){
        if (playing){
            scores[activePlayer] += currentScore;
            
            document.getElementById(`player-${activePlayer + 1}-score`).textContent =
            scores[activePlayer];
            if (scores[activePlayer] >= 100){
                playing = false;
            }
            if(scores[activePlayer] >= 100){
                document.querySelector('.winnerdeclaration').textContent = `Player ${activePlayer + 1} is the winner `;
                switchPlayer = false
            }else{
                switchPlayer()
            }
            
        }
    })
    init()
    document.getElementById("new-game").addEventListener("click", function(){
        init();
    })
})