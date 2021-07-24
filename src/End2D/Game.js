import Input from "./Input.js";
import SceneManager from "./SceneManager.js";

/** The main entry point into a game */
export default class Game
{
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;
    FPS = 60;
    sceneManager;

    constructor(config)
    {
        //Initialize the sceneManager.
        let canvas = document.getElementById("gamewindow");
        canvas.width = this.SCREEN_WIDTH;
        canvas.height = this.SCREEN_HEIGHT;
        this.sceneManager = new SceneManager(this);
        Input.initialize();
    }

    async startGame(scene)
    {
        let previousTime = Date.now(); //gets the current time in milliseconds
        this.sceneManager.setScene(scene);
        //let x = 1;
        //scuffed game loop.
        while(true)
        {
            this.tick();
            this.render();
            //calculate the time needed to sleep based on the FPS.
            let singleFrameTime = (1.0/this.FPS) * 1000; //calculate the maximum number of ms perframe.
            let currentTime = Date.now();
            let timePassed = currentTime - previousTime;
            let sleepTime = singleFrameTime - timePassed;
            document.getElementById("sleeptime").innerHTML = sleepTime + "ms";
            if(sleepTime > 0)
                await this.sleep(sleepTime);
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
        //console.log("rendering");

        ctx.fillStyle = "#213400";
        ctx.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

        //draw the game nodes, like players and enemies.
        let data = this.sceneManager.getData();
        if(data)
        {
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
                    ctx.fillRect(node.position.getX(), node.position.getY(), node.width, node.height);
                }
            });
        }
        
    }

    getSceneManager()
    {
        return this.sceneManager;
    }
}






