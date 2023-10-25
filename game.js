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
const dynamicFields = document.getElementById("playerSelectOptions");
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


document.addEventListener('DOMContentLoaded', function () {
    const inputElements = document.querySelectorAll('#playerOptions input');
    inputElements.forEach((input) => {
        input.value = '';
    });
});
startGameBtn.addEventListener("click", function () {
    const inputElements = dynamicFields.getElementsByTagName('input');
    let playerDetailsDisplay = document.getElementById('playerDetailsDisplay');
    playerDetailsDisplay.innerHTML = ''; // Clear any existing content
    cube.style.display = 'block';

    
    for (let i = 0; i < inputElements.length && i < selectedValue; i++) {
        let playerDiv = document.createElement('div');
        let playerName = document.createElement('span');
        let colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = colors[i % colors.length];
        playerName.textContent = inputElements[i].value || `Player ${i + 1}`;
        playerDiv.appendChild(playerName);
        playerDiv.appendChild(colorBox);
        playerDiv.style.marginBottom = '10px';
        playerDiv.style.marginRight = '10px';

        playerDetailsDisplay.appendChild(playerDiv);

        var  piece= document.createElement('div');
        piece.style.position = 'relative';
        piece.style.transition = 'all linear 0.5s';
        piece.style.left = '-62px';
        var correction=[-10,-5,0,10];
        // piece.style.zIndex = '2';
        piece.id = playerName.textContent;
        piece.style.backgroundColor = colors[i % colors.length];
        document.body.appendChild(piece);
        piece.classList.add('player-piece');
        piece.style.backgroundColor = colors[i % colors.length] ;
            document.getElementById('player-piece-container').appendChild(piece);

            playerDetails.push({
                name: playerName.textContent,
                sum: 0,
                color: colors[i % colors.length],
                player_piece :piece,
                correctionValue:correction[i % correction.length]
            });
        
    }


    // Hide the form and the selectOption dropdown
    dynamicFields.style.display = 'none';
    document.getElementById('playerOptions').style.display = 'none';
    startGameBtn.textContent = 'Restart'; // Change button text to 'Restart'
    startGameBtn.style.background = 'Red';
    startGameBtn.style.top = '300px';
    // Add a reload function after a short delay
    startGameBtn.addEventListener('click', function () {
        setTimeout(() => {
            location.reload(); // Reload the page after a short delay on 'Restart' button click
        }, 100);
    });

    diceCont.style.display = 'block'; // Show the diceCont div
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

// function play(player, diceValue) {
//     const newPosition = player.sum + diceValue;

//     if (newPosition > 100) {
//         // Player cannot move beyond position 100
//         return;
//     }

//     if (snakesAndLadders[newPosition]) {
//         const newPositionAfterSnakeOrLadder = snakesAndLadders[newPosition];
//         movePlayer(player, newPositionAfterSnakeOrLadder);
//         alert(`${player.name} landed on a snake or ladder and moved to position ${newPositionAfterSnakeOrLadder}`);
//     } else {
//         movePlayer(player, newPosition);
//     }

//     if (player.sum === 100) {
//         alert(`${player.name} won the game!`);
//         location.reload();
//     }
// }
function play(currentPlayer, currentValue)
{
    let playerSum = currentPlayer.sum;
    let correction = currentPlayer.correctionValue;
   
    
    playerSum = playerSum + currentValue

        if (playerSum > 100) {
            playerSum = playerSum - sum
        }

        if (playerSum == 1) {
            playerSum = 38
        }
        if (playerSum == 4) {
            playerSum = 14
        }
        if (playerSum == 9) {
            playerSum = 31
        }
        if (playerSum == 21) {
            playerSum = 42
        }
        if (playerSum == 51) {
            playerSum = 67
        }
        if (playerSum == 72) {
            playerSum = 91
        }
        if (playerSum == 80) {
            playerSum = 99
        }

        //snakes
        if (playerSum == 17) {
            playerSum = 7
        }
        if (playerSum == 54) {
            playerSum = 34
        }
        if (playerSum == 64) {
            playerSum = 60
        }
        if (playerSum == 62) {
            playerSum = 19
        }
        if (playerSum == 87) {
            playerSum = 36
        }
        if (playerSum == 93) {
            playerSum = 73
        }
        if (playerSum == 95) {
            playerSum = 75
        }
        if (playerSum == 98) {
            playerSum = 79
        }

      
        currentPlayer.sum= playerSum
     

        document.getElementById(`${currentPlayer.name}`).style.transition = `linear all .5s`
        
        updatePosition(currentPlayer.name, playerSum, correction);


    
}

function positionToPixels(playerName,position) {
    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;
    let leftPosition = col * 60;
    let topPosition = row * 60;

    if (row % 2 !== 0) {
        leftPosition = (9 - col) * 60;
    }

      let verticalOffset = 0;
    // if (playerName === playerDetails[0].name) {
    //     verticalOffset = 5; // Move the first player 5 pixels down
    // } else if (playerName === playerDetails[2].name) {
    //     verticalOffset = -5; // Move the third player 5 pixels up
    // } else
    if (playerName === playerDetails[0].name) {
        verticalOffset = 0; // Move the first player 5 pixels down
    } else if (playerDetails.length > 2 && playerName === playerDetails[2].name) {
        verticalOffset = -5; // Move the third player 5 pixels up
    } else if (playerDetails.length > 3 && playerName === playerDetails[3].name) {
        verticalOffset = -20; // Move the fourth player 10 pixels up
    }

    return { left: leftPosition + 20, top: topPosition + verticalOffset };
}

function updatePosition(playerName, playerSum, correction) {
    if(playerSum<=10)
    {
        const position = positionToPixels(playerName,playerSum);
        const playerPiece = document.getElementById(playerName);
        playerPiece.style.transition = `linear all .5s`;
        playerPiece.style.left = position.left + 'px';
        playerPiece.style.top = position.top + 'px';
    }
    else {
    
            numarr = Array.from(String(playerSum))
            n1 = eval(numarr.shift())
            n2 = eval(numarr.pop())
            // console.log(n1, n2)
    
            if (n1 % 2 != 0) {
    
                if (n2 == 0) {
                    document.getElementById(`${playerName}`).style.left = `${(9) * 62}px`
                    document.getElementById(`${playerName}`).style.top = `${(-n1 + 1) * 62 - correction}px`
                }
                else {
                    document.getElementById(`${playerName}`).style.left = `${(9 - (n2 - 1)) * 62}px`
                    document.getElementById(`${playerName}`).style.top = `${-n1 * 62 - correction}px`
    
                }
    
            }
            else if (n1 % 2 == 0) {
                if (n2 == 0) {
    
                    document.getElementById(`${playerName}`).style.left = `${(0) * 62}px`
                    document.getElementById(`${playerName}`).style.top = `${(-n1 + 1) * 62 - correction}px`
                }
                else {
    
                    document.getElementById(`${playerName}`).style.left = `${(n2 - 1) * 62}px`
                    document.getElementById(`${playerName}`).style.top = `${-n1 * 62 - correction}px`
                }
    
            }
        }
}

let  = document.getElementById('cube');
cube.style.display = 'none';
let dice = document.getElementById('dice');
let angleArray = [[0, 0, 0], [-310, -362, -38], [-400, -320, -2], [135, -217, -88], [-224, -317, 5], [-47, -219, -81], [-133, -360, -53]];

function rollCubeAndDisplaySameNumber() {
    cube.style.animation = 'animate 1.4s linear';

    const randomAngle = Math.floor(Math.random() * (6 - 1 + 1) + 1);;
    const randomDiceNumber = randomAngle;

    cube.style.transform = 'rotateX(' + angleArray[randomAngle][0] + 'deg) rotateY(' + angleArray[randomAngle][1] + 'deg) rotateZ(' + angleArray[randomAngle][2] + 'deg)';
    cube.style.transition = '1s linear';

    cube.addEventListener('animationend', function (e) {
        cube.style.animation = '';
    });

    // dice.textContent = randomDiceNumber;

    // document.getElementById("dice").innerText = randomDiceNumber;

    const currentPlayerIndex = (tog - 1) % selectedValue;
    document.getElementById('tog').innerText = `${playerDetails[currentPlayerIndex].name}'s Turn: `;

    if (playerDetails[currentPlayerIndex].sum === 100) {
        winSound.play();
        alert(`${playerDetails[currentPlayerIndex].name} Won !!`);
        location.reload();
    }

    play(playerDetails[currentPlayerIndex], randomDiceNumber);

    tog += 1;
}

cube.addEventListener('click', rollCubeAndDisplaySameNumber);
document.getElementById('diceBtn').addEventListener('click', rollCubeAndDisplaySameNumber);



