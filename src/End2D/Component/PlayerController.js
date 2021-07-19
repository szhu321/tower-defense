import Input from "../Input.js";
import Component from "./Component.js";

export default class PlayerController extends Component
{
    constructor(gameObject)
    {
        super(gameObject, "PlayerController");
    }

    update(deltaT)
    {
        let mousePos = Input.getMousePosition();
        
        //checks to see if any of the control keys are pressed or not.
        if(Input.isKeyPressed("w"))
            this.gameObject.velocity.y = -5;
        else if(Input.isKeyPressed("s"))
            this.gameObject.velocity.y = 5;
        else
            this.gameObject.velocity.y = 0;
        if(Input.isKeyPressed("a"))
            this.gameObject.velocity.x = -5;
        else if(Input.isKeyPressed("d"))
            this.gameObject.velocity.x = 5;
        else
            this.gameObject.velocity.x = 0;
    }
}