# Wandering Ghost

## 1. Overview

**Game Objective**: Players control a pixel ghost exploring haunted mansion rooms to collect spirit flames while navigating within a limited field of view. Each room contains an entrance, exit, and hidden entrances to secret rooms. The ghost must gather a minimum number of flames to unlock the exit and progress, all within a randomized time limit.

**Challenge**: Collect enough spirit flames, explore hidden entrances, and avoid visible mobs in the map, reach the exit before time runs out.

## 2. Game Components

### 2.1 Game Interface

**Main Screen**:
- **Start Game Button**: Begins the game.
- **Settings**: Options to toggle sound, set difficulty level (which affects time limits and mob speed), and view the leaderboard.

**Game Screen**:
- **Map Area**: Shows the dimly lit mansion room layout with mobs visible, but spirit flames are only visible within a certain radius around the ghost.
- **Field of View**: A circular field of view around the ghost character that brightens a limited area, allowing the ghost to see spirit flames within this radius. The rest of the room is dimly visible, but spirit flames outside the field of view are hidden.
- **Timer**: Displays the countdown for the time remaining.
- **Score Display**: Tracks the collected spirit flames, score, and the minimum flames required to complete the level.

**End-of-Level Screen**:
- Shows the player’s score, time left, items collected, and options to retry or proceed to the next level.

## 3. Game Logic and Mechanics

### 3.1 Room (Map) Generation

- **Randomized Layout**: Each room is generated with walls, pathways, and hidden entrances to secret rooms, creating a maze-like structure.
- **Field of View Mechanic**: The ghost’s view is limited to a brightened circular radius around it, with the rest of the map dimly visible. Only spirit flames within this field of view are visible to the player.
- **Hidden Entrances**: These lead to secret rooms containing extra spirit flames and are slightly dimmed or animated. Players may spot these entrances within the dim map view and choose to investigate.
- **Entrance and Exit Points**: Define a starting entrance point and an exit. The player must reach the exit after collecting enough spirit flames.

### 3.2 Collectibles - Spirit Flames

- **Concept**: Spirit flames are the main collectible and are spaced out across the map. Only visible within the ghost’s field of view, they require exploration and movement to locate.
- **Minimum Collectible Requirement**: Each level requires the ghost to collect a minimum number of spirit flames, approximately 70-80% of the total flames generated for that level.
- **Placement**: Flames are spread out across the map and in secret rooms. Players need to navigate close to walls and corridors to fully explore and reveal flames within the ghost’s limited field of view.
- **Point Scoring**: Each flame grants points, with additional points for finding hidden rooms or collecting extra flames beyond the minimum.

### 3.3 Mobs (Enemies)

- **Concept**: Mansion creatures that move back and forth and are visible throughout the dimly lit map.
- **Mob Types**:
  - **Cats**: Follow specific paths in the game, freeze your ghost character on contact for five seconds
  - **Dust Bunnies**: Hopping dust balls following a pattern they freeze your ghost character on contact for three seconds.
- **Movement Pattern**: Mobs move back and forth along set paths at a certain speed.
- **Speed Scaling**: Mob speed increases slightly with each level.
- **Collision Detection**: Colliding with a mob causes the player to lose time, points, or potentially restart the level depending on difficulty settings.

### 3.4 Randomized Time Limits

- **Time Range**: Each level has a randomly determined time limit within a range (e.g., 30-60 seconds).
- **Countdown Timer**: Visible countdown timer; if the timer reaches zero, the level ends unsuccessfully.
- **Time Bonuses**: Some spirit flames in hidden rooms may offer small time boosts, encouraging players to explore secret areas.

### 3.5 Progression and Difficulty Scaling

- **Increasing Complexity**:
  - **Maze Complexity**: Levels become more intricate with more walls, pathways, and hidden rooms, which requires thorough exploration to uncover spirit flames.
  - **Increased Mob Speed**: Each level introduces faster mobs, making avoidance more challenging.
  - **Collectible Requirement Scaling**: Higher levels increase the number of spirit flames required, requiring more exploration.
  - **Narrowed Time Limit Range**: As levels progress, the random time limit range shortens, creating more urgency.
- **Special Collectibles**: Unique spirit flames like time extensions or invisibility may occasionally appear in hidden rooms.

## 4. Leaderboard

### Tracking Levels and Scores
- **Record the highest level reached, total score, and fastest times**.
- Display a **top 10 leaderboard**, allowing players to compete on levels and time.

### Data Structure
- Track **Username, Highest Level Reached, Total Score, and Fastest Completion Time**.

### Updating the Leaderboard
- Save the player’s score if it qualifies for the leaderboard.

## 5. Additional Features

### Power-Ups and Special Collectibles
- **Invisibility Flame**: Temporarily makes the ghost invisible to mobs.
- **Time Boost Flame**: Adds a few extra seconds to the timer.

### Dynamic Difficulty Options
- Players can select difficulty levels that adjust the timer range and mob speed.

### Replay Option
- Players can replay levels to attempt higher scores or faster times.
