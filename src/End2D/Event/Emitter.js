import EventManager from "./EventManager.js";
import Event from "./Event.js";

export default class Emitter
{
    #eventManager;
    
    #owner;//could be gameObject or scene or something else.

    /**
     * 
     * @param {EventManager} eventManager - The event manager.
     * @param {*} owner - The owner of this emitter.
     */
    constructor(eventManager, owner)
    {
        this.#eventManager = eventManager;
        this.#owner = owner;
    }

    /**
     * Sends an event to to eventManager.
     * @param {string} eventName - The name of the event.
     * @param {*} data - The data of the event.
     */
    fireEvent(eventName, data)
    {
        let event = new Event(eventName, this.#owner, data);
        this.#eventManager.acceptEvent(event);
    }

}
