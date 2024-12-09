# wandering-ghost-game
# Technical Specification
## 2. Architecture
### Key Components
1. **Main**: Manages game state, level progression, score, and gameplay loop.
2. **Map**: Manages room generation, entrances, exits, and secret rooms based on preset layouts.
3. **Player**: Represents the player’s ghost with movement and interaction capabilities.

(not yet implemented)
4. **Mob**: Represents enemy creatures with movement and collision detection.
7. **Leaderboard**: Manages high scores and player progression.

### 1. GameScene Class (main.js)
Main game scene handling core game logic and state.

**Properties:**
- `player` - Player instance
- `cursor` - Keyboard input handler
- `fires` - Collected point counter
- `textScore` - Score display text
- `textTime` - Timer display text
- `timedEvent` - Game timer
- `coinMusic` - Sound effect for collection
- `bgMusic` - Background music (unused)
- `emitter` - Particle effect system
- `gameMap` - GameMap instance

**Methods:**
- `preload()` - Loads game assets
- `create()` - Sets up game world and objects
- `update()` - Handles game loop updates
- `collectFire(player, fire)` - Handles fire collection logic
- `gameOver(won)` - Handles game end conditions


### 2. Player Class (player.js)
Handles player sprite creation and movement mechanics.
**Properties:**
- `scene` - Reference to the game scene
- `sprite` - Physical player sprite object
- `speed` - Player movement speed (160)

**Methods:**
- `constructor(scene, x, y)` - Creates player sprite with physics properties
- `update(cursors)` - Handles player movement based on keyboard input
- `setPosition(x, y)` - Sets player position in the game world

### 3. GameMap Class (map.js)
Manages level layout, walls, collectibles, and exit point.

**Properties:**
- `scene` - Reference to game scene
- `tileSize` - Size of each tile (16px)
- `walls` - Static physics group for wall tiles
- `currentLayout` - Current level layout array
- `collectibles` - Static physics group for fire collectibles
- `totalCollectibles` - Counter for total fires in level
- `floorTiles` - Group for floor tile sprites
- `exitPos` - Exit tile coordinates
- `exitTile` - Exit sprite reference

**Methods:**
- `preload()` - Loads required tile assets
- `create(layoutKey)` - Initializes map components and physics
- `loadLayout(layout)` - Builds level from layout array
- `isAtExit(player)` - Checks if player is at exit position


## Game Configuration
- Grid size: 69x34 tiles
- Tile size: 16x16 pixels
- Canvas size: 1104x544 pixels
- Win condition: Collect 40 fires and reach exit
- Time limit: 50 seconds

## Technical Dependencies
- Phaser 3 Game Engine
- WebGL renderer
- Arcade physics system

## Asset Requirements
- `wall.png` - Wall tile
- `floor.png` - Floor tile
- `fire.png` - Collectible sprite
- `exit.png` - Exit tile
- `basket.png` - Player sprite
- `coin.mp3` - Collection sound effect
- `bgMusic.mp3` - Background music

## UI Elements
- Score display (top-right)
- Timer display (top-left)
- Start screen overlay
- Game over screen overlay