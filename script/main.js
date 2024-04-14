// Set pages contents
let avatarPick = 0;
let currentActiveDiv = null;
let username = "Username";

// game.html page
 function setMiniLeaderboard(){
    // B.) FILL CODE
}

function setUserBoard(name){
    // C.) FILL CODE
    // let username = document.getElementById("username-input").textContent;
    // username = name;
    sessionStorage.setItem('username', name);
    console.log(name);
}

function getUserBoard(name){
    // C.) FILL CODE
    // let username = document.getElementById("username-input").textContent;
    // username = name;
    var name = sessionStorage.getItem('username');
    return name;
}


 function setAvatar(i){
    avatarPick = i;

}

 function handleDivClick(event){
    const ClickedDiv = event.target;
    if(currentActiveDiv !== null){
        currentActiveDiv.style.backgroundColor = '';
    }
    currentActiveDiv = ClickedDiv;
    currentActiveDiv.style.backgroundColor = 'red';
}

const container = document.getElementById("container");
container.addEventListener('click', handleDivClick);

// leaderboard.html page
 function setLeaderboard(){
    // B.) FILL CODE
}





