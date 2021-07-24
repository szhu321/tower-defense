/**A point object, useful for storing x and y values.
 * It has a x(number) and y(number).
*/
export default class Vec2
{
    #x;
    #y;

    /**
     * 
     * @param {number} x - the x value of this vector. Default to 0.
     * @param {number} y - the y value of this vector. Default to 0.
     */
    constructor(x = 0, y = 0)
    {
        this.#x = x;
        this.#y = y;
    }

    /** returns a copy of this vector
     * @returns {Vec2} - creates a new instance of this vector with the same values.
     */
    clone()
    {
        return new Vec2(this.#x, this.#y);
    }

    /**
     * Subtract this vector by another vector.
     * @param {Vec2} vec - the other vector.
     * @returns {Vec2} this vector.
     */
    sub(vec)
    {
        this.#x -= vec.getX();
        this.#y -= vec.getY();
        return this;
    }

    /**
     * Adds this vector by another vector.
     * @param {Vec2} vec - the other vector.
     * @returns {Vec2} this vector.
     */
    add(vec)
    {
        this.#x += vec.getX();
        this.#y += vec.getY();
        return this;
    }

    /**
     * Divides this vector by a number
     * @param {number} num - the divider
     * @returns {Vec2} this vector.
     */
    div(num)
    {
        this.#x /= num;
        this.#y /= num;
        return this;
    }

    /**
     * Multiplies this vector by a number
     * @param {number} num - the factor
     * @returns {Vec2} this vector.
     */
    mult(num)
    {
        this.#x *= num;
        this.#y *= num;
        return this;
    }

    /**
     * Performs dot product on this vector and another vector.
     * @param {Vec2} vec - another vector
     * @returns {number} the dot product
     */
    dot(vec)
    {
        return this.#x * vec.getX() + this.#y * vec.getY();
    }

    /**
     * Gets the length/magnitude of this vector.
     * @returns {number} The length/magnitude.
     */
    magnitude()
    {
        return Math.sqrt(this.#x * this.#x + this.#y + this.#y);
    }

    /**
     * Gets the length/magnitude squared.
     * @returns {number} The lengthSquared/magnitudeSquared.
     */
    magnitudeSquared()
    {
        return this.#x * this.#x + this.#y + this.#y;
    }

    /** normalizes this vector 
     * @returns {Vec2} this vector.
    */
    normalize()
    {
        let mag = this.magnitude();
        this.#x /= mag;
        this.#y /= mag;
        return this;
    }

    /**turn this vector into the zero vector 
     * @returns {Vec2} this vector.
    */
    zero()
    {
        this.#x = 0;
        this.#y = 0;
        return this;
    }


    /**
     * Gets the x value of this vector.
     * @returns {number} the x value.
     */
    getX(){return this.#x;}

    /**
     * Gets the y value of this vector.
     * @returns {number} the y value.
     */
    getY(){return this.#y;}

    /**
     * Sets the x value of this vector.
     * @param {number} x - new x value.
     */
    setX(x){this.#x = x;}

    /**
     * Sets the y value of this vector.
     * @param {number} y - new y value. 
     */
    setY(y){this.#y = y;}

    /**
     * Sets this vector's value to another vector's values.
     * @param {Vec2} vec2 - the other vector.
     */
    set(vec2)
    {
        this.#x = vec2.getX();
        this.#y = vec2.getY();
    }

}