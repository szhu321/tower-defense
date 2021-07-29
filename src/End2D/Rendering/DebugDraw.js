import Circle from "../Physics2D/Primitives/Circle.js";
import AABB from "../Physics2D/Primitives/AABB.js";
import Rectangle from "../Physics2D/Primitives/Rectangle.js";

/**
 * A class that have some static methods to help draw some debug images.
 */
export default class DebugDraw
{
    /**
     * Draws a circle onto a canvas. Can specify the line color.
     * @param {CanvasRenderingContext2D} ctx - The 2D graphics context obtained from the canvas. 
     * @param {Circle} circle - The circle.
     * @param {string} lineColor - line color. Following CSS color format.
     */
    static drawCircle(ctx, circle, lineColor)
    {
        //draw the circle.
        ctx.save();
        ctx.strokeStyle = lineColor;
        let radius = circle.getRadius();
        let center = circle.getCenter().clone();
        ctx.beginPath();
        ctx.arc(center.getX(), center.getY(), radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }


    //draw a rectangle
    static drawRectangle(ctx, rectangle, lineColor)
    {
        
    }

    /**
     * Draws a axis-aligned bounding box.
     * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D.
     * @param {AABB} aabb - The AABB.
     * @param {string} lineColor - The line color. Following CSS color format.
     */
    static drawAABB(ctx, aabb, lineColor)
    {
        ctx.save();
        ctx.strokeStyle = lineColor;
        let position = aabb.getMin();
        let size = aabb.getHalfSize().clone().mult(2);
        ctx.strokeRect(position.getX(), position.getY(), size.getX(), size.getY());
        ctx.restore();
    }



    //draw a line segment
    
}





