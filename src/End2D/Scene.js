import GameObject from "./GameObject.js";
import Game from "./game.js";
import PhysicsManager from "./Physics2D/Physics/PhysicsManager.js";
import EventManager from "./Event/EventManager.js";
import Receiver from "./Event/Receiver.js";
import Emitter from "./Event/Emitter.js";

/** Houses the gameobjects and other important components. */
export default class Scene
{ 
    #game;
    #gameObjects;
    #physics;
    #eventManager;
    #emitter;
    #receiver;
    #created;

    /**
     * Creates a new scene.
     * @param {Game} game - the game instance.
     * @param {GameObject[]} [gameObjects=[]] - some game objects. Defaults to empty array.
     */
    constructor(game, gameObjects=[])
    {
        this.#game = game;
        this.#gameObjects = gameObjects;
        this.#physics = new PhysicsManager(this);
        this.#eventManager = new EventManager(this);
        this.#receiver = new Receiver(this.#eventManager, this);
        this.#emitter = new Emitter(this.#eventManager, this);
        this.#created = false;
        //this.create();
    }

    /**does some update before calling the actual update method. 
     * @param {number} deltaT - The time that passed in milliseconds since the last update.
    */
    preUpdate(deltaT)
    {
        if(!this.#created)
        {
            this.#created = true;
            this.create();
        }
        //update all the gameobjects.
        for(let obj of this.#gameObjects)
        {
            if(obj.isUpdateable())
                obj.preUpdate(deltaT);
        }
        this.update(deltaT);
        this.#physics.update(deltaT);
    }

    /** runs immediately after the constructor. Gets called automatically by the constructor.*/
    create()
    {

    }

    /** update the scene, as well as all the gameObjects on the scene. Will be called by game every tick.
     * @param {number} deltaT - The time that passed in seconds since the last update.
    */
    update(deltaT)
    {
        
    }

    /** Adds the game object onto the gameObjects array.
     * @param {GameObject} gameObject - The game object.
    */
    add(gameObject)
    {
        this.#gameObjects.push(gameObject);
    }

    /**
     * Removes the given game object from the scene. Does nothing if the gameobject is not found.
     * @param {GameObject} gameObject - The game object.
     */
    remove(gameObject)
    {
        //console.log(gameObject);
        let idx = this.#gameObjects.indexOf(gameObject);
        if(idx !== -1)
        {
            this.#gameObjects.splice(idx, 1);
        }
    }

    /**
     * Gets the physics manager.
     * @returns {PhysicsManager} The physics manager
     */
    getPhysics()
    {
        return this.#physics;
    }

    /**
     * Gets the eventManager.
     * @returns {EventManager} The eventManager.
     */
    getEventManager()
    {
        return this.#eventManager;
    }

    /**
     * Gets the game instance on the scene.
     * @returns {Game} The scene's game instance.
     */
    getGame(){return this.#game};

    /**
     * Gets the scene's array of game objects.
     * @returns {GameObject[]} The game objects.
     */
    getGameObjects(){return this.#gameObjects};

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

}













