import Collider2D from "../Primitives/Collider2D.js";

export default class CollisionResult
{
    collider1;
    collider2;
    collide;

    /**
     * 
     * @param {Collider2D} collider1 
     * @param {Collider2D} collider2 
     */
    constructor(collider1, collider2)
    {
        this.collider1 = collider1;
        this.collider2 = collider2;
        this.collide = false;
    }
}