import Input from "./Input.js";
import SceneManager from "./SceneManager.js";
import Scene from "./Scene.js";
import CollisionResult from "./Physics2D/Physics/CollisionResult.js";
import CollisionDetector2D from "./Physics2D/RigidBody/CollisionDetector2D.js";
import DebugDraw from "./Rendering/DebugDraw.js";
import Vec2 from "./Utilities/Vec2.js";
import Line from "./Physics2D/Primitives/Line.js";

/** The main entry point into a game */
export default class Game
{
    #SCREEN_WIDTH = 1280;
    #SCREEN_HEIGHT = 720;
    #FPS = 60;
    #sceneManager;

    /**
     * Creates a new game object. To start game run startGame() and pass in a scene object type as an argument.
     * @param {object} config - an object containing configuation data for this game.
     * @param {number} [config.SCREEN_WIDTH = 1280] - the screen width. 
     * @param {number} [config.SCREEN_HEIGHT = 720] - the screen height.
     * @param {number} [config.FPS = 60] - the FPS of the game.
     */
    constructor(config)
    {
        //apply configs.
        let {SCREEN_HEIGHT, SCREEN_WIDTH, FPS} = config;
        this.#SCREEN_HEIGHT = SCREEN_HEIGHT ? SCREEN_HEIGHT : this.#SCREEN_HEIGHT;
        this.#SCREEN_WIDTH = SCREEN_WIDTH ? SCREEN_WIDTH : this.#SCREEN_WIDTH;
        this.#FPS = FPS ? FPS : this.#FPS;
        //getting the canvas.
        let canvas = document.getElementById("gamewindow");
        canvas.width = this.#SCREEN_WIDTH;
        canvas.height = this.#SCREEN_HEIGHT; 

        //Initialize the sceneManager.
        this.#sceneManager = new SceneManager(this);
        //Initialize the input.
        Input.initialize(canvas);
    }

    /**
     * Start a new game with a given scene.
     * @param {Scene} scene - the scene. Don't pass in an instance, pass the class name directly.
     */
    async startGame(scene)
    {
        let previousTime = Date.now(); //gets the current time in milliseconds
        this.#sceneManager.setScene(scene);
        //let x = 1;
        //scuffed game loop.
        while(true)
        {
            this.tick(0.016);
            this.render();
            //calculate the time needed to sleep based on the FPS.
            let singleFrameTime = (1.0/this.#FPS) * 1000; //calculate the maximum number of ms perframe.
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
     * Updates the game logic.
     * @param {number} deltaT - The change in time in seconds.
     */
    tick(deltaT)
    {
        //update the scene.
        this.#sceneManager.getCurrentScene().preUpdate(deltaT);
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

        ctx.fillStyle = "#d68f38";
        ctx.fillRect(0, 0, this.#SCREEN_WIDTH, this.#SCREEN_HEIGHT);

        //draw the game nodes, like players and enemies.
        let data = this.#sceneManager.getData();
        //console.log(data.length);
        if(data)
        {
            data.forEach(node => {
                if(node.isVisible())
                {
                    if(node.type == "player")
                        ctx.fillStyle = "green";
                    else if(node.type == "enemy")
                        ctx.fillStyle = "red";
                    else if(node.type == "bullet")
                        ctx.fillStyle = "white";
                    else
                        ctx.fillStyle = "white";
                    ctx.fillRect(node.getX() - node.getWidth()/2, node.getY() - node.getHeight()/2, node.getWidth(), node.getHeight());
                }
            });
        }


        let go = this.#sceneManager.getCurrentScene().getPhysics().getGameObjects();

        let results = [];
        for(let i = 0; i < go.length - 1; i++)
        {
            for(let j = i + 1; j < go.length; j++)
            {
                let c1 = go[i].getComponent("rigidBody").getCollider();
                let c2 = go[j].getComponent("rigidBody").getCollider();
                results.push(new CollisionResult(c1, c2));
            }
        }
        //check for collisions.
        for(let i = 0; i < results.length; i++)
        {
            let hit = CollisionDetector2D.AABBAndAABB(results[i].collider1.getHitBox(), results[i].collider2.getHitBox());
            results[i].collide = hit;
        }

        for(let i = 0; i < results.length; i++)
        {
            let lineColor = "green";
            if(results[i].collide)
            {
                lineColor = "red";
            }
            //console.log("ea");
            DebugDraw.drawAABB(ctx, results[i].collider1.getHitBox(), lineColor);
        }

        for(let i = 0; i < go.length; i++)
        {
            let pos = go[i].getPosition().clone();
            let v = go[i].getVelocity().clone().mult(6);
            let line = new Line(pos, pos.clone().add(v));
            DebugDraw.drawLine(ctx, line, "blue");
            //DebugDraw.
        }
        
    }

    /**
     * Gets the current sceneManager.
     * @returns {SceneManager} the scene manager.
     */
    getSceneManager()
    {
        return this.#sceneManager;
    }

    /**
     * Gets the screen width.
     * @returns {number} The screen width.
     */
    getScreenWidth()
    {
        return this.#SCREEN_WIDTH;
    }

    /**
     * Gets the screen height.
     * @returns {number} The screen height.
     */
    getScreenHeight()
    {
        return this.#SCREEN_HEIGHT;
    }
}






