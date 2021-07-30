
export default class Event
{
    #name;
    #data;
    #sender;

    /**
     * 
     * @param {string} name - The name of the event.
     * @param {*} sender - The sender object of the event.
     * @param {*} data - The data inside the event.
     */
    constructor(name, sender, data)
    {
        this.#name = name;
        this.#sender = sender;
        this.#data = data;
    }

    /**
     * Gets the name of this event.
     * @returns {string} - The name.
     */
    getName()
    {
        return this.#name;
    }

    /**
     * Gets who sent this event.
     * @returns {*} The sender.
     */
    getSender()
    {
        return this.#sender;
    }

    /**
     * Gets the data that was passed with this event.
     * @returns {*} The data.
     */
    getData()
    {
        return this.#data;
    }
}
