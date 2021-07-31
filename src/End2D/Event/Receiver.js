import Event from "./Event.js";
import EventManager from "./EventManager.js";

/**
 * A receiver stores events that were sent by other game entities.
 * It can be used to subscribe to events.
 */
export default class Receiver
{
    #eventManager

    #owner

    /**
     * @type {Event[]}
     */
    #eventQueue;

    /**
     * @type {string[]}
     */
    #subscriptions;

    /**
     * Creates a new Receiver.
     * @param {EventManager} eventManager - The event manager.
     * @param {*} owner - The owner of this emitter.
     */
    constructor(eventManager, owner)
    {
        this.#eventManager = eventManager;
        this.#owner = owner;
        //adds this new receiver to the eventManager.
        this.#eventManager.addReceiver(this);
    }

    /**
     * Subscribe to a particular event so that this receiver will receive events of that type.
     * @param {string} eventName - The name of the event.
     */
    subscribe(eventName)
    {
        this.#subscriptions.push(eventName);
    }

    /**
     * Checks to see if this reveiver is subscribed to an event.
     * @param {string} name - The name.
     */
    hasSubscription(name)
    {
        return this.#subscriptions.indexOf(name) !== -1;
    }

    /**
     * Gets the owner of this receiver.
     * @returns {*} The owner of this receiver.
     */
    getOwner()
    {
        return this.#owner;
    }

    /**
     * Adds an event to the event queue. This is called by the eventManager.
     * @param {Event} event - The event.
     */
    addEvent(event)
    {
        this.#eventQueue.push(event);
    }

    /**
     * Gets the next event. If there is none then return undefined.
     * @returns {Event} - The event.
     */
    getNextEvent()
    {
        return this.#eventQueue.pop();
    }

    /**
     * Checks to see if there is any events in the eventQueue.
     * @returns {boolean} True if the eventQueue has events. False otherwise.
     */
    hasNextEvent()
    {
        return this.#eventQueue.length > 0;
    }
}
