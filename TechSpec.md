# Wandering Ghost - Technical Specification

---Figma -->

### https://www.figma.com/board/JoTlkY2zkQOxyCeeeyXup0/Untitled?node-id=0-1&t=xHSVVUjIPkI3S4hf-1

## 1. Technology Stack

To develop the _Wandering Ghost_ game, we will use the following stack to support 2D graphics, animation, and gameplay mechanics.

- **Frontend**:

  - **JavaScript** - Main language for game logic.
  - **Phaser.js** - 2D game engine that handles animations, physics, and keyboard controls.
  - **HTML5 Canvas** - Used by Phaser for rendering.

- **Backend**:

  - **Node.js** with **Express** - Backend for leaderboard management and data storage.
  - **SQLite** - Database to store leaderboard data for simplicity.

- **Additional Tools**:
  - **Webpack** - For module bundling and dependency management.
  - **REST API** - For managing player data and leaderboard functionality.

---

## 2. Architecture

The game architecture is modular, with separate components for game management, map handling, player character, collectibles, enemies, timer, and leaderboard.

### Key Components

1. **GameManager**: Manages game state, level progression, score, and gameplay loop.
2. **Map**: Manages room generation, entrances, exits, and secret rooms based on preset layouts.
3. **GhostCharacter**: Represents the player’s ghost with movement and interaction capabilities.
4. **Mob**: Represents enemy creatures with movement and collision detection.
5. **Collectible**: Manages spirit flames and power-ups.
6. **Timer**: Tracks countdown for each level.
7. **Leaderboard**: Manages high scores and player progression.

---

## 3. Data Model

### 3.1 Class: **GameManager**

**Responsibilities**: Controls the game state, manages level progression, and tracks player score.

- **Attributes**:

  - `level: int` - The current level of the game.
  - `score: int` - The player’s score.
  - `isGameOver: boolean` - Boolean flag to indicate if the game is over.
  - `ghost: GhostCharacter` - Instance of the player-controlled ghost.
  - `mobs: List<Mob>` - List of mobs present in the level.
  - `collectibles: List<Collectible>` - List of spirit flames and power-ups.
  - `map: Map` - Instance of the Map class for room structure.
  - `timer: Timer` - Timer instance that manages the countdown.

- **Methods**:
  - `initializeGame()` - Sets up a new game with default score, level, and initializes game components.
  - `startLevel()` - Loads a specific preset layout for the level, resets ghost, mobs, and places collectibles.
  - `endLevel()` - Finalizes the level, increments `level`, and resets components if there are more levels.
  - `updateScore(int points)` - Adds the specified points to `score`.
  - `checkGameOver(): boolean` - Checks if game-over conditions are met.
  - `toggleGamePause()` - Pauses or unpauses the game.
  - `tickGamePlay()` - Main gameplay loop, calling updates on `ghost`, `mobs`, and `timer`.

---

### 3.2 Class: **Map**

**Responsibilities**: Manages room layouts based on preset configurations, with defined entrances, exits, and secret rooms.

- **Attributes**:

  - `layout: Array<Array<Tile>>` - 2D array representing the room’s layout (walls, pathways, entrances).
  - `entrance: Point` - Starting point for the ghost in the room.
  - `exit: Point` - The location of the room exit.
  - `secretRooms: List<Point>` - Coordinates of hidden entrances for secret rooms.

- **Methods**:
  - `loadPresetLayout(int level)` - Loads a preset map layout for the given level from a predefined set of layouts.
  - `checkCollision(Point position): boolean` - Checks if the specified position collides with a wall.

---

### 3.3 Class: **GhostCharacter**

**Responsibilities**: Manages ghost movement, field of view, and interaction with collectibles.

- **Attributes**:

  - `position: Point` - Current position of the ghost within the room.
  - `fovRadius: int` - Radius of the ghost’s field of view.
  - `collectedFlames: int` - Number of spirit flames collected by the ghost.

- **Methods**:
  - `move(String direction)` - Moves the ghost in the specified direction, checking boundaries.
  - `collectFlame(Point position)` - Increases `collectedFlames` if a collectible is found at the position.
  - `checkCollisionWithMob(Mob mob): boolean` - Checks if the ghost collides with a mob and applies effects if true.

---

### 3.4 Class: **Mob**

**Responsibilities**: Represents enemies (mobs) with predefined movement patterns and collision detection.

- **Attributes**:

  - `position: Point` - Current position of the mob.
  - `type: String` - Type of mob (e.g., "Cat", "DustBunny").
  - `freezeDuration: int` - Duration in seconds to freeze the ghost upon collision.

- **Methods**:
  - `move()` - Moves the mob based on its pattern.
  - `checkCollisionWithGhost(GhostCharacter ghost): boolean` - Checks if the mob collides with the ghost, applying effects if true.

---

### 3.5 Class: **Collectible**

**Responsibilities**: Manages spirit flames and power-ups within the room.

- **Attributes**:

  - `position: Point` - Location of the collectible within the room.
  - `type: String` - Type of collectible (e.g., "Flame", "Invisibility", "TimeBoost").
  - `isCollected: boolean` - Indicates if the collectible has been collected.

- **Methods**:
  - `collect()` - Marks the collectible as collected and applies any effects to the ghost.

---

### 3.6 Class: **Timer**

**Responsibilities**: Manages countdown timer for the level.

- **Attributes**:

  - `timeRemaining: int` - Remaining time in seconds for the level.

- **Methods**:
  - `startTimer()` - Initializes and starts the countdown timer.
  - `decrement()` - Decreases `timeRemaining` by one second per tick.
  - `addTime(int seconds)` - Adds additional seconds to `timeRemaining`.

---

### 3.7 Class: **Leaderboard**

**Responsibilities**: Tracks high scores, levels, and completion times.

- **Attributes**:

  - `entries: List<ScoreEntry>` - List of top player scores and stats.

- **Methods**:
  - `submitScore(String username, int score, int levelReached)` - Submits a new score if it qualifies for the leaderboard.
  - `fetchTopScores(): List<ScoreEntry>` - Retrieves top scores for display.

---

## 4. Game Flow

### Initialization

1. `GameManager` initializes the `Map`, `GhostCharacter`, `Mobs`, `Timer`, and `Leaderboard` components.
2. The first preset map is loaded, and the game elements are placed accordingly.

### Gameplay Loop

1. `Timer` begins the countdown.
2. The `GameManager` handles player input, updates `GhostCharacter` movement, manages `Mob` actions, and checks for collectible interactions.
3. If `Timer` reaches zero or player meets conditions to complete the level, the game transitions to the end screen.

### End of Level

1. If the player reaches the exit with enough collected flames, they proceed to the next level.
2. The game stores the player's score on the `Leaderboard` if it qualifies for top entries.

---

This technical specification is a blueprint for building the _Wandering Ghost_ game with Phaser and Node.js. Using preset maps simplifies development while retaining the ability to provide players with challenging and varied gameplay.
