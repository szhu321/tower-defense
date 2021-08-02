import GameObject from "../../End2D/GameObject/GameObject.js";
import EnemyController from "../AI/EnemyController.js";
import Scene from "../../End2D/Scene/Scene.js";
import RigidBody2D from "../../End2D/Physics2D/RigidBody/RigidBody2D.js";
import WorldBound from "../../End2D/Component/WorldBound.js";
import Vec2 from "../../End2D/Utilities/Vec2.js";

export default class Enemy extends GameObject
{
    speed = 70;
    scene;
    player;

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene)
    {
        super(scene);
        scene.add(this);
        this.scene = scene;
        this.setGroup("enemy");
        this.addComponent(new RigidBody2D(this));
        this.addComponent(new WorldBound(this, scene.getGame().getScreenWidth(), scene.getGame().getScreenHeight()));
        this.player = scene.player;
        //console.log(scene.player);
        this.ai = new EnemyController(this, {
            player:scene.player,
        });
    }

    update(deltaT)
    {
        this.ai.update(deltaT);
    }

    knockBack()
    {
        let dir = new Vec2(this.getX() - this.player.getX(), this.getY() - this.player.getY());
        dir.normalize();
        dir.mult(10);
        let newPos = this.getPosition().clone().add(dir);
        this.setPosition(newPos.getX(), newPos.getY());
    }
}

