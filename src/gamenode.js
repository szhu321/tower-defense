export class GameNodeManager
{
    #data = [];

    constructor()
    {

    }

    addData(node)
    {
        this.#data.push(node);
    }

    getData()
    {
        return this.#data;
    }
}

export class GameNode
{
    type;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    velocityX = 0;
    velocityY = 0;
    visible = true;
    physical = false;
    hitbox;
    mass = 0;

    constructor(type, x, y, width, height)
    {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    addPhysics(hitbox)
    {
        let hb;
        if(hitbox)
        {
            hb = hitbox;
        }
        else
        {
            //if no hitbox was provided create a new one with anchor point at 0,0 and width height of the gamenode.
            hb = new Hitbox(this, Hitbox.AABB, new AABB(0, 0, this.width, this.height));
        }
        this.physical = true;
        this.hitbox = hb;
    }
}