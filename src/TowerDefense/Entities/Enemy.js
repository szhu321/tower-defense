import GameObject from "../../End2D/GameObject.js";
import EnemyController from "../AI/EnemyController.js";
import Scene from "../../End2D/scene.js";
import RigidBody2D from "../../End2D/Physics2D/RigidBody/RigidBody2D.js";

export default class Enemy extends GameObject
{
    speed = 35; 

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene)
    {
        super(scene);
        scene.add(this);
        this.setGroup("enemy");
        this.addComponent(new RigidBody2D(this));
        this.ai = new EnemyController(this, {
            player:scene.player,
        });
    }

    update(deltaT)
    {
        this.ai.update(deltaT);
    }
}

