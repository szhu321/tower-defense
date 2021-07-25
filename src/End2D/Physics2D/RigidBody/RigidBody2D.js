import GameObject from "../../GameObject.js";
import Vec2 from "../../Utilities/Vec2.js";

export default class RigidBody2D extends GameObject
{
    #position;
    #rotation;

    constructor()
    {
        this.#position = new Vec2();
        this.#rotation = 0;
    }

    getPosition(){return this.#position;}
    getRotation(){return this.#rotation;}
    setPosition(position){this.#position = position;}
    setRotation(rotation){this.#rotation = rotation;}
}