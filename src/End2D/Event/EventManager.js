import Receiver from "./Receiver.js";
import Event from "./Event.js";

export default class EventManager
{
    /**
     * @type {Receiver[]} The receivers.
     */
    #receivers;
    #scene;

    /**
     * Creates a new event manager.
     * @param {Scene} scene - The scene.
     */
    constructor(scene)
    {
        this.#scene = scene;
        this.#receivers = [];
    }

    /**
     * Accepts an event from an Emitter.
     * @param {Event} event - The event
     */
    acceptEvent(event)
    {
        //forward the event to the correct receivers.
        let name = event.getName();
        for(let r of this.#receivers)
        {
            if(r.hasSubscription(name))
            {
                r.addEvent(event);
            }
        }
    }

    /**
     * Gets the current scene of the eventManager.
     * @returns The scene.
     */
    getScene()
    {
        return this.#scene;
    }

    /**
     * Adds a reciever to this eventManager.
     * @param {Receiver} receiver - The receiver.
     */
    addReceiver(receiver)
    {
        this.#receivers.push(receiver);
    }
}
