import State from "../../End2D/StateMachine/State.js";
import Vec2 from "../../End2D/Utilities/Vec2.js";
import Line from "../../End2D/Physics2D/Primitives/Line.js";
import DebugDraw from "../../End2D/Rendering/DebugDraw.js";

export default class Charge extends State
{
    defaultLungeTime = 2;
    defaultPauseTime = 0.5;
    chargeMult = 10;

    onEnter()
    {
        this.lungeTime = this.defaultLungeTime;
        this.pauseTime = this.defaultPauseTime;
        let player = this.getStateMachine().player;
        let enemy = this.getGameObject();
        this.dir = new Vec2(player.getX() - enemy.getX(), player.getY() - enemy.getY());
        this.dir.normalize();

        // let dir2 = this.dir.clone().mult(2000);
        // let start = new Vec2(enemy.getX(), enemy.getY());
        // let end = start.clone().add(dir2);
        // this.line = new Line(start, end);
        
    }

    onExit(){}

    update(deltaT)
    {
        let enemy = this.getGameObject();
        // let canvas = document.getElementById("gamewindow");
        // let ctx = canvas.getContext("2d");
        // DebugDraw.drawLine(ctx, this.line, "red");

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
            
            enemy.setVelocity(this.dir.getX() * enemy.speed * this.chargeMult * deltaT, this.dir.getY() * enemy.speed * this.chargeMult * deltaT);
        }
        else
        {
            enemy.setVelocity(0,0);
        }
    }
}
