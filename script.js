let boxes=document.querySelectorAll('.box');
let winMsg=document.querySelector('.win-msg');
let msg=document.querySelector('#msg');
let resetBtn=document.querySelector('#reset-btn');
let newGameBtn=document.querySelector('#new-game');
let playerX=document.getElementById('playerX');
let playerO=document.getElementById('playerO');
playerX.classList.add('playerActive');

let turnX=true;
let won=false;

const winPatterns=
[
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

boxes.forEach((box)=>{
    box.addEventListener('click',function handleClick(){
        if (box.innerHTML === "") {
            const currentPlayer = turnX ? "X" : "O";
            box.innerHTML = currentPlayer;
            box.style.color = turnX ? '#1892EA' : '#A737FF';
            turnX = !turnX;
            playerX.classList.toggle('playerActive');
            playerO.classList.toggle('playerActive');
            checkWinner();
        }
    })
});



function checkWinner(){
    for (const pattern of winPatterns) {
        const pos1=boxes[pattern[0]].innerText;
        const pos2=boxes[pattern[1]].innerText;
        const pos3=boxes[pattern[2]].innerText;
        if(pos1!=="" && pos2!=="" && pos3!==""){
            if(pos1===pos2 && pos2===pos3){
                console.log(pos1,"is the winner");
                won=true;
                showWinner(pos1);
                return;
            }
        }

    }
    if (!won) {
        let filledBoxes = Array.from(boxes).filter(box => box.innerText !== "").length;
        if (filledBoxes === boxes.length) {
            showWinner("Draw");
            return;
        }
    }
}

function showWinner(winner){
    if(winner==="Draw"){
        msg.innerHTML = `Match Draw !`;
    }
    else{
        msg.innerHTML= `Congratulations the Winner is ${winner}`;
    }

    winMsg.classList.remove("hide");
    boxes.forEach(box => box.classList.add('disabled'));
}

function resetGame(){
    turnX=true;
    boxes.forEach(box => {
        box.classList.remove('disabled');
        box.innerHTML="";
    });
    playerO.classList.remove('playerActive');
    playerX.classList.add('playerActive');
    winMsg.classList.add("hide");
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
