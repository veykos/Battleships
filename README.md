## Introduction
This is my first project I've had to do in the Ironhack Berlin Web Development bootcamp. The theme of the project was "a game" and we had a choice between a DOM manipulation based game and one done in P5 JS. I chose DOM manipulation as I though the experience I'll gain creating the game will be more useful down the line.
I had a lot of fun coding all this from scratch and I applied a lot of the OOP principles in creating the board, the ships, the "AI" and the Game object itself.
## How to play
You can play the game directly on it's GitHub page: [Battleboats](https://veykos.github.io/ironhack-project-1/)
The game goes through two phases. In the first you you are required to place your
ships on the gaming board. The ships are as follows:
1. An Aircraft Carrier taking up 5 tiles, set up vertically
2. An Aircraft Carrier taking up 5 tiles, set up horizontally
3. A Battlecruiser taking up 3 tiles, set up vertically
4. A Battlecruiser taking up 3 tiles, set up horizontally
5. Two Patrol Boats each of them taking up one tile

After you've successfully placed all your boats, you will see them on your board.

Now it's time for the fun part: pointing your flotilla's artillery towards the enemy!
Click on the enemy's tiles and you'll see the result of your shot.

Of course, the goal is to find and destroy the enemy's ships before he does the same to you!

## Notes on technologies used
The game uses HTML, CSS and JavaScript. The main elements are hard coded in
the index.html, mostly everything else is displayed through DOM manipulation and CSS classes. All the animations/transitions are made in CSS.