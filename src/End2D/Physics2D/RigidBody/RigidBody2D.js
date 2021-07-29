import GameObject from "../../GameObject.js";
import Vec2 from "../../Utilities/Vec2.js";
import Component from "../../Component/Component.js";
import Collider2D from "../Primitives/Collider2D.js";

export default class RigidBody2D extends Component
{
    #position;
    #rotation;
    
    /**
     * @type {Collider2D} - The collider object.
     */
    #collider;
    #collidable;

    /**
     * Creates a new RigidBody2D for an gameObject. Attatching this to an gameObject will 
     * automatically add the gameObject to the physics engine for movement and collisions.
     * @param {GameObject} gameObject - The gameObject this component is attatched to.
     */
    constructor(gameObject)
    {
        super(gameObject, "rigidBody");
        this.#position = new Vec2();
        this.#rotation = 0;
        this.#collidable = true;
        this.#createDefaultCollider();
    }

    /**
     * Creates a default collider for this rigidBody. 
     */
    #createDefaultCollider()
    {
        let min = new Vec2();
        let max = new Vec2(this.getGameObject().getWidth(), this.getGameObject().getHeight());
        this.#collider = new Collider2D(min, max);
    }

    /**
     * Gets the position of this rigidBody.
     * @returns {Vec2} The position of this rigidBody.
     */
    getPosition(){return this.#position;}

    /**
     * Gets the rotation of this rigidBody in degrees.
     * @returns {number} The rotation of this rigidBody in degrees.
     */
    getRotation(){return this.#rotation;}

    /**
     * Sets the position to the provided Vec2 position object.
     * @param {Vec2} position - The new position object.
     */
    setPosition(position){this.#position = position;}

    /**
     * Sets the rotation of this rigidBody in degrees.
     * @param {number} rotation - The rotation.
     */
    setRotation(rotation){this.#rotation = rotation;}

    /**
     * Gets the collider of this rigidBody.
     * @returns {Collider2D} The collider.
     */
    getCollider()
    {
        return this.#collider;
    }

    /**
     * Checks to see if this rigidBody is collidable.
     * @returns {boolean} True if collidable, false otherwise.
     */
    isCollidable()
    {
        return this.#collidable;
    }

    /**
     * Sets this rigidBody to be collidable or not.
     * @param {boolean} collidable - Iscollidable.
     */
    setCollidable(collidable)
    {
        this.#collidable = collidable;
    }

    /**
     * Sets the collider for this rigidBody.
     * @param {Collider2D} collider - The new collider.
     */
    setCollider(collider)
    {
        this.#collider = collider;
    }


    update(deltaT)
    {
        //Change the position of this rigidBody to match that of the gameobject.
        let objPos = this.getGameObject().getPosition();
        this.#position.setX(objPos.getX());
        this.#position.setY(objPos.getY());
        
    }
}