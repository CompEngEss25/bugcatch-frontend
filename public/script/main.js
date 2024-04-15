import { fetchAndDrawLeaderboard } from "./leaderboard.js";
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDrawLeaderboard()
});

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

export function getCurrentAvatarImg(){
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

// index.html handlers

export function handlePlayClick(){
    const userText = document.getElementById("username-input");
    setUsername(userText.value);
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
    setAvatarId(avatarId);
    if(currentActiveDiv !== null){
        currentActiveDiv.style.backgroundColor = '';
    }
    currentActiveDiv = ClickedDiv;
    currentActiveDiv.style.backgroundColor = 'red';
}






