
/**
 * Stores an gameObject as well as all the other gameObjects that it collided with.
 */
export default class CollisionHit
{
    #current;
    #others;

    constructor(currentGameObject)
    {
        this.#current = currentGameObject;
    }
}

