import GameObject from "../../GameObject.js";

export default class PhysicsManager
{
    /**
     * @type {GameObject[]}
     */
    gameObjects;
    scene; //the scene that the physics manager is connected to.

    /**
     * Creates a new physics manager that will take care of collisions and movements.
     * @param {Scene} scene - The scene.
     */
    constructor(scene)
    {
        this.gameObjects = [];
    }

    /**
     * Updates all the physics of the included gameObjects.
     * @param {number} deltaT - The change in time.
     */
    update(deltaT)
    {
        this.gameObjects.forEach((gameObject) => {
            
        })
        //check for collisions.

        //everything that is collidable will collide with one another.

        
        //here is the plan. Check all the collisions that has to be checked with manifolds.



        //collision resolution.


        //update the positions of gameObjects.
    }


}

