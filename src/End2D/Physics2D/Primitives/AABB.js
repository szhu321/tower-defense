import Vec2 from "../../Utilities/Vec2.js";
import RigidBody2D from "../RigidBody/RigidBody2D.js";

export default class AABB
{
    //#center;
    #size;
    #halfSize;
    #rigidBody;
    #type = "aabb";

    /**Takes two vector as params, min:Vec2 - the top left, max:Vec2 - the bottom right
     * @param {Vec2} min - the minimum coord.
     * @param {Vec2} max - the maximun coord.
    */
    constructor(min, max)
    {
        this.#size = max.clone().sub(min);
        this.#halfSize = this.#size.clone().mult(0.5);
        this.#rigidBody = null;
        //this.#center = min.clone().add(this.#size.clone().mult(0.5));
    }

    /**
     * Gets the min coord of this aabb.
     * @returns {Vec2} The min coord.
     */
    getMin()
    {
        //the rigidbody position is assumed to be the center.
        return this.#rigidBody.getPosition().clone().sub(this.#halfSize);
    }

    /**
     * Gets the max coord of this aabb.
     * @returns {Vec2} The max coord.
     */
    getMax()
    {
        return this.#rigidBody.getPosition().clone().add(this.#halfSize);
    }

    /**
     * Gets the half size of this rectangle.
     * @returns {Vec2} the half size.
     */
     getHalfSize()
     {
         return this.#halfSize;
     }

    /**
     * Gets the type of this shape. Its a "aabb".
     * @returns {string} "aabb".
     */
    getType()
    {
    return this.#type;
    }

    /**
     * Gets the rigidbody of this shape.
     * @returns {RigidBody2D} The rigidbody of this shape.
     */
    getRigidBody()
    {
        return this.#rigidBody;
    }
}
