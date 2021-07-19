
/** components can be added to gameObjects to provide some additional functionality.*/
export default class Component
{
    gameObject;
    name; //string - the name of the component. Note: a gameobject cannot have two components with the same name.
    priority;

    constructor(gameObject, name)
    {
        this.gameObject = gameObject;
        this.name = name;
        this.priority = 0;
    }

    update(deltaT)
    {
        //Child classes will provided functionality.
    }
}