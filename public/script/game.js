// Game Instance Classes

//const Phaser = require("phaser"); fuck this

// A.) FILL CODE
import { getHighScore, setHighScore, getUsername} from "/script/main.js";
import {createNewPlayer, getPlayerByName, createNewResult, getLeaderboard, setNewHighScore, setNewAvatar} from "./apiconnect.js";


//for responsive
let e = document.getElementById('gameContainer').getBoundingClientRect();
console.log(e.width)
console.log(e.height)
var sizes = {
    width: e.width,
    height: e.height
}

// create gameScene
let gameScene = new Phaser.Scene('Game');


//set config
let config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    scene: gameScene,
    parent: 'gameContainer',
    //scale to fit the container
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    callbacks: {
        postBoot: function (game) {
          game.canvas.style.width = '100%';
          game.canvas.style.height = '100%';
        }
      },
    backgroundColor: '#FFFFFF' // color of scene background
}

//game variable
let score = 0;
let mode = 0; // 0; normal, 1; magnified, 2; x2, 3; moving, 4; shrink
let tim = 119;
let itemCount = 0;
let fc = 0;
let b1fc = 0;
let b2fc = 0;


//game function===========================================================
//random spawn
function getRandomX(){
    return Math.floor(Math.random()*sizes.width);
}
function getRandomY(){
    return Math.floor(Math.random()*sizes.height);
}
function getRandomR(){
    return Math.floor(Math.random()*360);
}
function relocate(clickedBug) {
    clickedBug.setPosition(getRandomX(), getRandomY());
    clickedBug.angle = getRandomR();
}


//on click event
function clickOnNormalBug(bug){
    score += 100;
    relocate(bug);
}
function clickOnUnnormalBug(bug){
    score += 150;
    relocate(bug);
}
function clickOnBug(bug){
    switch(mode){
        case 0:
            clickOnNormalBug(bug);
            break;
        case 1:
            clickOnNormalBug(bug);
            break;
        case 2:
            clickOnNormalBug(bug);
            score += 100;
            break;
        case 3:
            clickOnUnnormalBug(bug);
            break;
        case 4:
            clickOnUnnormalBug(bug);
            break;
        default:
            clickOnNormalBug(bug);
            mode = 0;
    }
}
function clickOnBg(){
    score -= 20;
}
function clickOnMagnify(){
    setItemInvisible();
    mode = 1;
    //perform effect
    gameScene.bug1.setScale(0.2);
    gameScene.bug2.setScale(0.2);

    //back to normal
    let t = setTimeout(backToNormal, 5000);
}
function clickOnX2(){
    setItemInvisible();
    mode = 2;
    let t = setTimeout(backToNormal, 5000);
}
function clickOnMove(){
    setItemInvisible();
    mode = 3;
    let t = setTimeout(backToNormal, 5000);

}
function clickOnShrink(){
    setItemInvisible();
    mode = 4;
    //perform effect
    gameScene.bug1.setScale(0.05);
    gameScene.bug2.setScale(0.05);

    //back to normal
    let t = setTimeout(backToNormal, 5000);
}

//function to get back to normal mode
function backToNormal(){
    mode = 0;
    gameScene.bug1.setScale(0.1);
    gameScene.bug2.setScale(0.1);

}

//set the score
function setScore(){
    gameScene.scoreTxt.setText(`Score : ${score}`);
}

//set the timer
function setTimer(){
    gameScene.timerTxt.setText(`Time : ${tim}`);
    tim -= 1;
}

//set all item invisible
function setItemInvisible(){
    gameScene.bigItem.visible = false;
    gameScene.x2Item.visible = false;
    gameScene.moveItem.visible = false;
    gameScene.shrinkItem.visible = false;
}

//relocate item
function relocateItem(it){
    it.setPosition(getRandomX(), getRandomY());
}
//spawn one item
function spawnItem(){
    let n = Math.floor(Math.random()*4);
    switch(n){
        case 0:
            relocateItem(gameScene.bigItem);
            gameScene.bigItem.visible = true;
            setInvisible(gameScene.bigItem);
            break;
        case 1:
            relocateItem(gameScene.x2Item);
            gameScene.x2Item.visible = true;
            setInvisible(gameScene.x2Item);
            break;
        case 2:
            relocateItem(gameScene.moveItem);
            gameScene.moveItem.visible = true;
            setInvisible(gameScene.moveItem);
            break;
        case 3:
            relocateItem(gameScene.shrinkItem);
            gameScene.shrinkItem.visible = true;
            setInvisible(gameScene.shrinkItem);
            break;
        default:
            relocateItem(gameScene.bigItem);
            gameScene.bigItem.visible = true;
            setInvisible(gameScene.bigItem);
    }
}
//show item for an interval of time
function setInvisible(it){
    let t = 5000;
    if (tim<35) t = 3500;
    if (tim<70) t = 4000;
    setTimeout(() => {
        it.visible = false;
    }, t);
    itemCount -= 1;
}

//check if the bug near edge
function checkBugNearEdge(bug){
    if (bug.x < 10 || bug.x > sizes.width - 10 || bug.y < 10 || bug.y > sizes.height - 10){
        relocate(bug);
    }
}

//gameOver
function gameOver(){
    // If new high score is achieved, save it do the database
    // Then for any cases, add game results
    console.log("Game ended !");
    if (score > getHighScore()){
        setNewHighScore(getUsername(), score);
        setHighScore(score);
    }
    window.location.href = "game.html";


    
}




// Phaser==============================================================================

function preload() {
    this.load.image('bg', 'images/assets/transparent.png');
    this.load.image('bug', 'images/assets/bug-logo.png');
    this.load.image('bigIt', 'images/assets/B.png');
    this.load.image('x2It', 'images/assets/X.png');
    this.load.image('moveIt', 'images/assets/M.png');
    this.load.image('shrinkIt', 'images/assets/S.png');
}

function create() {
    //set the transparent background---------------------------------------------------
    this.bg = this.add.sprite(0, 0, 'bg');
    this.bg.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
    this.bg.setScale(5);

    //set interactive
    this.bg.setInteractive();
    this.bg.on('pointerdown', function(){
        console.log('bg clicked');
        clickOnBg();
        setScore();
    });
    

    //set the bug-----------------------------------------------------------------------
    this.bug1 = this.add.sprite(getRandomX(), getRandomY(), 'bug');
    this.bug1.setScale(0.1);
    this.bug1.angle = getRandomR();

    this.bug2 = this.add.sprite(getRandomX(), getRandomY(), 'bug');
    this.bug2.setScale(0.1);
    this.bug2.angle = getRandomR();

    //set interactive
    this.bug1.setInteractive();
    this.bug1.on('pointerdown', function(){
        console.log('bug1 clicked');
        clickOnBug(gameScene.bug1);
        setScore();
        b1fc = 0;
    });

    this.bug2.setInteractive();
    this.bug2.on('pointerdown', function(){
        console.log('bug2 clicked');
        clickOnBug(gameScene.bug2);
        setScore();
        b2fc = 0;
    });


    //set the score text----------------------------------------------------------------
    this.scoreTxt = this.add.text(0.03*sizes.width, 10, 'Score : 0', {
        font: `${sizes.height*0.05}px Arial`,
        fill: '#000000'
    });


    //set the timer of the game---------------------------------------------------------
    this.timerTxt = this.add.text(0.03*sizes.width, 50, `Time : 120`, {
        font: `${sizes.height*0.05}px Arial`,
        fill: '#000000'
    });


    //set the item----------------------------------------------------------------------
    //big bug
    this.bigItem = this.add.sprite(getRandomX(), getRandomY(), 'bigIt');
    this.bigItem.setScale(0.2);

    //set big bug interactive
    this.bigItem.setInteractive();
    this.bigItem.on('pointerdown', function(){
        clickOnMagnify();
    });

    //X2
    this.x2Item = this.add.sprite(getRandomX(), getRandomY(), 'x2It');
    this.x2Item.setScale(0.2);

    //set X2 interactive
    this.x2Item.setInteractive();
    this.x2Item.on('pointerdown', function(){
        clickOnX2();
    });

    //move
    this.moveItem = this.add.sprite(getRandomX(), getRandomY(), 'moveIt');
    this.moveItem.setScale(0.2);

    //set move interactive
    this.moveItem.setInteractive();
    this.moveItem.on('pointerdown', function(){
        clickOnMove();
    });

    //shrink
    this.shrinkItem = this.add.sprite(getRandomX(), getRandomY(), 'shrinkIt');
    this.shrinkItem.setScale(0.2);

    //set shrink interactive
    this.shrinkItem.setInteractive();
    this.shrinkItem.on('pointerdown', function(){
        clickOnShrink();
    });

    //
    setItemInvisible();


}



function update() {
    //for moving item
    checkBugNearEdge(gameScene.bug1);
    checkBugNearEdge(gameScene.bug2);

    let speed = 2;
    if (mode === 3){
        gameScene.bug1.setPosition(gameScene.bug1.x + (Math.cos((gameScene.bug1.angle-90)*Math.PI/180)*speed), gameScene.bug1.y + (Math.sin((gameScene.bug1.angle-90)*Math.PI/180)*speed))
        gameScene.bug2.setPosition(gameScene.bug2.x + (Math.cos((gameScene.bug2.angle-90)*Math.PI/180)*speed), gameScene.bug2.y + (Math.sin((gameScene.bug2.angle-90)*Math.PI/180)*speed))
    }
    
    //for spawn item
    if (tim < 110 && mode === 0){
        fc += 1;
        if (fc > 180){
            fc = 0;
            if (itemCount < 3){
                itemCount += 1;
                spawnItem();
            }
        }
    }

    //higher score, bug stay less time
    if (mode === 0){
        let t = 300;
        if (score > 4000) t = 180;
        else if (score > 3000) t = 210;
        else if (score > 2000) t = 240;
        else if (score > 1000) t = 270;

        if (b1fc > t) {
            relocate(gameScene.bug1);
            b1fc = 0;
        }
        if (b2fc > t) {
            relocate(gameScene.bug2);
            b2fc = 0;
        }

        b1fc += 1;
        b2fc += 1;
    }

    //for responsive
    /*(function() {
        const gameId = document.getElementById("gameContainer"); // Target div that wraps the phaser game
        gameId.style.width = '100%'; // set width to 100%
        gameId.style.height = '100%'; // set height to 100%
    })(); // run function*/
}


//binding function to gameScene
gameScene.preload = preload;
gameScene.create = create;
gameScene.update = update;



//create game
let game = new Phaser.Game(config);

//make timer countdown
let gameTimer = setInterval(setTimer, 1000);

//game countdown to end
let gameTimeEnd = setTimeout(gameOver, 120 * 1000);
