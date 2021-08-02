import GameObject from "../GameObject/GameObject.js";
import Emitter from "../Event/Emitter.js";
import Receiver from "../Event/Receiver.js";


/** components can be added to gameObjects to provide some additional functionality.*/
export default class Component
{
    #gameObject;
    
    /**
     * string - the name of the component. Note: a gameobject cannot have two components with the same name.
     * @type {string}
     */
    #name; 
    #priority;
    #emitter;
    #receiver;

    /**
     * Creates a new Component object to be attached to gameObjects. Components are like a shell with an update method.
     * @param {GameObject} gameObject - The gameObject this component is attatched to.
     * @param {string} name - The name of this component. Note: a gameobject cannot have two components with the same name.
     */
    constructor(gameObject, name)
    {
        this.#gameObject = gameObject;
        this.#name = name;
        this.#priority = 0;
        this.#emitter = new Emitter(this.#gameObject.getScene().getEventManager(), this);
        this.#receiver = new Receiver(this.#gameObject.getScene().getEventManager(), this);
    }

    /**
     * Updates this component.
     * @param {number} deltaT - The time passed since last frame in seconds.
     */
    update(deltaT)
    {
        //Child classes will provided functionality.
    }

    /**
     * Gets the gameObject that this component is attatched to.
     * @returns {GameObject} The game object.
     */
    getGameObject()
    {
        return this.#gameObject;
    }

    /**
     * Gets the name of this component.
     * @returns {string} The name.
     */
    getName()
    {
        return this.#name;
    }

    /**
     * Gets the priority of this component. Higher priority components gets updated first.
     * @returns {number} - Gets the priority.
     */
    getPriority()
    {
        return this.#priority;
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
     * Destroy this component by setting the gameObject to null.
     * Child classes can further this functionality by doing further cleanup.
     */
    destroy()
    {
        this.#gameObject = null;
    }
}