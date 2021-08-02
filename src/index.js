import Game from "./End2D/Game/Game.js";
import GameLevel from "./TowerDefense/Scenes/GameLevel.js";

/**Creates a Game and starts with with a default scene. */
function initialize()
{
    console.log("Initializing. Game");

    let config = {
        SCREEN_WIDTH: 1280,
        SCREEN_HEIGHT: 720,
        FPS: 60
    }

    let game = new Game(config);
    game.startGame(GameLevel);

}


initialize();