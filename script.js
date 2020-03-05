const playerCountSlider = document.querySelector(".player-count");
const panelsContainer = document.querySelector(".panels-container");

let panels = [];
let playerNames = [];
let playerCount = 2;
let currentPlayer = 1;

playerCountSlider.addEventListener("input", handlePlayerCountChange);

function handlePlayerCountChange(e) {
    createPanels(e.target.value);
}

function createPanels(newPlayerCount) {
    let panelsHTML = ""

    for (let i = 0; i < newPlayerCount; i++) {
        panelsHTML += `
            <div class="panel player${i+1}">
                <p class="playername player${i+1}">Player ${i+1}</p>
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
        let newScore = parseInt(scoreLabel.textContent) - parseInt(e.target.value);

        scoreLabel.textContent = newScore;

        if (newScore === 0) {
            alert(`Player ${currentPlayer} wins the match!`);
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

function setActive(currentPlayer) {
    panels.forEach(panel => {
        panel.classList.remove("active");
    });
    document.querySelector(`.panel.player${currentPlayer}`).classList.add("active");
    document.querySelector(`.score-input.player${currentPlayer}`).focus();
}

createPanels(playerCount);
setActive(currentPlayer);