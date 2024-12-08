export class GameMap {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 32; // Size of each tile in pixels
        this.walls = null;
        this.currentLayout = [];
        this.collectibles = null;
        this.totalCollectibles = 0;
    }

    // Preset map layouts
    static LAYOUTS = {
        LEVEL_1: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
            [1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 2, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 2, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        LEVEL_2: [
            // Add more layouts as needed
        ]
    };

    preload() {
        // Load map tiles
        this.scene.load.image('wall', 'assets/wall.png');
        this.scene.load.image('floor', 'assets/floor.png');
        this.scene.load.image('fire', 'assets/fire.png');  // Add fire sprite
        this.scene.load.image('exit', 'assets/exit.png');  // Add exit sprite

    }

    create(layoutKey = 'LEVEL_1') {
        // Create physics group for walls
        this.walls = this.scene.physics.add.staticGroup();
        this.collectibles = this.scene.physics.add.staticGroup();
        this.totalCollectibles = 0;
        
        // Load the specified layout
        this.loadLayout(GameMap.LAYOUTS[layoutKey]);
        
        // Add collision between player and walls
        this.scene.physics.add.collider(this.scene.player, this.walls);

        // this.scene.physics.add.overlap(
        //     this.scene.player,
        //     this.collectibles,
        //     this.collectFire,
        //     null,
        //     this
        // );
    }

    loadLayout(layout) {
        this.currentLayout = layout;
        
        // Clear existing walls if any
        if (this.walls) {
            this.walls.clear(true, true);
        }
        if (this.collectibles) {
            this.collectibles.clear(true, true);
        }

        layout.forEach((row, y) => {
            row.forEach((tile, x) => {
                const posX = x * this.tileSize + this.tileSize / 2;
                const posY = y * this.tileSize + this.tileSize / 2;
                
                // Always place floor first
                if (tile !== 1) {
                    this.scene.add.image(posX, posY, 'floor');
                }
                
                switch(tile) {
                    case 1: // Wall
                        this.walls.create(posX, posY, 'wall')
                            .setImmovable(true);
                        break;
                    case 2: // Collectible
                        this.collectibles.create(posX, posY, 'fire')
                            .setScale(0.5); // Make fire smaller
                        this.totalCollectibles++;
                        break;
                    case 3: // Exit
                        this.exitTile = this.scene.add.image(posX, posY, 'exit');
                        this.exitPos = { x: x, y: y };
                        break;
                }
            });
        });

        // Create new walls based on layout
        // layout.forEach((row, y) => {
        //     row.forEach((tile, x) => {
        //         if (tile === 1) { // Wall
        //             this.walls.create(
        //                 x * this.tileSize + this.tileSize / 2,
        //                 y * this.tileSize + this.tileSize / 2,
        //                 'wall'
        //             ).setImmovable(true);
        //         } else { // Floor
        //             this.scene.add.image(
        //                 x * this.tileSize + this.tileSize / 2,
        //                 y * this.tileSize + this.tileSize / 2,
        //                 'floor'
        //             );
        //         }
        //     });
        // });
    }

    // collectFire(player, fire) {
    //     fire.destroy();
    //     this.totalCollectibles--;
    //     this.scene.updateScore();
        
    //     // Check win condition
    //     if (this.totalCollectibles === 0) {
    //         this.scene.checkWinCondition = true; // Player can now win by reaching exit
    //     }
    // }

    isAtExit(player) {
        const playerTileX = Math.floor(player.x / this.tileSize);
        const playerTileY = Math.floor(player.y / this.tileSize);
        return playerTileX === this.exitPos.x && playerTileY === this.exitPos.y;
    }

}