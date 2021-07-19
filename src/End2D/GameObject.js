import { Vec2 } from "../utils";

export default class GameObject
{
    name = "GameObject";
    group = "none";
    position;
    velocity;
    visible = true;
    updateable = true;
    scene;
    emitter;
    components;
    //collidable = false;

    constructor(scene, x=0, y=0)
    {
        this.scene = scene;
        this.scene.add(this);
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(0, 0);
        this.components = new Array();
    }

    /** sets the position of the game object.*/
    setPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    /** sets the velocity of the game object.*/
    setVelocity(x, y)
    {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    /** gets a copy of the position of the game object. */
    getPosition()
    {
        return this.position.clone();
    }

    /** gets a copy of the velocity of the game object. */
    getVelocity()
    {
        return this.velocity.clone();
    }

    preUpdate(deltaT)
    {
        for(let component of this.components)
        {
            component.update();
        }
        this.update(deltaT);
    }

    update(deltaT)
    {
        //overridden by child class
    }
}
