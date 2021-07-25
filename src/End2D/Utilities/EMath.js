import Vec2 from "./Vec2.js";

/**
 * Includes some useful math functions that can be called statically.
 */
export default class EMath
{
    /**
     * Rotates a vector an given amount of degrees about an origin.
     * @param {Vec2} vec2 - the vector to be rotated.
     * @param {number} deg - the angle of rotation in degrees.
     * @param {Vec2} origin - the point to rotate about.
     */
    static rotate(vec2, deg, origin)
    {
        let x = vec2.getX() - origin.getX();
        let y = vec2.getY() - origin.getY();

        let rad = EMath.toRadians(deg);
        let sin = Math.sin(rad);
        let cos = Math.cos(rad);

        let newX = x * cos - y * sin;
        let newY = x * sin + y * cos;

        newX += origin.getX();
        newY += origin.getY();

        vec2.setX(newX);
        vec2.setY(newY);
    }

    /** compare two decimal number with an epsilon to remove any rounding errors.
     * @param {number} x - the first number.
     * @param {number} y - the second number.
     * @returns {boolean} True if the two numbers are equal. False otherwise.
    */
    static compare(x, y)
    {
        return Math.abs(x - y) < Number.EPSILON;
    }

    /** compare two vectors with an epsilon to remove any rounding errors.
     * Ex. epsilon can be 0.0001 for 4 decimal point precision.
     * @param {Vec2} vec1 - the first vector.
     * @param {Vec2} vec2 - the second vecotr.
     * @returns {boolean} True if the two vectors are equal. False otherwise.
    */
    static compareVec2(vec1, vec2)
    {
        return this.compare(vec1.getX(), vec2.getX()) && this.compare(vec1.getY(), vec2.getY());
    }

    /**Converts a given degree to radians.
     * @param {number} deg - the angle in degrees.
     * @returns {number} the angle in radians.
     */
    static toRadians(deg)
    {
        return (Math.PI / 180) * deg;
    }
}