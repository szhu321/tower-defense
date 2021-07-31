import GameObject from "../../GameObject.js";
import DebugDraw from "../../Rendering/DebugDraw.js";
import CollisionDetector2D from "../RigidBody/CollisionDetector2D.js";
import Overlap from "./Overlap.js";
import CollisionResult from "./CollisionResult.js";

export default class PhysicsManager
{
    /**
     * @type {GameObject[]}
     */
    #gameObjects;
    #scene; //the scene that the physics manager is connected to.
    
    /**
     * @type {CollisionResult[]} Stores information on each collision detection.
     */
    #collisionResults;


    /**
     * @type {Overlap[]} Callbacks to run when certain collisions occur.
     */
    #overlaps;

    /**
     * Creates a new physics manager that will take care of collisions and movements.
     * @param {Scene} scene - The scene.
     */
    constructor(scene)
    {
        this.#gameObjects = [];
        this.#scene = scene;
        this.#collisionResults = [];
        this.#overlaps = [];
    }

    /**
     * Gets the gameObjects.
     * @returns {GameObject[]} The gameObjects.
     */
    getGameObjects()
    {
        return this.#gameObjects;
    }

    addGameObject(gameObject)
    {
        this.#gameObjects.push(gameObject);
    }

    removeGameObject(gameObject)
    {
        //TODO:
    }

    /**
     * Updates all the physics of the included gameObjects.
     * @param {number} deltaT - The change in time.
     */
    update(deltaT)
    {
        //clear results.
        while(this.#collisionResults.length > 0)
            this.#collisionResults.pop();


        //let results = [];
        for(let i = 0; i < this.#gameObjects.length - 1; i++)
        {
            let r1 = this.#gameObjects[i].getComponent("rigidBody");
            if(!r1.isCollidable())
                continue;
            for(let j = i + 1; j < this.#gameObjects.length; j++)
            {
                let r2 = this.#gameObjects[j].getComponent("rigidBody");
                if(!r2.isCollidable())
                    continue;
                this.#collisionResults.push(new CollisionResult(r1.getCollider(), r2.getCollider()));
            }
        }
        //check for collisions.
        for(let i = 0; i < this.#collisionResults.length; i++)
        {
            let hit = CollisionDetector2D.AABBAndAABB(this.#collisionResults[i].collider1.getHitBox(), this.#collisionResults[i].collider2.getHitBox());
            this.#collisionResults[i].collide = hit;
        }

        //check the overlaps and run callbacks.
        for(let i = 0; i < this.#collisionResults.length; i++)
        {
            let result = this.#collisionResults[i];
            if(!result.collide)
                continue;
            let g1 = result.collider1.getGameObject().getGroup();
            let g2 = result.collider2.getGameObject().getGroup();
            for(let j = 0; j < this.#overlaps.length; j++)
            {
                let currentOverlap = this.#overlaps[j];
                if(currentOverlap.getGroupOne() === g1 && currentOverlap.getGroupTwo() === g2)
                {
                    currentOverlap.runCallback(result.collider1.getGameObject(), result.collider2.getGameObject());
                }
                else if(currentOverlap.getGroupOne() === g2 && currentOverlap.getGroupTwo() === g1)
                {
                    currentOverlap.runCallback(result.collider2.getGameObject(), result.collider1.getGameObject());
                }
            }
        }



        // let canvas = document.getElementById("gamewindow");
        // let ctx = canvas.getContext("2d");

        

        // for(let i = 0; i < results.length; i++)
        // {
        //     let lineColor = "green";
        //     if(results[i].collide)
        //     {
        //         lineColor = "red";
        //     }
        //     //console.log("ea");
        //     DebugDraw.drawAABB(ctx, results[i].collider1.getHitBox(), lineColor);
        // }

        //everything that is collidable will collide with one another.
        



        //here is the plan. Check all the collisions that has to be checked with manifolds.



        //collision resolution.


        //update the positions of gameObjects.
        for(let i = 0; i < this.#gameObjects.length; i++)
        {
            let go = this.#gameObjects[i];
            go.setX(go.getX() + go.getVelocity().getX());
            go.setY(go.getY() + go.getVelocity().getY());
        }
    }

    /**
     * Creates a collision overlap. The callback will run when a collision between the two group has been detected.
     * @param {string} groupName1 - The first group name. 
     * @param {string} groupName2 - The second group name.
     * @param {function} callback - The callback function.
     * @param {*} context - The context.
     */
    addOverLap(groupName1, groupName2, callback, context = null)
    {
        this.#overlaps.push(new Overlap(groupName1, groupName2, callback, context));
    }

}

