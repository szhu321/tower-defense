import Input from "./Input.js";
import SceneManager from "./SceneManager.js";

/** The main entry point into a game */
export default class Game
{
    SCREEN_WIDTH = 1280;
    SCREEN_HEIGHT = 720;
    FPS = 60;
    sceneManager;

    /**
     * Creates a new game object. To start game run startGame() and pass in a scene object type as an argument.
     * @param {object} config - an object containing configuation data for this game.
     * @param {number} [config.SCREEN_WIDTH = 1280] - the screen width. 
     * @param {number} [config.SCREEN_HEIGHT = 720] - the screen height.
     * @param {number} [config.FPS = 60] - the FPS of the game.
     */
    constructor(config)
    {
        //Initialize the sceneManager.
        this.sceneManager = new SceneManager(this);
        //Initialize the input.
        Input.initialize();

        //apply configs.
        let {SCREEN_HEIGHT, SCREEN_WIDTH, FPS} = config;
        this.SCREEN_HEIGHT = SCREEN_HEIGHT ? SCREEN_HEIGHT : this.SCREEN_HEIGHT;
        this.SCREEN_WIDTH = SCREEN_WIDTH ? SCREEN_WIDTH : this.SCREEN_WIDTH;
        this.FPS = FPS ? FPS : this.FPS;       

        let canvas = document.getElementById("gamewindow");
        canvas.width = this.SCREEN_WIDTH;
        canvas.height = this.SCREEN_HEIGHT; 
        
    }

    /**
     * Start a new game with a given scene.
     * @param {Scene} scene - the scene. Don't pass in an instance, pass the class name directly.
     */
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
     * @returns {Promise} the promise object to await for.
     */
    sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * The update of the game loop.
     */
    tick()
    {
        //update the scene.
        this.sceneManager.currentScene.preUpdate();
    }

    /**
     * The rendering of the game loop.
     */
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

    /**
     * Gets the current sceneManager.
     * @returns {SceneManager} the scene manager.
     */
    getSceneManager()
    {
        return this.sceneManager;
    }
}






