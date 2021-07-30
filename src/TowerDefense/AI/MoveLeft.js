import State from "../../End2D/StateMachine/State.js";

export default class MoveLeft extends State
{
    update(deltaT)
    {
        let enemy = this.getGameObject();
        let player = this.getStateMachine().player;
        enemy.setVelocityX(-enemy.speed * deltaT);
        enemy.setVelocityY(0);

        //if the enemy gets close to the player follow.
        let distanceSquared = Math.pow(player.getX() - enemy.getX(), 2) + Math.pow(player.getY() - enemy.getY(), 2);
        if(distanceSquared < 300 * 300)
        {
            this.getStateMachine().changeState("follow");
        }
    }
}
