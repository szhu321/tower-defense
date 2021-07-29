import Component from "./Component/Component.js";
import Vec2 from "./Utilities/Vec2.js";

export default class GameObject
{
    #name = "GameObject";
    #group = "none";
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
    
    //collidable = false;

    constructor(scene, x=0, y=0, width = 50, height = 50)
    {
        this.#scene = scene;
        //this.scene.add(this);
        this.#position = new Vec2(x, y);
        this.#velocity = new Vec2(0, 0);
        this.#components = new Array();
        this.#width = width;
        this.#height = height;
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
     * Sets the x position.
     * @param {number} x - The x value.
     */
    setX(x)
    {
        this.#position.setX(x);
    }

    /**
     * Sets the y position.
     * @param {number} y - The x value.
     */
    setY(y)
    {
        this.#position.setY(y);
    }

    /** Gets a copy of the position of the gameObject.
     *  @returns {Vec2} The position.
     */
    getPosition()
    {
        return this.#position.clone();
    }

    /**
     * Gets the x value. Same as running getPosition().getX().
     * @returns {number} The x value.
     */
    getX()
    {
        return this.#position.getX();
    }

    /**
     * Gets the y value. Same as running getPosition().getY().
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
        this.#position.add(this.#velocity);

        this.update(deltaT);
    }

    update(deltaT)
    {
        //overridden by child class
    }

    addComponent(component)
    {
        this.#components.push(component);
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
}
