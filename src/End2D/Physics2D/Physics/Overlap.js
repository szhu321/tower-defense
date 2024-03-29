import GameObject from "../../GameObject/GameObject.js";

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
     * Runs the callback function with the provided context or with this overlap as the context.
     * @param {GameObject} gameObject1 - The first gameObject.
     * @param {GameObject} gameObject2 - The second gameObject.
     */
    runCallback(gameObject1, gameObject2)
    {
        if(this.#context)
        {
            //store the function alreay in end2DTempCallback so that it can be restored later.
            let temp = this.#context.end2DTempCallback;
            this.#context.end2DTempCallback = this.#callback;
            this.#context.end2DTempCallback(gameObject1, gameObject2);
            this.#context.end2DTempCallback = temp;
        }
        else
        {
            this.#callback(gameObject1, gameObject2);
        }
    }
}



