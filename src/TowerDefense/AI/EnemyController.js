import StateMachine from "../../End2D/StateMachine/StateMachine.js";
import Charge from "./Charge.js";
import Follow from "./Follow.js";
import MoveLeft from "./MoveLeft.js";

export default class EnemyController extends StateMachine
{
    //player = null;

    create(gameObject, data)
    {
        this.gameObject = gameObject;
        this.player = data.player ? data.player : null;

        //console.log(this.player);

        // let moveLeft = new MoveLeft("moveLeft", this, gameObject);
        // this.addState(moveLeft);
        let follow = new Follow("follow", this, gameObject);
        this.addState(follow);
        let charge = new Charge("charge", this, gameObject);
        this.addState(charge);

        this.changeState("follow");
    }
}
