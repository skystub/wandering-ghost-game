import './style.css'
import Phaser from 'phaser'
import {GameMap} from './map.js'
import { Player } from './player.js';

const TILE_SIZE = 16;  // Your tile size
const GRID_WIDTH = 69; // Desired width in tiles
const GRID_HEIGHT = 34; // Desired height in tiles

const sizes = {
    width: GRID_WIDTH * TILE_SIZE,  // 69 * 16 = 1104 pixels
    height: GRID_HEIGHT * TILE_SIZE  // 34 * 16 = 544 pixels
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
        this.coinMusic = this.sound.add("coin");
        this.bgMusic = this.sound.add("bgMusic");
        //this.bgMusic.play();
        //this.bgMusic.stop();

        this.add.image(0,0,"bg").setOrigin(0,0).setDepth(-1);

        this.player = new Player(this, 0, sizes.height - 100);

        this.gameMap.create('LEVEL_1');

        this.physics.add.overlap(
            this.player.sprite,
            this.gameMap.collectibles,
            this.collectFire,
            null,
            this
        );

       //set player pos
        const spawnX = this.gameMap.tileSize * 1.5;
        const spawnY = sizes.height - this.gameMap.tileSize * 1.5;
        this.player.sprite.setPosition(spawnX, spawnY);

        this.scene.pause("scene-game")

        this.cursor = this.input.keyboard.createCursorKeys();

        this.textScore = this.add.text(sizes.width - 120, 10, "Score:0",{
            font: "25px Arial",
            fill: "#000000",
        });

        this.textTime = this.add.text(10, 10, "Remaining Time: 00",{
            font: "25px Arial",
            fill: "#000000",
        });

        this.timedEvent = this.time.delayedCall(50000, this.gameOver,[], this);

        this.emitter=this.add.particles(0,0,"money",{
            speed: 100,
            gravityY:speedDown-200,
            scale: 0.4,
            duration:100,
            emitting:false
        })
        this.emitter.startFollow(this.player.sprite, this.player.sprite.width/2, this.player.sprite.height/2, true);
    }

    update(){
        this.remainingTime = this.timedEvent.getRemainingSeconds();
        this.textTime.setText(`Remaining Time: ${Math.round(this.remainingTime).toString()}`);

        this.player.update(this.cursor);

        if (this.gameMap.isAtExit(this.player)) {
            if (this.fires >= 40) {  // You can adjust this number as needed
                this.gameOver(true);  // Player wins
            }
            // If player doesn't have enough fires, nothing happens
        }
    }

    collectFire(player, fire) {
        if (fire.active){
            this.coinMusic.play();
            this.emitter.start();
            
            // Update score
            this.fires++;
            this.textScore.setText(`Score: ${this.fires}`);

            // Destroy the fire sprite
            fire.destroy();

            // Check win condition
            if (this.fires >= 40 && this.gameMap.isAtExit(this.player)) {
                this.gameOver(true);
            }
        }
    }

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