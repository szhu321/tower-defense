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
            this.gameObject.velocity.setY(-5);
        else if(Input.isKeyPressed("s"))
            this.gameObject.velocity.setY(5);
        else
            this.gameObject.velocity.setY(0);
        if(Input.isKeyPressed("a"))
            this.gameObject.velocity.setX(-5);
        else if(Input.isKeyPressed("d"))
            this.gameObject.velocity.setX(5);
        else
            this.gameObject.velocity.setX(0);
    }
}