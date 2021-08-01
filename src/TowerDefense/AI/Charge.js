import State from "../../End2D/StateMachine/State.js";
import Vec2 from "../../End2D/Utilities/Vec2.js";

export default class Charge extends State
{
    defaultLungeTime = 2;
    defaultPauseTime = 0.5;

    onEnter()
    {
        this.lungeTime = this.defaultLungeTime;
        this.pauseTime = this.defaultPauseTime;
        let player = this.getStateMachine().player;
        let enemy = this.getGameObject();
        this.dir = new Vec2(player.getX() - enemy.getX(), player.getY() - enemy.getY());
        this.dir.normalize();
    }

    onExit(){}

    update(deltaT)
    {
        let enemy = this.getGameObject();

        this.pauseTime -= deltaT;
        if(this.pauseTime < 0)
        {
            this.lungeTime -= deltaT;
            if(this.lungeTime < 0)
            {
                let x = Math.random();
                // if(x < 0.5)
                // {
                    this.getStateMachine().changeState("follow");
                // }
                // else
                // {
                //     this.getStateMachine().changeState("roam");
                // }
            }
            
            enemy.setVelocity(this.dir.getX() * enemy.speed * 15 * deltaT, this.dir.getY() * enemy.speed * 5 * deltaT);
        }
        else
        {
            enemy.setVelocity(0,0);
        }
    }
}
