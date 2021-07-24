import Vec2 from "../../Vec2.js";

export default class Rectangle
{
    #size;
    #halfSize;
    #rigidBody;

    /**Takes two vector as params, min:Vec2 - the top left, max:Vec2 - the bottom right*/
    constructor(min, max)
    {
        this.#size = max.clone().sub(min);
        this.#halfSize = this.#size.clone().mult(0.5);
        this.#rigidBody = null;
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

    getVertices()
    {
        let min = this.getMin();
        let max = this.getMax();

        let vertices = [new Vec2(min.getX(), min.getY()), new Vec2(min.getX(), max.getY()),
                        new Vec2(max.getX(), min.getY()), new Vec2(max.getX(), max.getY())];
        
        //TODO: implement rotation

        return vertices;
    }

    getRigidBody()
    {
        return this.#rigidBody;
    }
}


