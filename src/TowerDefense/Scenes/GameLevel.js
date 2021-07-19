import PlayerController from "../../End2D/Component/PlayerController.js";
import GameObject from "../../End2D/GameObject.js";
import Scene from "../../End2D/Scene.js";

export default class GameLevel extends Scene
{
    player;

    create()
    {
        this.addPlayer();
    }

    update(deltaT)
    {
        
    }

    addPlayer()
    {
        this.player = new GameObject(this);
        this.add(this.player);
        this.player.addComponent(new PlayerController(this.player));
    }
}
