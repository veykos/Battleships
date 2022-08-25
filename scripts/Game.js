import { Board } from "./Board.js";
import { Cluster, Volley } from "./Bonus.js";
import { Bot } from "./Bot.js";
import { getTileCoordinates } from "./functions.js";

export class Game {
  constructor() {
    const enemyPlayingBoard = new Board("enemy");
    const playerPlayingBoard = new Board("player");
    this.enemy = enemyPlayingBoard;
    this.player = playerPlayingBoard;
    this.states = ["placing", "shooting"];
    this.state = this.states[0];
    this.messageBoard = document.querySelector(".message");
    // create the botAI
    const botAi = new Bot();
    this.botAI = botAi;
    // create bonuses for player
    const playerCluster = new Cluster();
    this.playerCluster = playerCluster;
    const playerVolley = new Volley();
    this.playerVolley = playerVolley;
    // create bonuses for bot
    const enemyCluster = new Cluster();
    this.enemyCluster = enemyCluster;
    const enemyVolley = new Volley();
    this.enemyVolley = enemyVolley;
  }

  start() {
    this.enemy.generateBoard();
    this.player.generateBoard();
    // generate the playing boards
    this.enemy.placeFlotilia();
    //this.player.placeFlotilia();
    // COMMENT FOR NORMAL GAMEPLAY
    this.enemy.updateShipTiles();
    this.player.updateShipTiles();
    // place enemy ships and our ships :)

    this.messageBoard.innerText = "POSITION YOUR FLEET!";

    let acVert = document.querySelector("#AC1");
    let acHor = document.querySelector("#AC2");
    let bcVert = document.querySelector("#BC1");
    let bcHor = document.querySelector("#BC2");
    let sh1 = document.querySelector("#SH1");
    let sh2 = document.querySelector("#SH2");

    let selectedShipDiv;
    let selectedShip;
    const shipsButtons = [acVert, acHor, bcVert, bcHor, sh1, sh2];
    for (let i = 0; i < shipsButtons.length; i++) {
      shipsButtons[i].addEventListener("click", (event) => {
        selectedShipDiv = event.target;
        let selectedShipDivIdx = shipsButtons.indexOf(selectedShipDiv);
        selectedShip = this.player.ships[selectedShipDivIdx];
        this.messageBoard.innerText = `${
          selectedShipDiv.innerText
        } - ${selectedShip.orientation.toUpperCase()}`;
      });
    }

    const rotateButton = document.querySelector(".rotate-sign");
    rotateButton.addEventListener("click", (event) => {
      if (selectedShip.orientation === "horizontal") {
        selectedShip.orientation = "vertical";
        this.messageBoard.innerText = `${
          selectedShipDiv.innerText
        } - ${selectedShip.orientation.toUpperCase()}`;
      } else {
        selectedShip.orientation = "horizontal";
        this.messageBoard.innerText = `${
          selectedShipDiv.innerText
        } - ${selectedShip.orientation.toUpperCase()}`;
      }
    });

    // creating the enemy tiles
    const enemyBoard = document.querySelector(".enemy-board");
    for (let i = 0; i < 8; i++) {
      let oneRow = document.createElement("div");
      oneRow.className = "enemy-" + i;
      for (let x = 0; x < 10; x++) {
        let oneTile = document.createElement("div");
        oneTile.className = "enemy-" + i + x;
        oneTile.classList.add("enemy-tile");
        oneTile.classList.add("tile");
        oneRow.appendChild(oneTile);
      }
      enemyBoard.appendChild(oneRow);
    }

    // creating the player board and adding event listener
    // and logic for placing the ships
    const playerBoard = document.querySelector(".player-board");
    for (let i = 0; i < 8; i++) {
      let oneRow = document.createElement("div");
      oneRow.className = "player-" + i;
      for (let x = 0; x < 10; x++) {
        let oneTile = document.createElement("div");
        oneTile.className = "player-" + i + x;
        oneTile.classList.add("player-tile");
        oneTile.classList.add("tile");
        oneTile.addEventListener("click", (event) => {
          let tile_coord = getTileCoordinates(event.target);
          if (selectedShip.col === undefined) {
            let ship_coord = this.player.placeShip(tile_coord, selectedShip);
            if (ship_coord) {
              selectedShip.col = ship_coord.col;
              selectedShip.row = ship_coord.row;
              selectedShipDiv.classList.add("hidden");
              this.messageBoard.innerText = "PLACE YOUR SHIPS";
            } else {
              this.messageBoard.innerText = "INVALID SHIP POSITION";
            }
          }
          this.player.updateShipTiles();
          this.player.colorTilesPlayer();
          let shipsPositions = this.player.ships.map((ship) => ship.col);
          if (shipsPositions.every((ele) => ele !== undefined)) {
            rotateButton.classList.add("hidden");
            this.shoot();
          }
        });
        oneRow.appendChild(oneTile);
      }
      playerBoard.appendChild(oneRow);
    }
  }
  normalGameplay = (tile) => {
    const enemyMsg = document.querySelector(".enemy-msg");
    const playerMsg = document.querySelector(".player-msg");
    let player_shoot_result = this.enemy.markTile(tile);
    if (player_shoot_result === 1) {
      playerMsg.innerText = "DIRECT HIT!";
    } else {
      playerMsg.innerText = "CALIBRATE THE TURRETS!";
    }
    this.enemy.updateShipTiles();
    this.enemy.colorTilesEnemy();
    this.checkForWin();
    // add bot's logic for using bonuses here :)
    let enemyShootResult;
    if (this.enemyCluster.uses > 0 || this.enemyVolley.uses > 0) {
      let botRollDiceForBonus = Math.floor(Math.random() * 4);
      if (botRollDiceForBonus === 2 && this.enemyCluster.uses > 0) {
        enemyShootResult = this.botAI.useBonus(this.enemyCluster, this.player);
      } else if (botRollDiceForBonus === 3 && this.enemyVolley.uses > 0) {
        enemyShootResult = this.botAI.useBonus(this.enemyVolley, this.player);
      } else {
        enemyShootResult = this.botAI.shoot(this.player);
      }
    } else {
      enemyShootResult = this.botAI.shoot(this.player);
    }

    //let enemyShootResult = this.botAI.shoot(this.player)
    // Timeout the coloring and checking of result
    setTimeout(() => {
      this.player.updateShipTiles();
      if (enemyShootResult[0] === 1) {
        enemyMsg.innerText = "THEY HIT OUR SHIP!";
      } else {
        enemyMsg.innerText = "THEY MISSED!";
      }
    }, 900);
    setTimeout(() => this.player.colorTilesPlayer(), 1100);
    setTimeout(() => this.checkForWin(), 1300);
  };

  clusterGameplay = (tile) => {
    const enemyMsg = document.querySelector(".enemy-msg");
    const playerMsg = document.querySelector(".player-msg");
    // querySelect the bonuses counters:
    const playerClusterSpan = document.querySelector(".cluster-player span");
    // end selection

    let result = this.playerCluster.use(tile, this.enemy);
    this.playerCluster.inUse = false;
    playerClusterSpan.innerText = `${this.playerCluster.uses}`;
    if (result[0] === 1) {
      playerMsg.innerText = "DIRECT HIT";
    } else {
      playerMsg.innerText = "CALIBRATE THE TURRETS!";
    }
    this.enemy.updateShipTiles();
    this.enemy.colorTilesEnemy();
    this.checkForWin();
    let enemyShootResult = this.botAI.shoot(this.player);
    // Timeout the coloring and checking of result
    setTimeout(() => {
      this.player.updateShipTiles();
      if (enemyShootResult === 1) {
        enemyMsg.innerText = "THEY HIT OUR SHIP!";
      } else {
        enemyMsg.innerText = "THEY MISSED!";
      }
    }, 900);
    setTimeout(() => this.player.colorTilesPlayer(), 1100);
    setTimeout(() => this.checkForWin(), 1300);
  };

  volleyGameplay = (tile) => {
    const enemyMsg = document.querySelector(".enemy-msg");
    const playerMsg = document.querySelector(".player-msg");
    // querySelect the bonuses counters:
    const playerVolleySpan = document.querySelector(".volley-player span");
    // end selection

    let result = this.playerVolley.use(tile, this.enemy);
    this.playerVolley.inUse = false;
    if (result[0] === 1) {
      playerMsg.innerText = "DIRECT HIT";
    } else {
      playerMsg.innerText = "CALIBRATE THE TURRETS!";
    }
    playerVolleySpan.innerText = " " + this.playerVolley.uses;
    this.enemy.updateShipTiles();
    this.enemy.colorTilesEnemy();
    this.checkForWin();
    let enemyShootResult = this.botAI.shoot(this.player);
    // Timeout the coloring and checking of result
    setTimeout(() => {
      this.player.updateShipTiles();
      if (enemyShootResult === 1) {
        enemyMsg.innerText = "THEY HIT OUR SHIP!";
      } else {
        enemyMsg.innerText = "THEY MISSED!";
      }
    }, 900);
    setTimeout(() => this.player.colorTilesPlayer(), 1100);
    setTimeout(() => this.checkForWin(), 1300);
  };

  shoot() {
    // add working player cluster button
    const pClusterButton = document.querySelector(".cluster-player");
    pClusterButton.addEventListener("click", (event) => {
      this.playerCluster.inUse = true;
    });
    pClusterButton.classList.remove("hidden");
    // add working player volley button
    const pVolleyButton = document.querySelector(".volley-player");
    pVolleyButton.addEventListener("click", (event) => {
      this.playerVolley.inUse = true;
    });
    pVolleyButton.classList.remove("hidden");
    // REMOVE THE PLAYER TILES EVENTLISTENERS BY CLONING THEM
    // THIS FIXES THE MULTISHOT BUG
    const playerTiles = document.querySelectorAll(".player-tile");
    for (let i = 0; i < playerTiles.length; i++) {
      playerTiles[i].replaceWith(playerTiles[i].cloneNode(true));
    }
    ////

    this.messageBoard.innerText = "DESTROY THE ENEMY FLEET!";
    // define the distributor function which checks if bonuses are in use or not
    const distributor = (tile) => {
      if (this.playerCluster.inUse && this.playerCluster.uses > 0) {
        this.clusterGameplay(tile);
      } else if (this.playerVolley.inUse && this.playerVolley.uses > 0) {
        this.volleyGameplay(tile);
      } else {
        this.normalGameplay(tile);
      }
    };
    // add the eventListener for distributor to all enemy tiles
    let enemyTiles = document.querySelectorAll(".enemy-tile");
    for (let i = 0; i < enemyTiles.length; i++) {
      enemyTiles[i].addEventListener("click", (event) => {
        let tile = getTileCoordinates(event.target);
        distributor(tile);
      });
    }
  }

  checkForWin() {
    // check for win of player:
    const finalMsg = document.querySelector(".final-message");
    const gameContainer = document.querySelector(".game-container-wrapper");
    if (this.enemy.shipTiles === 0) {
      finalMsg.innerText = "YOU WIN !";
      finalMsg.classList.remove("hidden");
      gameContainer.classList.add("hidden");
    } else if (this.player.shipTiles === 0) {
      finalMsg.innerText = "YOU LOSE !";
      finalMsg.classList.remove("hidden");
      gameContainer.classList.add("hidden");
    }
  }
}
