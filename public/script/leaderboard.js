import { getPlayerSortByScore } from "./api.js"
/** @typedef {import("./config.js").Player} Player*/
export async function fetchAndDrawLeaderboard(){
    console.log("fetch")
    const players = await getPlayerSortByScore()
    console.log(players)
    drawLeaderBoard(players)
}
/**@param {Player[]} players */
function drawLeaderBoard(players){
    let leaderBoard = document.getElementById("leaderboard-container")
    // Get the current path
    const path = document.location.pathname; // or window.location.pathname

    // Split the path by '/'
    const pathParts = path.split('/');

    // Get the last part of the path, which should be the filename
    const filename = pathParts[pathParts.length - 1];
    if(filename == "game.html"){
        for(const player of players){
            var user = document.createElement("p")
            user.textContent = (players.indexOf(player)+1)+ ". " + player.name + " " + player.score
            leaderBoard.appendChild(user)
        }
    }else{
        for(const player of players){
            var user = document.createElement("div")
            for(const _class of "flex width-80 height-20 background-gray rounded-bg items-center".split(' '))
                user.classList.add(_class)
            user.classList.add("justify-center")
            user.textContent = (players.indexOf(player)+1)+ ". " + player.name + " " + player.score
            leaderBoard.appendChild(user)
        }
    }
}