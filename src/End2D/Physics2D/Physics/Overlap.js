import GameObject from "../../GameObject.js";

export default class Overlap
{
    #groupOne;
    #groupTwo;
    #callback;
    #context;

    /**
     * 
     * @param {string} groupOne - The group name of the first group.
     * @param {string} groupTwo - The group name of the second group.
     * @param {function} callback - The callback function.
     * @param {*} context - The context to call the callback from.
     */
    constructor(groupOne, groupTwo, callback, context = null)
    {
        this.#groupOne = groupOne;
        this.#groupTwo = groupTwo;
        this.#callback = callback;
        this.#context = context;

        if(this.#context)
        {
            this.#context.end2DTempCallback = callback;
        }
    }

    /**
     * Gets the group name of the first group.
     * @returns {string} The first groupName.
     */
    getGroupOne()
    {
        return this.#groupOne;
    }

    /**
     * Gets the group name of the second group.
     * @returns {string} The second groupName.
     */
    getGroupTwo()
    {
        return this.#groupTwo;
    }

    /**
     * 
     * @param {GameObject} gameObject1 - The first gameObject.
     * @param {GameObject} gameObject2 - The second gameObject.
     */
    runCallback(gameObject1, gameObject2)
    {
        if(this.#context)
        {
            this.#context.end2DTempCallback(gameObject1, gameObject2);
        }
        else
        {
            this.#callback(gameObject1, gameObject2);
        }
    }
}



