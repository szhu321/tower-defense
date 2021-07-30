import Component from "./Component.js";

export default class WorldBound extends Component
{
    constructor(gameObject, screenWidth, screenHeight)
    {
        super(gameObject, "worldBound");
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    update(deltaT)
    {
        let gameObject = this.getGameObject();
        if(gameObject.getX() + gameObject.getVelocity().getX() < 0 || (gameObject.getX() + gameObject.getVelocity().getX()) + gameObject.getWidth() > this.screenWidth)
                gameObject.setVelocityX(0);
        //check with the top and bottom boundary.
        if(gameObject.getY() + gameObject.getVelocity().getY() < 0 || gameObject.getY() + gameObject.getVelocity().getY() + gameObject.getHeight() > this.screenHeight)
                gameObject.setVelocityY(0);
    }
}