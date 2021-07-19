import Component from "./Component";

export default class PlayerController extends Component
{
    constructor(gameObject)
    {
        super(gameObject, "PlayerController");
    }

    update(deltaT)
    {
        let mousePos = input.getMousePosition();
            
        //checks to see if any of the control keys are pressed or not.
        if(input.isKeyPressed("w"))
            this.gameObject.velocity.y = -5;
        else if(input.isKeyPressed("s"))
            this.gameObject.velocity.y = 5;
        else
            this.gameObject.velocity.y = 0;
        if(input.isKeyPressed("a"))
            this.gameObject.velocity.x = -5;
        else if(input.isKeyPressed("d"))
            this.gameObject.velocity.x = 5;
        else
            this.gameObject.velocity.x = 0;
    }
}