import PlayerController from "../../End2D/Component/PlayerController.js";
import WorldBound from "../../End2D/Component/WorldBound.js";
import GameObject from "../../End2D/GameObject.js";
import Circle from "../../End2D/Physics2D/Primitives/Circle.js";
import Scene from "../../End2D/Scene.js";

export default class GameLevel extends Scene
{
    player;

    create()
    {
        this.addPlayer();

        // let circ = new Circle();
        // console.log(circ.getRadius());
    }

    update(deltaT)
    {
        
    }

    addPlayer()
    {
        this.player = new GameObject(this);
        this.add(this.player);
        //this.player.addComponent(new WorldBound(this.player, this.game.SCREEN_WIDTH, this.game.SCREEN_HEIGHT));
        this.player.addComponent(new PlayerController(this.player));
        
    }
}
