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
let p1sum = 0
let p2sum = 0


function play(player, psum, correction, num) {
    let sum
    if (psum == 'p1sum') {

        p1sum = p1sum + num

        if (p1sum > 100) {
            p1sum = p1sum - num
            // sum = p1sum
        }

        if (p1sum == 1) {
            p1sum = 38
        }
        if (p1sum == 4) {
            p1sum = 14
        }
        if (p1sum == 9) {
            p1sum = 31
        }
        if (p1sum == 21) {
            p1sum = 42
        }
        if (p1sum == 28) {
            p1sum = 84
        }
        if (p1sum == 17) {
            p1sum = 7
        }
        if (p1sum == 54) {
            p1sum = 34
        }
        if (p1sum == 62) {
            p1sum = 19
        }
        if (p1sum == 51) {
            p1sum = 67
        }
        if (p1sum == 64) {
            p1sum = 60
        }
        if (p1sum == 72) {
            p1sum = 91
        }
        if (p1sum == 80) {
            p1sum = 99
        }
        if (p1sum == 87) {
            p1sum = 36
        }
        if (p1sum == 93) {
            p1sum = 73
        }
        if (p1sum == 95) {
            p1sum = 75
        }

        if (p1sum == 98) {
            p1sum = 79
        }

        sum = p1sum



    }

    if (psum == 'p2sum') {

        p2sum = p2sum + num

        if (p2sum > 100) {
            p2sum = p2sum - num
            // sum = p1sum
        }
        
        if (p2sum == 1) {
            p2sum  = 38
        }
        if (p2sum  == 4) {
            p2sum  = 14
        }
        if (p2sum  == 9) {
            p2sum  = 31
        }
        if (p2sum  == 21) {
            p2sum  = 42
        }
        if (p2sum  == 28) {
            p2sum  = 84
        }
        if (p2sum  == 17) {
            p2sum  = 7
        }
        if (p2sum  == 54) {
            p2sum  = 34
        }
        if (p2sum  == 62) {
            p2sum  = 19
        }
        if (p2sum  == 51) {
            p2sum  = 67
        }
        if (p2sum  == 64) {
            p2sum  = 60
        }
        if (p2sum  == 72) {
            p2sum  = 91
        }
        if (p2sum  == 80) {
            p2sum  = 99
        }
        if (p2sum  == 87) {
            p2sum  = 36
        }
        if (p2sum  == 93) {
            p2sum  = 73
        }
        if (p2sum  == 95) {
            p2sum  = 75
        }

        if (p2sum  == 98) {
            p2sum  = 79
        }
       

        sum = p2sum



    }


    document.getElementById(`${player}`).style.transition = `linear all .5s`





    if (sum < 10) {

        document.getElementById(`${player}`).style.left = `${(sum - 1) * 62}px`
        document.getElementById(`${player}`).style.top = `${-0 * 62 - correction}px`


    }

    else if (sum == 100) {
        winSound.play()
        if (player == 'p1') {
            alert("Red Won !!")
        }
        else if (player == 'p2') {
            alert("Yellow Won !!")
        }
        location.reload()
    }

    else {

        numarr = Array.from(String(sum))
        n1 = eval(numarr.shift())
        n2 = eval(numarr.pop())
        // console.log(n1, n2)

        if (n1 % 2 != 0) {

            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`

            }

        }
        else if (n1 % 2 == 0) {
            if (n2 == 0) {

                document.getElementById(`${player}`).style.left = `${(0) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {

                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`
            }

        }



    }
}


document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play()
    num = Math.floor(Math.random() * (6 - 1 + 1) + 1)
    document.getElementById("dice").innerText = num


    if (tog % 2 != 0) {
        document.getElementById('tog').innerText = "Yellow's Turn : "
        play('p1', 'p1sum', 0, num)

    }

    else if (tog % 2 == 0) {
        document.getElementById('tog').innerText = "Red's Turn : "

        play('p2', 'p2sum', 55, num)

    }

    tog = tog + 1




})


