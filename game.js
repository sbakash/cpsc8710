let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let playerDetails = []; // Array to store player details
let selectedValue = 2; // Default value for selected players
const colors = ['yellow', 'red', 'green', 'blue']; // Array of colors for players


let tog = 1;

const startGameBtn = document.getElementById("startGameBtn");
const dynamicFields = document.getElementById("dynamicFields");
const diceCont = document.getElementById("diceCont");


document.getElementById("selectOption").addEventListener("change", function () {
    selectedValue = parseInt(this.value);
    dynamicFields.innerHTML = ''; // Clear any existing fields

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

    startGameBtn.style.display = 'block'; // Show the Start Game button
});

startGameBtn.addEventListener("click", function () {
    const inputElements = dynamicFields.getElementsByTagName('input');
    let playerDetailsDisplay = document.getElementById('playerDetailsDisplay');
    playerDetailsDisplay.innerHTML = ''; // Clear any existing content

    
    for (let i = 0; i < inputElements.length && i < selectedValue; i++) {
        let playerDiv = document.createElement('div');
        let playerName = document.createElement('span');
        let colorBox = document.createElement('div');
        let choosedColor = colors[i % colors.length]
        

        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = choosedColor;
        playerName.textContent = inputElements[i].value || `Player ${i + 1}`;
        playerDiv.appendChild(playerName);
        playerDiv.appendChild(colorBox);
        
        playerDetails.push({
            name: playerName.textContent,
            sum: 0,
            color:  choosedColor
        });

        var peice = document.createElement('div');
        peice.classList.add('player-piece');
        peice.style.backgroundColor = choosedColor;
            document.getElementById('player-piece-container').appendChild(peice);

    }


    // Hide the form and the selectOption dropdown
    dynamicFields.style.display = 'none';
    document.getElementById('playerOptions').style.display = 'none';
    startGameBtn.textContent = 'Restart'; // Change button text to 'Restart'

    // Add a reload function after a short delay
    startGameBtn.addEventListener('click', function () {
        setTimeout(() => {
            location.reload(); // Reload the page after a short delay on 'Restart' button click
        }, 100);
    });

    diceCont.style.display = 'block'; // Show the diceCont div
});

document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();
    const num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    document.getElementById("dice").innerText = num;

    const currentPlayerIndex = (tog - 1) % selectedValue;
    document.getElementById('tog').innerText = `${playerDetails[currentPlayerIndex].name}'s Turn: `;

    // Call the play function here
    // play(playerDetails[currentPlayerIndex], num);

    if (playerDetails[currentPlayerIndex].sum === 100) {
        winSound.play();
        alert(`${playerDetails[currentPlayerIndex].name} Won !!`);
        location.reload();
    }

    tog += 1;
});

let cube = document.getElementById('cube');
let dice = document.getElementById('dice');
let angleArray = [[0, 0, 0], [-310, -362, -38], [-400, -320, -2], [135, -217, -88], [-224, -317, 5], [-47, -219, -81], [-133, -360, -53]];

// Function to roll the cube and display the same number on the dice
function rollCubeAndDisplaySameNumber() {
    cube.style.animation = 'animate 1.4s linear';

    const randomAngle = Math.floor(Math.random() * 6) + 1;
    const randomDiceNumber = randomAngle; // Use the same random number as the cube

    cube.style.transform = 'rotateX(' + angleArray[randomAngle][0] + 'deg) rotateY(' + angleArray[randomAngle][1] + 'deg) rotateZ(' + angleArray[randomAngle][2] + 'deg)';
    cube.style.transition = '1s linear';

    cube.addEventListener('animationend', function (e) {
        cube.style.animation = '';
    });

    // Display the same random number on the dice
    dice.textContent = randomDiceNumber;
}

// Attach the function to both cube click and roll button click events
cube.addEventListener('click', rollCubeAndDisplaySameNumber);
document.getElementById('diceBtn').addEventListener('click', rollCubeAndDisplaySameNumber); 


