// Set pages contents
let avatarPick = 0;
let currentActiveDiv = null;

// game.html page
export function setMiniLeaderboard(){
    // B.) FILL CODE
}

export function setUserBoard(){
    // C.) FILL CODE
    let username = document.getElementById("username-input").textContent;
    console.log(username)
}

export function setAvatar(i){
    avatarPick = i;

}

export function handleDivClick(event){
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
export function setLeaderboard(){
    // B.) FILL CODE
}





