import Game from "./End2D/game.js";
import GameLevel from "./TowerDefense/Scenes/GameLevel.js";

function initialize()
{
    console.log("Initializing.");
    let game = new Game();
    game.startGame(GameLevel);
    
    //sets the size of the canvas.
    // let canvas = document.getElementById("gamewindow");
    // canvas.width = SCREEN_WIDTH;
    // canvas.height = SCREEN_HEIGHT;
    // input = new Input(canvas);
    // gameNodeManager = new GameNodeManager();
    // clearGameWindow();
    // currentPlayer = addPlayer();
    // addEnemy(800, 500);
    // addEnemy(400, 300);
    // addEnemy(200, 390);
    // start();

}


initialize();