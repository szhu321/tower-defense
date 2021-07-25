import Vec2 from "../../Utilities/Vec2.js";
import RigidBody2D from "../RigidBody/RigidBody2D.js";

export default class Rectangle
{
    #size;
    #halfSize;
    #rigidBody;
    #type = "rectangle";

    /**Takes two vector as params, min:Vec2 - the top left, max:Vec2 - the bottom right
     * @param {Vec2} min - the top left.
     * @param {Vec2} max - the bottom right.
     * @param {RigidBody2D} [rigidBody=null] - the rigidbody.
    */
    constructor(min, max, rigidBody = null)
    {
        this.#size = max.clone().sub(min);
        this.#halfSize = this.#size.clone().mult(0.5);
        this.#rigidBody = rigidBody;
    }

    /**
     * Gets the min vector of the rectangle.
     * @returns {Vec2} the min vector.
     */
    getMin()
    {
        //the rigidbody position is assumed to be the center.
        return this.#rigidBody.getPosition().clone().sub(this.#halfSize);
    }

    /**
     * Gets the max vector of the rectangle.
     * @returns {Vec2} the max vector.
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

    getVertices()
    {
        let min = this.getMin();
        let max = this.getMax();

        let vertices = [new Vec2(min.getX(), min.getY()), new Vec2(min.getX(), max.getY()),
                        new Vec2(max.getX(), min.getY()), new Vec2(max.getX(), max.getY())];
        
        //TODO: implement rotation

        return vertices;
    }

    /**
     * Gets the rigidbody for this object.
     * @returns {RigidBody2D} the rigidbody for this object.
     */
    getRigidBody()
    {
        return this.#rigidBody;
    }

    /**
     * Gets the type of this shape. Its a "rectangle".
     * @returns {string} "rectangle".
     */
    getType()
    {
        return this.#type;
    }
}


