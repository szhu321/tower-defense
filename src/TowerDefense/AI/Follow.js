import State from "../../End2D/StateMachine/State.js";
import Vec2 from "../../End2D/Utilities/Vec2.js";

export default class Follow extends State
{
    update(deltaT)
    {
        let player = this.getStateMachine().player;
        let enemy = this.getGameObject();

        let direction = new Vec2(player.getX() - enemy.getX(), player.getY() - enemy.getY());
        console.log(direction.getX(), direction.getY());
        direction.normalize();
        direction.mult(enemy.speed * deltaT);

        

        enemy.setVelocity(direction.getX(), direction.getY());


        //if the player moves too far away resume moveing left.
        let distanceSquared = Math.pow(player.getX() - enemy.getX(), 2) + Math.pow(player.getY() - enemy.getY(), 2);
        if(distanceSquared > 450 * 450)
        {
            this.getStateMachine().changeState("moveLeft");
        }
    }
}
