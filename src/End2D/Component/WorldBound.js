import Component from "./Component.js";

export default class WorldBound extends Component
{
    constructor(gameObject, screenWidth, screenHeight)
    {
        super(gameObject, "WorldBound");
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    update(deltaT)
    {
        if(this.gameObject.x + this.gameObject.velocity.x < 0 || (this.gameObject.x + this.gameObject.velocity.x) + this.gameObject.width > this.screenWidth)
                this.gameObject.velocity.x = 0;
        //check with the top and bottom boundary.
        if(this.gameObject.y + this.gameObject.velocity.y < 0 || this.gameObject.y + this.gameObject.velocity.y + this.gameObject.height > this.screenHeight)
                this.gameObject.velocity.y = 0;
    }
}