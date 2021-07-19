/**A point object, useful for storing x and y values.
 * It has a x(number) and y(number).
*/
export default class Vec2
{
    x = 0;
    y = 0;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    //** returns a copy of this vector */
    clone()
    {
        return new Vec2(this.x, this.y);
    }
}