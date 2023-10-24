let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let playerDetails = [];
let selectedValue = 2;
const colors = ['yellow', 'red', 'green', 'blue'];
const snakesAndLadders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84, 17: 7, 54: 34, 62: 19, 51: 67, 64: 60,
    72: 91, 80: 99, 87: 36, 93: 73, 95: 75, 98: 79
};

let tog = 1;

const startGameBtn = document.getElementById("startGameBtn");
const dynamicFields = document.getElementById("dynamicFields");
const diceCont = document.getElementById("diceCont");

document.getElementById("selectOption").addEventListener("change", function () {
    selectedValue = parseInt(this.value);
    dynamicFields.innerHTML = '';

    for (let i = 1; i <= selectedValue; i++) {
        const label = document.createElement('label');
        label.textContent = `Player ${i} Name:`;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `player${i}`;
        input.value = `Player ${i}`;
        dynamicFields.appendChild(label);
        dynamicFields.appendChild(input);
        dynamicFields.appendChild(document.createElement('br'));
    }

    startGameBtn.style.display = 'block';
});

startGameBtn.addEventListener("click", function () {
    const inputElements = dynamicFields.getElementsByTagName('input');
    let playerDetailsDisplay = document.getElementById('playerDetailsDisplay');
    playerDetailsDisplay.innerHTML = '';

    for (let i = 0; i < inputElements.length && i < selectedValue; i++) {
        let playerDiv = document.createElement('div');
        let playerName = document.createElement('span');
        let colorBox = document.createElement('div');
        let choosedColor = colors[i % colors.length];

        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = choosedColor;
        playerName.textContent = inputElements[i].value || `Player ${i + 1}`;
        playerDiv.appendChild(playerName);
        playerDiv.appendChild(colorBox);

        playerDetails.push({
            name: playerName.textContent,
            sum: 0,
            color: choosedColor
        });

        var peice = document.createElement('div');
        peice.classList.add('player-piece');
        peice.style.backgroundColor = choosedColor;
        document.getElementById('player-piece-container').appendChild(peice);
    }

    dynamicFields.style.display = 'none';
    document.getElementById('playerOptions').style.display = 'none';
    startGameBtn.textContent = 'Restart';

    startGameBtn.addEventListener('click', function () {
        setTimeout(() => {
            location.reload();
        }, 100);
    });

    diceCont.style.display = 'block';
});

function updatePlayerInfo(player) {
    const playerDetailsDisplay = document.getElementById('playerDetailsDisplay');
    playerDetailsDisplay.innerHTML = `Current Player: ${player.name} | Current Position: ${player.sum}`;
}

function movePlayer(player, newPosition) {
    player.sum = newPosition;

    const playerPiece = document.querySelector(`.player-piece[style*="${player.color}"]`);
    playerPiece.style.transform = `translateX(${positionToPixels(newPosition)}px)`;

    updatePlayerInfo(player);
}

function positionToPixels(position) {
    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;
    if (row % 2 === 0) {
        return col * 60;
    } else {
        return (9 - col) * 60;
    }
}

function play(player, diceValue) {
    const newPosition = player.sum + diceValue;

    if (newPosition > 100) {
        // Player cannot move beyond position 100
        return;
    }

    if (snakesAndLadders[newPosition]) {
        const newPositionAfterSnakeOrLadder = snakesAndLadders[newPosition];
        movePlayer(player, newPositionAfterSnakeOrLadder);
        alert(`${player.name} landed on a snake or ladder and moved to position ${newPositionAfterSnakeOrLadder}`);
    } else {
        movePlayer(player, newPosition);
    }

    if (player.sum === 100) {
        alert(`${player.name} won the game!`);
        location.reload();
    }
}

document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();
    const num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    document.getElementById("dice").innerText = num;

    const currentPlayerIndex = (tog - 1) % selectedValue;
    document.getElementById('tog').innerText = `${playerDetails[currentPlayerIndex].name}'s Turn: `;

    if (playerDetails[currentPlayerIndex].sum === 100) {
        winSound.play();
        alert(`${playerDetails[currentPlayerIndex].name} Won !!`);
        location.reload();
    }

    play(playerDetails[currentPlayerIndex], num);

    tog += 1;
});

let cube = document.getElementById('cube');
let dice = document.getElementById('dice');
let angleArray = [[0, 0, 0], [-310, -362, -38], [-400, -320, -2], [135, -217, -88], [-224, -317, 5], [-47, -219, -81], [-133, -360, -53]];

function rollCubeAndDisplaySameNumber() {
    cube.style.animation = 'animate 1.4s linear';

    const randomAngle = Math.floor(Math.random() * 6) + 1;
    const randomDiceNumber = randomAngle;

    cube.style.transform = 'rotateX(' + angleArray[randomAngle][0] + 'deg) rotateY(' + angleArray[randomAngle][1] + 'deg) rotateZ(' + angleArray[randomAngle][2] + 'deg)';
    cube.style.transition = '1s linear';

    cube.addEventListener('animationend', function (e) {
        cube.style.animation = '';
    });

    dice.textContent = randomDiceNumber;
}

cube.addEventListener('click', rollCubeAndDisplaySameNumber);
document.getElementById('diceBtn').addEventListener('click', rollCubeAndDisplaySameNumber);



