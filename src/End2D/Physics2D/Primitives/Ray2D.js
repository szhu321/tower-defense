import Vec2 from "../../Utilities/Vec2.js";

export default class Ray2D
{
    #origin;
    #direction;

    /**
     * A ray is a vector with a origin and a direction.
     * @param {Vec2} origin - the origin/start of this ray.
     * @param {Vec2} direction - the direction of this ray.
     */
    constructor(origin, direction)
    {
        this.#origin = origin;
        this.#direction = direction;
        this.#direction.normalize();
    }

    /**
     * Gets the origin of the ray.
     * @returns {Vec2} the origin.
     */
    getOrigin()
    {
        return this.#origin;
    }

    /**
     * Gets the direction vector of the ray.
     * @returns {Vec2} the direction.
     */
    getDirection()
    {
        return this.#direction;
    }
}

