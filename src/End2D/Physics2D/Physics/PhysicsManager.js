import GameObject from "../../GameObject.js";
import DebugDraw from "../../Rendering/DebugDraw.js";
import CollisionDetector2D from "../RigidBody/CollisionDetector2D.js";
import CollisionResult from "./CollisionResult.js";

export default class PhysicsManager
{
    /**
     * @type {GameObject[]}
     */
    #gameObjects;
    #scene; //the scene that the physics manager is connected to.

    /**
     * Creates a new physics manager that will take care of collisions and movements.
     * @param {Scene} scene - The scene.
     */
    constructor(scene)
    {
        this.#gameObjects = [];
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

    /**
     * Updates all the physics of the included gameObjects.
     * @param {number} deltaT - The change in time.
     */
    update(deltaT)
    {
        let results = [];
        for(let i = 0; i < this.#gameObjects.length - 1; i++)
        {
            for(let j = i + 1; j < this.#gameObjects.length; j++)
            {
                let c1 = this.#gameObjects[i].getComponent("rigidBody").getCollider();
                let c2 = this.#gameObjects[j].getComponent("rigidBody").getCollider();
                results.push(new CollisionResult(c1, c2));
            }
        }
        //check for collisions.
        for(let i = 0; i < results.length; i++)
        {
            let hit = CollisionDetector2D.AABBAndAABB(results[i].collider1.getHitBox(), results[i].collider2.getHitBox());
            results[i].collide = hit;
        }

        let canvas = document.getElementById("gamewindow");
        let ctx = canvas.getContext("2d");

        

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


}

