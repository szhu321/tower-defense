import Vec2 from "./Utilities/Vec2.js";

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
    width;
    height;
    //collidable = false;

    constructor(scene, x=0, y=0, width = 50, height = 50)
    {
        this.scene = scene;
        //this.scene.add(this);
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(0, 0);
        this.components = new Array();
        this.width = width;
        this.height = height;
    }

    /** sets the position of the game object.*/
    setPosition(x, y)
    {
        this.position.setX(x);
        this.position.setY(y);
    }

    /** sets the velocity of the game object.*/
    setVelocity(x, y)
    {
        this.velocity.setX(x);
        this.velocity.setY(y);
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
            component.update(deltaT);
        }

        //preform physics.
        this.position.add(this.velocity);

        this.update(deltaT);
    }

    update(deltaT)
    {
        //overridden by child class
    }

    addComponent(component)
    {
        this.components.push(component);
    }
}
