import StateMachine from "../../End2D/StateMachine/StateMachine.js";
import Follow from "./Follow.js";
import MoveLeft from "./MoveLeft.js";

export default class EnemyController extends StateMachine
{
    create(gameObject, data)
    {
        this.gameObject = gameObject;
        this.player = data.player ? data.player : null;

        let moveLeft = new MoveLeft("moveLeft", this, gameObject);
        this.addState(moveLeft);
        let follow = new Follow("follow", this, gameObject);
        this.addState(follow);

        this.changeState("moveLeft");
    }
}
