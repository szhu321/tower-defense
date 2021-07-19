import Input from "../input";
import SceneManager from "./SceneManager";

/** The main entry point into a game */
export default class Game
{
    sceneManager;

    constructor(config)
    {
        //Initialize the sceneManager.
        this.sceneManager = new SceneManager(this);
        Input.initialize();
    }

    async startGame(scene)
    {
        let previousTime = Date.now(); //gets the current time in milliseconds
        //let x = 1;
        //scuffed game loop.
        while(true)
        {
            tick();
            render();
            //calculate the time needed to sleep based on the FPS.
            let singleFrameTime = (1.0/FPS) * 1000; //calculate the maximum number of ms perframe.
            let currentTime = Date.now();
            let timePassed = currentTime - previousTime;
            let sleepTime = singleFrameTime - timePassed;
            document.getElementById("sleeptime").innerHTML = sleepTime + "ms";
            if(sleepTime > 0)
                await sleep(sleepTime);
            previousTime = Date.now();
        }
    }

    /**
     * @param ms - The number of milliseconds to sleep the program.
     */
    sleep(ms)
    {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    tick()
    {
        //update the scene.
        this.sceneManager.currentScene.preUpdate();
    }

    render()
    {
        let canvas = document.getElementById("gamewindow");
        let ctx = canvas.getContext("2d");
        //first draw the background.

        ctx.fillStyle = "#213400";
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        //draw the game nodes, like players and enemies.
        let data = this.sceneManager.getData();
        data.forEach(node => {
            if(node.visible)
            {
                if(node.type == "player")
                    ctx.fillStyle = "green";
                else if(node.type == "enemy")
                    ctx.fillStyle = "red";
                else if(node.type == "bullet")
                    ctx.fillStyle = "white";
                else
                    ctx.fillStyle = "white";
                ctx.fillRect(node.position.x, node.position.y, node.width, node.height);
            }
        });
    }

    getSceneManager()
    {
        return this.sceneManager;
    }
}

module.exports = Game;







