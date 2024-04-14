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

function getUserBoard(){
    // C.) FILL CODE
    // let username = document.getElementById("username-input").textContent;
    // username = name;
    var name = sessionStorage.getItem('username');
    console.log(name)
    return name;
}

function setUserAvatarBoard(avatarnumber){
    switch (avatarnumber){
        case 1: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 2: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 3: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 4: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 5: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 6: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 7: sessionStorage.setItem('avatarImage', "images\bug-logo.png");
        case 8: sessionStorage.setItem('avatarImage', "images\bug-logo.png");

        default:
            sessionStorage.setItem('avatarImage', "images\bug-logo.png");
            break;
    }
}

function getUserAvatarBoard(){
    var avatarImage = sessionStorage.getItem('avatarImage')
    console.log(avatarImage);
    return avatarImage;
}

 function setAvatar(i){
    avatarPick = i;
    setUserAvatarBoard(i);
    console.log(sessionStorage.getItem('avatarImage'));
}

 function handleDivClick(ClickedDiv){
    if(currentActiveDiv !== null){
        currentActiveDiv.style.backgroundColor = '';
    }
    currentActiveDiv = ClickedDiv;
    currentActiveDiv.style.backgroundColor = 'red';
}


// leaderboard.html page
 function setLeaderboard(){
    // B.) FILL CODE
}





