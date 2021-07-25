import RigidBody2D from "../RigidBody/RigidBody2D.js";
import Vec2 from "../../Utilities/Vec2.js";

export default class Circle
{
    #radius = 1;
    #rigidBody;
    #type = "circle";

    /**
     * 
     * @param {number} [radius=1] - the radius of this number.
     * @param {RigidBody2D} [rigidBody=null] - the rigidBody of this object.
     */
    constructor(radius = 1, rigidBody = null)
    {
        this.#radius = radius;
        this.#rigidBody = rigidBody;
    }

    /**
     * Gets the radius of this circle.
     * @returns {number} the radius.
     */
    getRadius()
    {
        return this.#radius;
    }

    /**
     * Gets the center of this circle.
     * @returns {Vec2} The center.
     */
    getCenter()
    {
        return this.#rigidBody.position();
    }

    /**
     * Gets the type of this shape. Its a "circle".
     * @returns {string} "circle".
     */
    getType()
    {
        return this.#type;
    }
}
