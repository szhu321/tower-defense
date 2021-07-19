
/** Houses the gameobjects and other important components. */
export default class Scene
{ 
    game;
    gameObjects;
    constructor(game)
    {
        this.game = game;
        this.gameObjects = [];
        this.create();
    }

    /**does some update before calling the actual update method. */
    preUpdate(deltaT)
    {
        //update all the gameobjects.
        for(let obj of this.gameObjects)
        {
            obj.preUpdate();
        }
        this.update();
    }

    /** runs immediately after the constructor. Gets called automatically by the constructor.*/
    create()
    {

    }

    /** update the scene, as well as all the gameObjects on the scene. Will be called by game every tick.*/
    update(deltaT)
    {
        
        
    }

    /** add the game object onto the gameObjects array.*/
    add(gameObject)
    {
        this.gameObjects.push(gameObject);
    }

    remove(gameObject)
    {
        let idx = this.gameObjects.indexOf(gameObject);
        if(idx !== -1)
        {
            this.gameObjects.splice(idx, 1);
        }
    }
}













