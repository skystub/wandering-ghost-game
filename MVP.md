# MVP Features

## Player Movement
**Priority:** P0  
**Implementation Timeline:** Day 1-3  

**Core Requirements:**  
- WASD and arrow keys for movement.  
- Mouse for free look and interaction.  

**Technical Components:**  
- Tick system for consistent updates.  
- Input manager to handle controls.  

**Simplifications:**  
- Basic walking and looking around; no advanced animations.  

---

## Ghost Abilities
**Priority:** P0  
**Implementation Timeline:** Day 1-3  

**Core Requirements:**  
- E to possess objects.  
- Space to exit possession.  
- R to perform a special ghost ability (e.g., create a chill that affects surroundings).  

**Technical Components:**  
- Trigger zones for possessable objects.  
- Ability cooldown system.  

**Simplifications:**  
- Start with one ghost ability (e.g., creating chills).  

---

## Object Interactions
**Priority:** P0  
**Implementation Timeline:** Day 1-3  

**Core Requirements:**  
- Environment reacts to ghost presence (e.g., objects shake or glow).  

**Technical Components:**  
- Raycast to detect player interaction.  
- Object state changes (e.g., idle to shaking).  

**Simplifications:**  
- Simple object interactions (e.g., shake, glow).  

---

## Exploration Goal System
**Priority:** P1  
**Implementation Timeline:** Day 3-5  

**Core Requirements:**  
- Collect "Memories" hidden in the environment.  
- Unlock areas as more memories are collected.  

**Technical Components:**  
- Memory collection logic.  
- Trigger-based area unlocking.  

**Simplifications:**  
- Basic progress tracking (number of memories collected).  

---

## HUD
**Priority:** P1  
**Implementation Timeline:** Day 3-5  

**Core Requirements:**  
- Display health (or spiritual energy), memories collected, and cooldowns.  

**Technical Components:**  
- Simple overlay with UI elements.  

**Simplifications:**  
- Static UI, no animations.  

---

## Energy System
**Priority:** P1  
**Implementation Timeline:** Day 3-5  

**Core Requirements:**  
- Energy depletes when using abilities.  
- Game over when energy reaches 0.  

**Technical Components:**  
- Timer or depletion system for energy.  
- Collision triggers to replenish energy.  

**Simplifications:**  
- Energy recharges over time without items.  

---

## Environmental Events
**Priority:** P1  
**Implementation Timeline:** Day 3-5  

**Core Requirements:**  
- Dynamic environmental changes (e.g., lights flickering, doors creaking).  

**Technical Components:**  
- Timer and random trigger system for events.  

**Simplifications:**  
- Start with a small pool of events (e.g., flickering lights).  

---

# MVP Implementation Plan

### Day 1-3 (Core Framework)
- **Player Movement:** WASD, mouse look.  
- **Ghost Abilities:** Possession, chills.  
- **Object Interactions:** Shaking/glowing objects.  

### Day 3-5 (Essential Features)
- **Exploration Goal System:** Memory collection and area unlocking.  
- **HUD:** Display energy, collected memories, and cooldowns.  
- **Energy System:** Depletion and recharging logic.  
- **Environmental Events:** Simple dynamic events like flickering lights.  
