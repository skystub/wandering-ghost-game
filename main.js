import './style.css'
import Phaser from 'phaser'
import {GameMap} from './Map.js'
const sizes = { //holds values of width and height
    width:15 * 32,
    height:11 * 32,
}

const speedDown = 100;

const gameStartDiv = document.querySelector("#gameStartDiv")
const gameStartBtn = document.querySelector("#gameStartBtn")
const gameEndDiv = document.querySelector("#gameEndDiv")
const gameWinLoseSpan = document.querySelector("#gameWinLoseSpan")
const gameEndScoreSpan = document.querySelector("#gameEndScoreSpan")

class GameScene extends Phaser.Scene{
    constructor(){
        super("scene-game");
        this.player;
        this.cursor;
        this.playerSpeed=160; 
        this.target;
        this.fires = 0;
        this.textScore;
        this.textTime;
        this.timedEvent;
        this.coinMusic;
        this.bgMusic;
        this.emitter;
        this.gameMap;
        //this.collectibles;
    }

    preload(){
        this.load.image('bg','/assets/bg.png');
        this.load.image('basket','/assets/basket.png');
        this.load.image("apple","/assets/apple.png");
        this.load.audio("coin", "/assets/coin.mp3");
        this.load.audio("bgMusic", "/assets/bgMusic.mp3");

        this.gameMap = new GameMap(this);
        this.gameMap.preload();
    }

    create(){
        // gameManager = new GameManager(this);
        // gameManager.initializeGame();

        this.coinMusic = this.sound.add("coin");
        this.bgMusic = this.sound.add("bgMusic");
        //this.bgMusic.play();
        //this.bgMusic.stop();

        this.add.image(0,0,"bg").setOrigin(0,0);

        this.player = this.physics.add
            .image(0,sizes.height - 100,"basket")
            .setOrigin(0.5,0.5);
        this.player.setScale(0.25);
        this.player.setSize(16,16)
            .setOffset(8,8);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(false)
        this.player.body.allowGravity = false;

        this.gameMap.create('LEVEL_1');

        this.physics.add.overlap(
            this.player,
            this.gameMap.collectibles,
            this.collectFire,
            null,
            this
        );


       //set player pos
        const spawnX = this.gameMap.tileSize * 1.5;
        const spawnY = sizes.height - this.gameMap.tileSize * 1.5;
        this.player.setPosition(spawnX, spawnY);

        this.scene.pause("scene-game")

        this.cursor = this.input.keyboard.createCursorKeys();

        // this.target = this.physics.add.image(0,0,"apple").setOrigin(0,0);
        // this.target.setMaxVelocity(0,speedDown); //stop target from falling faster and faster over time

        // this.physics.add.overlap(this.target,this.player,this.collectFire,null,this)

        this.textScore = this.add.text(sizes.width - 120, 10, "Fires:0",{
            font: "25px Arial",
            fill: "#000000",
        });

        this.textTime = this.add.text(10, 10, "Remaining Time: 00",{
            font: "25px Arial",
            fill: "#000000",
        });

        this.timedEvent = this.time.delayedCall(30000, this.gameOver,[], this);

        this.emitter=this.add.particles(0,0,"money",{
            speed: 100,
            gravityY:speedDown-200,
            scale: 0.4,
            duration:100,
            emitting:false
        })
        this.emitter.startFollow(this.player, this.player.width/2, this.player.height/2, true);
    }

    update(){
        // gameManager.tickGamePlay();
        this.remainingTime = this.timedEvent.getRemainingSeconds();
        this.textTime.setText(`Remaining Time: ${Math.round(this.remainingTime).toString()}`);

        // if(this.target.y >= sizes.height){
        //     this.target.setY(0); //stop apple from falling int o endless world, returns to top 
        //     this.target.setX(this.getRandomX());
        // }

        const {left, right, up, down} = this.cursor;

        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if (left.isDown){
            this.player.setVelocityX(-this.playerSpeed);
        } else if (right.isDown){
            this.player.setVelocityX(this.playerSpeed);
        } 

        if (up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } else if (down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }

        // if (this.fires >= 10 && this.gameMap.isAtExit(this.player)) {
        //     this.gameOver(true); // Win condition
        // }
    }

    collectFire(player, fire) {
        if (fire.active){
            this.coinMusic.play();
            this.emitter.start();
            
            // Update score
            this.fires++;
            this.textScore.setText(`Fires: ${this.fires}`);

            // Destroy the fire sprite
            fire.destroy();

            // Check win condition
            if (this.fires >= 10 && this.gameMap.isAtExit(this.player)) {
                this.gameOver(true);
            }
        }
    }

    // getRandomX(){ //uneeded
    //     return Math.floor(Math.random()*400);
    // }

    // targetHit(){ //collisions, add to score
    //     this.coinMusic.play();
    //     this.emitter.start();
    //     this.target.setY(0);
    //     this.target.setX(this.getRandomX());
    //     this.points++
    //     this.textScore.setText(`Score: ${this.points}`);
    // }

    gameOver(won = false){
        this.sys.game.destroy(true)
        if(won){
            gameEndScoreSpan.textContent = this.fires
            gameWinLoseSpan.textContent = "Win!"
        }
        else{
            gameEndScoreSpan.textContent = this.fires
            gameWinLoseSpan.textContent="Lose!"
        }

        gameEndDiv.style.display="flex"
    }
}
const config = {
    type:Phaser.WEBGL,
    width:sizes.width,
    height:sizes.height,
    canvas:gameCanvas, //links the two canvases, gameCanvas in style.css
    /*adding physics*/
    physics:{
        default:"arcade",
        arcade:{
            gravity:{y:0},
            debug:true
        }
    },
    scene:[GameScene]
}

const game = new Phaser.Game(config)

gameStartBtn.addEventListener("click", ()=>{
    gameStartDiv.style.display="none"
    game.scene.resume("scene-game")
})