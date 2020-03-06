const playerCountLabel = document.querySelector(".playercount-label");
const playerCountSlider = document.querySelector(".player-count");
const panelsContainer = document.querySelector(".panels-container");

let panels = [];
let playerCount = 2;
let currentPlayer = 1;

playerCountSlider.addEventListener("input", handlePlayerCountChange);

function handlePlayerCountChange(e) {
    createPanels(e.target.value);
    playerCountLabel.textContent = `Players: ${e.target.value}`;
}

function createPanels(newPlayerCount) {
    let panelsHTML = ""

    for (let i = 0; i < newPlayerCount; i++) {
        panelsHTML += `
            <div class="panel player${i+1}">
                <h3 class="playername player${i+1}">Player ${i+1}</h3>
                <p class="history player${i+1}"></p>
                <p class="score player${i+1}">501</p>
                <input type="number" class="score-input player${i+1}">
            </div>
        `;
    }
    panelsContainer.innerHTML = panelsHTML;

    panels = document.querySelectorAll(".panel");
    const scoreInputs = document.querySelectorAll(".score-input");

    scoreInputs.forEach(scoreInput => {
        scoreInput.addEventListener("keydown", handleInput);
        scoreInput.addEventListener("click", handleClicked);
    });

    const nameLabels = document.querySelectorAll(".playername");

    nameLabels.forEach(nameLabel => {
        nameLabel.addEventListener("dblclick", nameChange);
    });

    playerCount = newPlayerCount;
    currentPlayer = 1;
    setActive(currentPlayer);
}

function nameChange(e) {
    const newName = prompt("Please enter your name");

    if (newName != null) {
        e.target.textContent = newName;
    }
}

function handleInput(e) {
    if (e.keyCode == 13 || e.which == 13) {
        if(!e.target.value) {
            return
        }

        const scoreLabel = e.target.previousElementSibling;

        const oldScore = parseInt(scoreLabel.textContent);
        const roundScore = parseInt(e.target.value);

        if (roundScore > 180) {
            return;
        }

        const newScore = oldScore - roundScore;

        if (newScore < 0) {
            return;
        }

        scoreLabel.textContent = newScore;

        if (newScore === 0) {
            const winner = document.querySelector(`.playername.player${currentPlayer}`).textContent;
            const response = confirm(`${winner} wins the match!\nNew game?`);
            if (response == true) {
                newGame();
            }
            return;
        }

        let history = document.querySelector(`.history.player${currentPlayer}`);
        if (!history.textContent) {
            history.textContent += `${e.target.value}`;
        } else {
            history.textContent += `, ${e.target.value}`;
        }
        
        currentPlayer++;
        if (currentPlayer > playerCount) {
            currentPlayer = 1;
        }
        
        e.target.value = "";
        setActive(currentPlayer);
    }
}

function handleClicked(e) {
    currentPlayer = e.target.classList.value.substr(-1);
    setActive(currentPlayer);
}

function setActive(currentPlayer) {
    panels.forEach(panel => {
        panel.classList.remove("active");
    });
    document.querySelector(`.panel.player${currentPlayer}`).classList.add("active");
    document.querySelector(`.score-input.player${currentPlayer}`).focus();
}

function newGame() {
    const scoreLabels = document.querySelectorAll(".score");
    scoreLabels.forEach(scoreLabel => {
        scoreLabel.textContent = "501";
    });

    
    const histories = document.querySelectorAll(".history");
    histories.forEach(history => {
        history.textContent = "";
    });

    const scoreInputs = document.querySelectorAll(".score-input");

    scoreInputs.forEach(scoreInput => {
        scoreInput.value = "";
    });
    
    currentPlayer = 1;
    setActive(currentPlayer);
}

createPanels(playerCount);
setActive(currentPlayer);