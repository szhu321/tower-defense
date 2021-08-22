import Component from "../Component/Component.js";
import Vec2 from "../Utilities/Vec2.js";
import Scene from "../Scene/Scene.js";
import Emitter from "../Event/Emitter.js";
import Receiver from "../Event/Receiver.js";

export default class GameObject
{
    #name = "GameObject";
    #group = "none";
    #renderingType;
    #position;
    #velocity;
    #visible = true;
    #updateable = true;
    #scene;
    #width;
    #height;
    //#emitter;
    /**
     * @type {Component[]} An array of this gameObject's components.
     */
    #components;
    #emitter;
    #receiver;
    
    //collidable = false;

    /**
     * Creates a new gameObject. The game object is not automatically added to the scene.
     * @param {Scene} scene - The scene.
     * @param {number} [x=0] - The x value.
     * @param {number} [y=0] - The y value.
     * @param {number} [width=50] - The width.
     * @param {number} [height=50] - The height.
     */
    constructor(scene, x=0, y=0, width = 50, height = 50)
    {
        this.#scene = scene;
        //this.scene.add(this);
        this.#position = new Vec2(x, y);
        this.#velocity = new Vec2(0, 0);
        this.#components = new Array();
        this.#width = width;
        this.#height = height;
        this.#emitter = new Emitter(this.#scene.getEventManager(), this);
        this.#receiver = new Receiver(this.#scene.getEventManager(), this);
    }

    /**
     * Gets the name of this gameObject.
     * @returns {string} - The name.
     */
    getName()
    {
        return this.#name;
    }

    /**
     * Sets the name of this gameObject. The name is for your use.
     * @param {string} name - The name.
     */
    setName(name)
    {
        this.#name = name;
    }

    /**
     * Gets the group name of this gameObject. Used for collisions.
     * @returns {string} The group name.
     */
    getGroup()
    {
        return this.#group;
    }

    /**
     * Sets the group name of this gameObject. Used for collisions.
     * @param {string} group - The group name.
     */
    setGroup(group)
    {
        this.#group = group;
    }

    /** Sets the position of the gameObject.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
    */
    setPosition(x, y)
    {
        this.#position.setX(x);
        this.#position.setY(y);
    }
    
    /**
     * Sets the x position. This is the centerX of the gameObject.
     * @param {number} x - The x value.
     */
    setX(x)
    {
        this.#position.setX(x);
        let rb = this.getComponent("rigidBody");
        if(rb)
        {
            rb.getPosition().setX(x);
        }
    }

    /**
     * Sets the y position. This is the centerY of the gameObject.
     * @param {number} y - The x value.
     */
    setY(y)
    {
        this.#position.setY(y);
        let rb = this.getComponent("rigidBody");
        if(rb)
        {
            rb.getPosition().setY(y);
        }
    }

    /** Gets a copy of the position of the gameObject.
     *  @returns {Vec2} The position.
     */
    getPosition()
    {
        return this.#position.clone();
    }

    /**
     * Gets the x value. Same as running getPosition().getX(). This is the centerX of the gameObject.
     * @returns {number} The x value.
     */
    getX()
    {
        return this.#position.getX();
    }

    /**
     * Gets the y value. Same as running getPosition().getY(). This is the centerY of the gameObject.
     * @returns {number} The y value.
     */
    getY()
    {
        return this.#position.getY();
    }

    /** Sets the velocity of the gameObject.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
    */
    setVelocity(x, y)
    {
        this.#velocity.setX(x);
        this.#velocity.setY(y);
    }

    /**
     * Sets the x velocity of this gameObject.
     * @param {number} x - The x velocity.
     */
    setVelocityX(x)
    {
        this.#velocity.setX(x);
    }

    /**
     * Sets the y velocity of this gameObject.
     * @param {number} y - The y velocity. 
     */
    setVelocityY(y)
    {
        this.#velocity.setY(y);
    }

    /** Gets a copy of the velocity of the game object.
     * @returns {Vec2} The velocity.
     */
    getVelocity()
    {
        return this.#velocity.clone();
    }

    /**
     * Check if the gameObject is visible.
     * @returns {boolean} True if visible, false otherwise.
     */
    isVisible()
    {
        return this.#visible;
    }

    /**
     * Sets the visibility of this gameObject.
     * @param {boolean} visible - The visibility boolean.
     */
    setVisible(visible)
    {
        this.#visible = visible;
    }

    /**
     * Checks to see if this gameObject is getting updated.
     * @returns {boolean} True if updateable, false otherwise.
     */
    isUpdateable()
    {
        return this.#updateable;
    }

    /**
     * If true the gameObject will be updated. The update method will be called by the game engine.
     * @param {boolean} updateable - True, or false.
     */
    setUpdateable(updateable)
    {
        this.#updateable = updateable;
    }

    /**
     * Gets the scene of this gameObject.
     * @returns {Scene} The scene.
     */
    getScene()
    {
        return this.#scene;
    }

    /**
     * Gets the width.
     * @returns {number} The width.
     */
    getWidth()
    {
        return this.#width;
    }

    /**
     * Sets the width.
     * @param {number} width - The width.
     */
    setWidth(width)
    {
        this.#width = width;
    }

    /**
     * Gets the height.
     * @returns {number} - The height.
     */
    getHeight()
    {
        return this.#height;
    }

    /**
     * Sets the height.
     * @param {number} height - The height. 
     */
    setHeight(height)
    {
        this.#height = height;
    }

    preUpdate(deltaT)
    {
        for(let component of this.#components)
        {
            component.update(deltaT);
        }

        //preform physics.

        this.update(deltaT);
    }

    /**
     * Updates the game object. To be overridden by child classes.
     * @param {number} deltaT - The time that passed in seconds.
     */
    update(deltaT)
    {
        //overridden by child class
    }

    /**
     * Adds the component in order of decreasing priority.
     * @param {Component} component - The component.
     */
    addComponent(component)
    {
        //insertion sort. Not really.
        //this.#components.push(component);
        let idx = 0;
        for(let i = this.#components.length - 1; i >= 0; i--)
        {
            if(this.#components[i].getPriority() >= component.getPriority())
            {
                idx = i + 1;
            }
        }
        this.#components.splice(idx, 0, component);
        //console.log(this.#components);
    }


    /**
     * Gets a component of this game object.
     * @param {string} name - The name of the component.
     * @returns {Component} The component requested. Null if not found.
     */
    getComponent(name)
    {
        for(let c of this.#components)
        {
            if(c.getName() === name)
                return c;
        }
        return null;
    }

    /**
     * Gets the emitter that is used to send events.
     * @returns {Emitter} The emitter.
     */
    getEmitter()
    {
        return this.#emitter;
    }
 
     /**
      * Gets the receiver that is used to subscribe to events and receiver events.
      * @returns {Receiver} The receiver.
      */
    getReceiver()
    {
        return this.#receiver;
    }

    /**
     * Gets the type of object this gameObject will be rendered as.
     * @returns {string} The renderingType.
     */
    getRenderingType()
    {
        return this.#renderingType;
    }

    /**
     * Sets the renderingType of this object.
     * @param {string} type - The type. 
     */
    setRenderingType(type)
    {
        this.#renderingType = type;
    }

    /**
     * Destroys this game object by removing it from all game systems and destroying all its components.
     */
    destroy()
    {
        //first remove it from the scene.
        this.#scene.remove(this);
        //then destroy all components.
        while(this.#components.length > 0)
        {
            let currentComponent = this.#components.pop();
            currentComponent.destroy();
        }
    }
}
