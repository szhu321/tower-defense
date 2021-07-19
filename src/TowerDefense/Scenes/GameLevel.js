import GameObject from "../../End2D/GameObject";
import Scene from "../../End2D/scene";

export default class GameLevel extends Scene
{

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
        this.add(player);  
    }
}
