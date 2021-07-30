import PlayerController from "../../End2D/Component/PlayerController.js";
import WorldBound from "../../End2D/Component/WorldBound.js";
import GameObject from "../../End2D/GameObject.js";
import RigidBody2D from "../../End2D/Physics2D/RigidBody/RigidBody2D.js";
import Scene from "../../End2D/Scene.js";
import Enemy from "../Entities/Enemy.js";

export default class GameLevel extends Scene
{
    /**
     * @type {GameObject}
     */
    player;

    create()
    {
        this.addPlayer();
        this.addEnemy(500, 300);
        this.addEnemy(700, 500);
        // let circ = new Circle();
        // console.log(circ.getRadius());
    }

    update(deltaT)
    {
        
    }

    addPlayer()
    {
        this.player = new GameObject(this);
        this.player.setGroup("player");
        this.add(this.player);
        this.player.addComponent(new PlayerController(this.player));
        this.player.addComponent(new RigidBody2D(this.player));
        this.player.addComponent(new WorldBound(this.player, this.getGame().getScreenWidth(), this.getGame().getScreenHeight()));
        
    }

    addEnemy(x, y)
    {
        let enemy = new Enemy(this);
        enemy.setPosition(x, y);
    }
}
