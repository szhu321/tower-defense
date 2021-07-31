import GameObject from "../../GameObject.js"
import Vec2 from "../../Utilities/Vec2.js";
import RigidBody2D from "../RigidBody/RigidBody2D.js";
import AABB from "./AABB.js";

export default class Collider2D
{
    #offset;
    #hitbox; //aabb
    #hitboxType;
    #gameObject;

    /**
     * Creates a new collider with an aabb.
     * @param {Vec2} min - The min coord.
     * @param {Vec2} max - The max coord.
     * @param {RigidBody2D} rigidBody - The rigidBody.
     */
    constructor(min, max, rigidBody)
    {
        this.#offset = new Vec2();
        this.#hitbox = new AABB(min, max, rigidBody);
        this.#hitboxType = "aabb";
        this.#gameObject = rigidBody.getGameObject();
    }

    /**
     * Sets how much the hitbox should be offseted relitive to the gameObject.
     * @param {number} x - The x offset.
     * @param {number} y - The y offset.
     */
    setOffset(x, y)
    {
        this.#offset.setX(x);
        this.#offset.setY(y);
    }

    /**
     * Gets the offset of this rigidBody.
     * @returns {Vec2} The offset.
     */
    getOffset()
    {
        return this.#offset;
    }

    /**
     * Gets the hitbox, the type of the hitbox is stored in hitboxType.
     * @returns {any} - The hitbox of this rigidBody.
     */
    getHitBox()
    {
        return this.#hitbox;
    }

    /**
     * Gets the type of the hitbox. Can either be "aabb", "circle" or "rectangle".
     * @returns {string} The type of the hitbox. 
     */
    getHitBoxType()
    {
        return this.#hitboxType;
    }

    /**
     * Sets the hitbox for this rigidBody.
     * @param {string} hitboxType - The type of the hitbox. Either "aabb", "circle" or "rectangle".
     * @param {any} hitbox - The hitbox.
     */
    setHitBox(hitboxType, hitbox)
    {
        this.#hitboxType = hitboxType;
        this.#hitbox = hitbox;
    }


    /**
     * Gets the gameObject that this collider is attatched to.
     * @returns {GameObject} The gameObject.
     */
    getGameObject()
    {
        return this.#gameObject;
    }


    // TODO: in the future.
    // getInertiaTensor(mass)
    // {

    // }
}
