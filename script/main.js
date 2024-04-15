import { fetchAndDrawLeaderboard } from "./leaderboard.js";
// Set pages contents
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDrawLeaderboard()
  });

// game.html page
export function setMiniLeaderboard(){

let avatarPick = 0;
let username = "Username";



// game.html page
 function setMiniLeaderboard(){
    // B.) FILL CODE
}

function getUsername(){
    var name = sessionStorage.getItem('username');
    return name;
}

function setUsername(name){
    sessionStorage.setItem('username', name);
}

function getAvatarId(){
    var avatarId = sessionStorage.getItem('avatarId');
    return avatarId;
}

function setAvatarId(id){
    sessionStorage.setItem('avatarId', id);
}

function getCurrentAvatarImg(){
    switch (getAvatarId()){
        case 1: return "images/bug-logo.png";
        case 2: return "images/bug-logo.png";
        case 3: return "images/bug-logo.png";
        case 4: return "images/bug-logo.png";
        case 5: return "images/bug-logo.png";
        case 6: return "images/bug-logo.png";
        case 7: return "images/bug-logo.png";
        case 8: return "images/bug-logo.png";
        default:
            return "images/bug-logo.png";
    }
}


// leaderboard.html page
 function setLeaderboard(){
    // B.) FILL CODE
}





