import Vec2 from "../../Utilities/Vec2.js";

export default class Line
{
    #start;
    #end;

    /**
     * 
     * @param {Vec2} start - the start vector
     * @param {Vec2} end - the end vector
     */
    constructor(start, end)
    {
        this.#start = start;
        this.#end = end;
    }

    /**
     * Gets the starting vector of this line segment.
     * @returns {Vec2} The start vector.
     */
    getStart(){return this.#start;}
    getEnd() {return this.#end;}
    setStart(start){this.#start = start;}
    setEnd(end){this.#end = end;}

    lengthSquared()
    {
        return this.#end.clone().sub(this.#start).magnitudeSquared();
    }
}
