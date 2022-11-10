# Welcome to the Game Masters Assistant Toolkit

After installing the node dependencies run with
"react-scripts start"

 # Current Tools
 ## Dice
  - Roll any number of the standard D20 dice
  - Apply modifier to dice roll
  - View history of dice rolls
  - Repeat Roll: click on roll in history to re-roll
 ## Initiative Tracker
 ### Groups
  - Create monster groups and
    1. Apply name to group of monsters
    2. Select number of monsters in encounter
    3. Select starting health for monster type
    4. Apply initiative bonus to monster
    5. Enable/Disable group for current encounter
 ### Party
  - Create party and
    1. Track character name
    2. Apply characters current health values
    3. Apply initiative bonus to monster
    4. Enable/Disable character for current encounter
 ### Tracker
  - Track Health of every creature in encounter
  - Roll initiatives for creatures using their assigned bonuses
  - Sort encounter based on initiatives (higher bonus get higher spot)
  - Change turns (move top creature to bottom of initiative)

 # TODO:
 ## General
  - Replace react classes with functions
 ## Initiative Tracker
  - Save party to cookie
  - Load party on load
  - Save groups to cookie
  - Load group modal
  - Mark non-party entities with >=0 hp as dead (red, strikethrough)
  - Move entity up/down of order
  - Move entity to top/bottom of order
  - Roll initiatives for party
  - Do +/- math on health
 ## Groups
  - Lookup SRD Monsters
  - Import SRD Monsters to Groups