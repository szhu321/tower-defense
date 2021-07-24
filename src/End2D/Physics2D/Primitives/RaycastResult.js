import Vec2 from "../../Vec2.js";

export default class RaycastResult
{
    #point; //Vec2;
    #normal; //Vec2;
    #t; //number;
    #hit; //boolean;

    /**
     * 
     * @param {Vec2} [point=new Vec2()] - the point of contact. 
     * @param {Vec2} [normal= new Vec2()] - the normal. 
     * @param {number} [t=-1] - distance from ray origin to point of contact.
     * @param {boolean} [hit=false] - did the ray hit the object. 
     */
    constructor(point, normal, t, hit)
    {
        this.#point = new Vec2();
        this.#normal = new Vec2();
        this.#t = -1;
        this.#hit = false;
    }

    /**
     * 
     * @param {Vec2} [point=new Vec2()] - the point of contact. 
     * @param {Vec2} [normal= new Vec2()] - the normal. 
     * @param {number} [t=-1] - distance from ray origin to point of contact.
     * @param {boolean} [hit=false] - did the ray hit the object. 
     */
    init(point, normal, t, hit)
    {
        this.#point.set(point);
        this.#normal.set(normal);
        this.#t = t;
        this.#hit = hit;
    }

    /**
     * Resets the given raycastResult object.
     * @param {RaycastResult} raycastResult - the raycastResult
     */
    static reset(raycastResult)
    {
        if(raycastResult != null)
        {
            raycastResult.#point.zero();
            raycastResult.#normal.zero();
            raycastResult.#t = -1;
            raycastResult.#hit = false;
        }
    }
}
