/**A axis-aligned bounding box. In other words, a rectangle that is not rotated. 
 * It has a min(Vec2) which is the top left point.
 * It has a max(Vec2) which is the bottom right point.
*/
export class AABB
{
    min; //relative position to the gamenode. In other words an anchor point.
    max;

    constructor(x, y, width, height)
    {
        this.min = new Vec2(x, y);
        this.max = new Vec2(x + width, y + height);
    }
}

/**A circle. It has a radius(number) and a position(Vec2) */
export class Circle
{
    radius;
    position;

    constructor(x, y, radius)
    {
        this.radius = radius;
        this.position = new Vec2(x, y);
    }
}

//** The hitbox keeps track of the hitbox of an object. Can be changed to be different from the original object. */
export class Hitbox
{
    type;
    owner;
    circle = null;
    aabb = null;
    static AABB = "AABB";
    static CIRCLE = "circle";

    constructor(owner, type, circleOrAABB)
    {
        this.owner = owner;
        this.type = type;
        if(this.type == Hitbox.AABB)
        {
            this.aabb = circleOrAABB;
        }
        if(this.type == Hitbox.CIRCLE)
        {
            this.circle = circle;
        }
    }
}

//-----------------COLLISION DETECTION------------------------

class Manifold
{
    node1;
    node2;
    penetration;
    normal;

    constructor(node1, node2, penetration, normal)
    {
        this.node1 = node1;
        this.node2 = node2;
        this.penetration = penetration;
        this.normal = normal;
    }
}

function checkAABBtoAABB(aabb1, aabb2)
{
    if(aabb1.min.x > aabb2.max.x || aabb1.max.x < aabb2.min.x || aabb1.min.y > aabb2.max.y || aabb1.max.y < aabb2.min.y)
        return false;
    return true;
}

function checkCircletoCircle(circle1, circle2)
{
    let r = circle1.radius + circle2.radius;
    r = r * r;
    if(r >= Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2))
        return true;
    return false;
}


//To check for collisions we will first perform a broad phase detection.
//Then we will check for individual collisions.



