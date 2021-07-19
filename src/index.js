import Game from "./End2D/game";
import GameLevel from "./TowerDefense/Scenes/GameLevel";

function initialize()
{
    console.log("Initializing.");
    game = new Game();
    game.getSceneManager().setScene(GameLevel);
    
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