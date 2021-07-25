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
            this.getGameObject().setVelocityY(-5);
        else if(Input.isKeyPressed("s"))
            this.getGameObject().setVelocityY(5);
        else
            this.getGameObject().setVelocityY(0);
        if(Input.isKeyPressed("a"))
            this.getGameObject().setVelocityX(-5);
        else if(Input.isKeyPressed("d"))
            this.getGameObject().setVelocityX(5);
        else
            this.getGameObject().setVelocityX(0);
    }
}