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
    player = "hello";

    create()
    {
        
        let WIDTH = this.getGame().getScreenWidth()
        let HEIGHT = this.getGame().getScreenHeight()

        this.addPlayer();
        for(let i = 0; i <= 0; i++)
        {
            let x1 = Math.random();
            let x2 = Math.random();
            this.addEnemy((WIDTH * 0.8) + (x1 * WIDTH * (0.2)), x2 * HEIGHT);
        }
        
        this.defaultSpawnTime = 2;
        this.spawnTime = this.defaultSpawnTime;
        //console.log(this.defaultSpawnTime);
        // let circ = new Circle();
        // console.log(circ.getRadius());

        this.getPhysics().addOverLap("player", "enemy", this.playerHitEnemy, this);
    }

    update(deltaT)
    {
        //console.log(this);

        this.spawnTime -= deltaT;
        //console.log(this.spawnTime);
        if(this.spawnTime < 0)
        {
            this.spawnTime = this.defaultSpawnTime;
            let WIDTH = this.getGame().getScreenWidth()
            let HEIGHT = this.getGame().getScreenHeight()
            let x1 = Math.random();
            let x2 = Math.random();
            this.addEnemy((WIDTH * 0.8) + (x1 * WIDTH * (0.2)), x2 * HEIGHT);
        }
    }

    addPlayer()
    {
        console.log(this);
        console.log(this["player"]);

        this.player = new GameObject(this);
        console.log(this);
        console.log(this.player);
        this.player.setGroup("player");
        this.player.setPosition(50, 50);
        this.add(this.player);
        this.player.addComponent(new PlayerController(this.player));
        this.player.addComponent(new RigidBody2D(this.player));
        this.player.addComponent(new WorldBound(this.player, this.getGame().getScreenWidth(), this.getGame().getScreenHeight()));

        console.log(this);
        
    }

    addEnemy(x, y)
    {
        let enemy = new Enemy(this);
        enemy.setPosition(x, y);
    }

    playerHitEnemy(player, enemy)
    {
        //console.log(player);
        //console.log(enemy);
        // enemy.setVisible(false);
        // enemy.setUpdateable(false);
        // enemy.getComponent("rigidBody").setCollidable(false);
        player.destroy();
    }
}
