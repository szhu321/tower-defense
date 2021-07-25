import Vec2 from "../../Utilities/Vec2.js";

export default class AABB
{
    //#center;
    #size;
    #halfSize;
    #rigidBody;
    #type = "aabb";

    /**Takes two vector as params, min:Vec2 - the top left, max:Vec2 - the bottom right*/
    constructor(min, max)
    {
        this.#size = max.clone().sub(min);
        this.#halfSize = this.#size.clone().mult(0.5);
        this.#rigidBody = null;
        //this.#center = min.clone().add(this.#size.clone().mult(0.5));
    }

    getMin()
    {
        //the rigidbody position is assumed to be the center.
        return this.#rigidBody.getPosition().clone().sub(this.#halfSize);
    }

    getMax()
    {
        return this.#rigidBody.getPosition().clone().add(this.#halfSize);
    }

    /**
     * Gets the type of this shape. Its a "aabb".
     * @returns {string} "aabb".
     */
    getType()
    {
    return this.#type;
    }
}
