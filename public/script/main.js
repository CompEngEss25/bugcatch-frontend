import { fetchAndDrawLeaderboard } from "./leaderboard.js";
import {createNewPlayer, getPlayerByName, createNewResult, getLeaderboard, setNewHighScore, setNewAvatar} from "./apiconnect.js";

// document.addEventListener("DOMContentLoaded", () => {
//     fetchAndDrawLeaderboard()
// });

// Fields

let currentActiveDiv;

// Username & Avatar getter-setters

export function getUsername(){
    var name = sessionStorage.getItem('username');
    return name;
}

export function setUsername(name){
    sessionStorage.setItem('username', name);
}

export function getAvatarId(){
    var avatarId = sessionStorage.getItem('avatarId');
    return avatarId;
}

export function setAvatarId(id){
    sessionStorage.setItem('avatarId', id);
}

export function getHighScore(){
    var score = sessionStorage.getItem('highScore');
    return score;
}
export function setHighScore(score){
    sessionStorage.setItem('highScore', score);
}

export function getCurrentAvatarImg(){
    console.log(getAvatarId());
    return "images/avatars/" + getAvatarId()+ ".png";
}

// index.html handlers

export async function handlePlayClick(){
    const username = document.getElementById("username-input").value;
    setUsername(username);

    const player = await getPlayerByName(username);
    if (player.length == 0){
        // New player
        await createNewPlayer(username, getAvatarId())
        setHighScore(0);
    }
    else {
        // Old player
        await setNewAvatar(username, getAvatarId());
        setHighScore(player[0].highestScore)
    }
    window.location.href = "game.html";
    
}


export function initSelectedAvatar(){
    if (getAvatarId()){
    currentActiveDiv = document.getElementById("avatar-" + getAvatarId());
    }
    else {
    currentActiveDiv = document.getElementById("avatar-1");
    }
    handleDivClick(currentActiveDiv);
}


export function handleDivClick(ClickedDiv){
    const avatarId = (ClickedDiv.id).slice(7);
    console.log(avatarId)
    setAvatarId(avatarId);
    if(currentActiveDiv !== null){
        // currentActiveDiv.style.backgroundColor = '';
        currentActiveDiv.classList.remove("opacity-100");
        currentActiveDiv.classList.add("opacity-25");
    }
    currentActiveDiv = ClickedDiv;
    // currentActiveDiv.style.backgroundColor = 'red';
    currentActiveDiv.classList.remove("opacity-25");
    currentActiveDiv.classList.add("opacity-100");
}






