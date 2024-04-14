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
    let leaderBoardMobile = document.getElementById("leaderboard-container-mobile")
    // Get the current path
    const path = document.location.pathname; // or window.location.pathname

    // Split the path by '/'
    const pathParts = path.split('/');

    // Get the last part of the path, which should be the filename
    const filename = pathParts[pathParts.length - 1];
    if(filename == "game.html"){
        var thElements = document.querySelectorAll('#leaderboard-table th');
        var thElementsMobile = document.querySelectorAll('#leaderboard-table-mobile th');
        for(const player of players){
            var rowMobile = document.createElement("tr"); // Create row for mobile leaderboard
            var rowDesktop = document.createElement("tr"); // Create row for desktop leaderboard

            var username = document.createElement("td");
            var rank = document.createElement("td");
            var score = document.createElement("td");

            if(thElements[1].offsetWidth != 0){
                rank.textContent = (players.indexOf(player) + 1) + ".";
                rank.style.width = thElements[1].offsetWidth + 'px';
                username.textContent = player.name;
                username.style.width = thElements[2].offsetWidth + 'px';
                score.textContent = player.score;
                score.style.width = thElements[3].offsetWidth + 'px';
            }else{
                rank.textContent = (players.indexOf(player) + 1) + ".";
                rank.style.width = thElementsMobile[1].offsetWidth + 'px';
                username.textContent = player.name;
                username.style.width = thElementsMobile[2].offsetWidth + 'px';
                score.textContent = player.score;
                score.style.width = thElementsMobile[3].offsetWidth + 'px';
            }

            // Append cells to rows
            rowMobile.appendChild(rank.cloneNode(true));
            rowMobile.appendChild(username.cloneNode(true));
            rowMobile.appendChild(score.cloneNode(true));

            rowDesktop.appendChild(rank.cloneNode(true));
            rowDesktop.appendChild(username.cloneNode(true));
            rowDesktop.appendChild(score.cloneNode(true));

            // Append rows to leaderboards
            leaderBoardMobile.appendChild(rowMobile);
            leaderBoard.appendChild(rowDesktop);
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