import EMath from "../../Utilities/EMath.js";
import RaycastResult from "../Primitives/RaycastResult.js";
import Circle from "../Primitives/Circle.js";
import Ray2D from "../Primitives/Ray2D.js";
import Vec2 from "../../Utilities/Vec2.js";
import AABB from "../Primitives/AABB.js"
import Rectangle from "../Primitives/Rectangle.js"
import Line from "../Primitives/Line.js";

export default class CollisionDetector2D
{
    
    /**Test to see if a point is on a line or not
     * @param {Vec2} point - the point.
     * @param {Vec2} line - the line.
     */
    static pointOnLine(point, line)
    {
        let dy = line.getEnd().getY() - line.getStart().getY();
        let dx = line.getEnd().getX() - line.getStart().getX();

        if(dx === 0)
        {
            return EMath.compare(point.getX(), line.getStart().getX());
        }

        let m = dy/dx;
        let b = line.getEnd().getY() - (m * line.getEnd().getX());

        //Now we will check if the point is on the line.
        return point.getY() === m * point.getX() + b;
    }

    /**Test to see if a point is on or in a circle. 
     * @param {Vec2} point - the point.
     * @param {Circle} circle - the circle.
    */ 
    static pointInCircle(point, circle)
    {
        return point.clone().sub(circle.getCenter()).magnitudeSquared() <= circle.getRadius() * circle.getRadius();
    }

    /**Testing to see if a point is in a AABB
     * @param {Vec2} point - the point.
     * @param {AABB} aabb - the aabb.
     */
    static pointInAABB(point, aabb)
    {
        return point.getX() >= aabb.getMin().getX() && point.getX() <= aabb.getMax().getX()
            && point.getY() >= aabb.getMin().getY() && point.getY() <= aabb.getMax().getY();
    }

    /**Testing to see if a point is in a rectangle.
     * @param {Vec2} point - the point.
     * @param {Rectangle} rect - the rectangle.
     */
    static pointInRectangle(point, rect)
    {
        //rotate point by the rotation of rect.
        let rotPoint = point.clone();
        EMath.rotate(rotPoint, rect.getRigidBody().getRotation(), rect.getRigidBody().getPosition());

        let min = rect.getMin();
        let max = rect.getMax();

        return rotPoint.getX() >= min.getX() && rotPoint.getX() <= max.getX()
            && rotPoint.getY() >= min.getY() && rotPoint.getY() <= max.getY();
    }

    /**Testing line and circle intersection.
     * @param {Line} line - the line.
     * @param {Circle} circle - the circle.
     */
    static lineInCircle(line, circle)
    {
        if(CollisionDetector2D.pointInCircle(line.getStart(), circle) || CollisionDetector2D.pointInCircle(line.getEnd(), circle))
            return true;
        
        let ab = line.getEnd().clone().sub(line.getStart());

        // Project circle center onto line ab.
        let center = circle.getCenter();
        let centerToLineStart = center.clone().sub(line.getStart());
        let t = centerToLineStart.dot(ab) / ab.dot(ab);

        //not on line segment.
        if(t < 0 || t > 1)
            return false;
        
        let closestPoint = line.getStart().clone().add(ab.mult(t));
        return CollisionDetector2D.pointInCircle(closestPoint, circle);
    }

    /**Testing line intersection AABB.
     * @param {Line} line - the line.
     * @param {AABB} aabb - the aabb.
     */
    static lineInAABB(line, aabb)
    {
        if(CollisionDetector2D.pointInAABB(line.getStart(), aabb) || CollisionDetector2D.pointInAABB(line.getEnd(), aabb))
            return true;
        
        let unitVector = line.getEnd().clone().sub(line.getStart());
        unitVector.normalize();

        //makes calculations easier. unitvector is now 1 / unitvector.
        unitVector.getX() = (unitVector.getX() !== 0) ? 1 / unitVector.getX() : 0;
        unitVector.getY() = (unitVector.getY() !== 0) ? 1 / unitVector.getY() : 0;

        let min = aabb.getMin().clone();
        min.sub(line.getStart()).mult(unitVector);
        let max = aabb.getMax().clone();
        max.sub(line.getStart()).mult(unitVector);

        let tmin = Math.max(Math.min(min.getX(), max.getX()), Math.min(min.getY(), max.getY()));
        let tmax = Math.min(Math.max(min.getX(), max.getX()), Math.max(min.getY(), max.getY()));
        if(tmax < 0 || tmin > tmax)
            return false;
        
        let t = (tmin < 0) ? tmax : tmin;
        return t > 0 && t * t < line.lengthSquared();
    }

    /**Testing line intersection Rectangle.
     * @param {Line} line - the line.
     * @param {Rectangle} rect - the rectangle.
     */
    static lineInRectangle(line, rect)
    {
        let theta = box.getRigidBody().getRotation();
        let center = box.getRigidBody().getPosition().clone();
        let localStart = line.getStart().clone();
        let localEnd = line.getEnd().clone();
        EMath.rotate(localStart, theta, center);
        EMath.rotate(localEnd, theta, center);

        let localLine = new Line(localStart, localEnd);
        let aabb = new AABB(rect.getMin(), rect.getMax());

        return CollisionDetector2D.lineInAABB(localLine, aabb);
    }

    /**
     * Raycast to a given Circle, AABB, or Rectangle.
     * @param {Circle|Rectangle|AABB} shape - the shape. Can be circle, AABB, or Rectangle.
     * @param {Ray2D} ray - the 2D ray
     * @param {RaycastResult} result - the raycast result
     * @returns {boolean} True if the ray hits the shape false otherwise.
     */
    static raycast(shape, ray, result = null)
    {
        switch(shape.getType())
        {
            case "circle": return CollisionDetector2D.#raycastCircle(shape, ray, result);
            case "rectangle": return CollisionDetector2D.#raycastRectangle(shape,ray,result);
            case "aabb": return CollisionDetector2D.#raycastAABB(shape,ray,result);
        }
        return false;
    }

    /**
     * Raycast to an circle.
     * @param {Circle} circle - the circle
     * @param {Ray2D} ray - the 2D ray
     * @param {RaycastResult} result - the raycast result
     * @returns {boolean} True if the ray hits the circle false otherwise.
     */
    static #raycastCircle(circle, ray, result = null)
    {
        RaycastResult.reset(result);
        
        let originToCircle = circle.getCenter().clone().sub(ray.getOrigin());
        let radiusSquared = circle.getRadius() * circle.getRadius();
        let originToCircleLengthSquared = originToCircle.magnitudeSquared();

        let a = originToCircle.dot(ray.getDirection());
        let bSq = originToCircleLengthSquared - (a * a);
        if(radiusSquared - bSq < 0)
            return false;
        
        let f = Math.sqrt(radiusSquared - bSq);
        let t = 0;
        if(originToCircleLengthSquared < radiusSquared)
        {
            //ray starts inside the circle.
            t = a + f;
        }
        else
        {
            t = a - f;
        }

        if(result != null)
        {
            let point = ray.getOrigin().clone().add(ray.getDirection().clone().mult(t));
            let normal = point.clone().sub(circle.getCenter());
            normal.normalize();
            result.init(point, normal, t, true);
        }

        return true;
    }

    /**
     * Raycast to an aabb.
     * @param {AABB} AABB - the aabb.
     * @param {Ray2D} ray - the 2D ray.
     * @param {RaycastResult} result - the raycast result.
     * @returns {boolean} True if the ray hits the AABB false otherwise.
     */
    static #raycastAABB(AABB, ray, result = null)
    {   
        RaycastResult.reset(result);

        let unitVector = ray.getDirection();
        unitVector.normalize();

        //makes calculations easier. unitvector is now 1 / unitvector.
        unitVector.getX() = (unitVector.getX() !== 0) ? 1 / unitVector.getX() : 0;
        unitVector.getY() = (unitVector.getY() !== 0) ? 1 / unitVector.getY() : 0;

        let min = aabb.getMin().clone();
        min.sub(ray.getOrigin()).mult(unitVector);
        let max = aabb.getMax().clone();
        max.sub(ray.getOrigin()).mult(unitVector);

        let tmin = Math.max(Math.min(min.getX(), max.getX()), Math.min(min.getY(), max.getY()));
        let tmax = Math.min(Math.max(min.getX(), max.getX()), Math.max(min.getY(), max.getY()));
        if(tmax < 0 || tmin > tmax)
            return false;
        
        let t = (tmin < 0) ? tmax : tmin;
        let hit = t > 0; //&& t * t < ray.getMaximin();
        if(!hit)
            return false;

        if(result != null)
        {
            let point = ray.getOrigin().clone().add(ray.getDirection().clone().mult(t));
            let normal = ray.getOrigin().clone().sub(point);
            normal.normalize();
            result.init(point, normal, t, true);
        }
        return true;
    }

    /**
     * Raycast to an rectangle.
     * @param {Rectangle} rectangle - the rectangle.
     * @param {Ray2D} ray - the 2D ray.
     * @param {RaycastResult} result - the raycast result.
     * @returns {boolean} True if the ray hits the rectangle false otherwise.
     */
    static #raycastRectangle(rectangle, ray, result = null)
    {   
        RaycastResult.reset(result);

        let size = rectangle.getHalfSize();
        let xAxis = new Vec2(1, 0);
        let yAxis = new Vec2(0, 1);
        EMath.rotate(xAxis, -rectangle.getRigidBody().getRotation(), new Vec2(0,0));
        EMath.rotate(yAxis, -rectangle.getRigidBody().getRotation(), new Vec2(0,0));

        let p = rectangle.getRigidBody().getPosition().clone().sub(ray.getOrigin());
        //project the direction of the ray onto each axis of the box.
        let f = new Vec2(xAxis.dot(ray.getDirection()), yAxis.dot(ray.getDirection()));
        //project p into every axis of the box.
        let e = new Vec2(xAxis.dot(p), yAxis.dot(p));

        let tArr = [0, 0, 0, 0];
        for(let i = 0; i < 2; i++)
        {
            if(EMath.compare(f.get(i), 0))
            {
                //If the ray is parallel to the current axis, and the origin of the ray is not inside, we have no hit.
                if(-e.get(i) - size.get(i) > 0 || -e.get(i) + size.get(i) < 0)
                {
                    return false;
                }
                f.setComponent(i, 0.00001); //set to a small value to avoid divide by 0 error.
            }
            tArr[i * 2 + 0] = (e.get(i) + size.get(i)) / f.get(i); //tmax for this axis.
            tArr[i * 2 + 1] = (e.get(i) - size.get(i)) / f.get(i); //tmin for this axis.
        }

        let tmin = Math.max(Math.min(tArr[0], tArr[1]), Math.min(tArr[2], tArr[3]));
        let tmax = Math.min(Math.max(tArr[0], tArr[1]), Math.max(tArr[2], tArr[3]));

        if(tmax < 0 || tmin > tmax)
            return false;
        
        let t = (tmin < 0) ? tmax : tmin;
        let hit = t > 0; //&& t * t < ray.getMaximin();
        if(!hit)
            return false;

        if(result != null)
        {
            let point = ray.getOrigin().clone().add(ray.getDirection().clone().mult(t));
            let normal = ray.getOrigin().clone().sub(point);
            normal.normalize();
            result.init(point, normal, t, true);
        }
        return true;
    }


    /**
     * Checks to see if a circle collides with another circle.
     * @param {Circle} c1 - the first circle.
     * @param {Circle} c2 - the second circle.
     * @returns {boolean} True if they collide, false otherwise.
     */
    static circleAndCircle(c1, c2)
    {
        let vecBetweenCenters = c1.getCenter().clone().sub(c2.getCenter());
        let rSum = c1.getRadius() + c2.getRadius();
        return vecBetweenCenters.magnitudeSquared() <= rSum * rSum;
    }


    /**
     * Check circle and AABB collision.
     * @param {Circle} circle - the circle.
     * @param {AABB} aabb - the aabb.
     * @returns {boolean} True if a collision was detected, false otherwise.
     */
    static circleAndAABB(circle, aabb)
    {
        let min = aabb.getMin().clone();
        let max = aabb.getMax().clone();

        let closestPointToCircle = circle.getCenter().clone();
        if(closestPointToCircle.getX() < min.getX())
        {
            closestPointToCircle.setX(min.getX());
        }else if(closestPointToCircle.getX() > max.getX())
        {
            closestPointToCircle.setX(max.getX());
        }

        if(closestPointToCircle.getY() < min.getY())
        {
            closestPointToCircle.setY(min.getY());
        }else if(closestPointToCircle.getY() > max.getY())
        {
            closestPointToCircle.setY(max.getY());
        }

        let circleToBox = circle.getCenter().clone().sub(closestPointToCircle);
        return circleToBox.magnitudeSquared() <= circle.getRadius() * circle.getRadius();
    }

    /**
     * Checks collision between circle and rectangle.
     * @param {Circle} circle - the circle.
     * @param {Rectangle} rect - the rectangle.
     * @returns {boolean} True if they collide, false otherwise.
     */
    static circleAndRectangle(circle, rect)
    {
        let min = new Vec2();
        let max = rect.getHalfSize().clone().mult(2);

        let r =  circle.getCenter().clone().sub(rect.getRigidBody().getPosition());
        EMath.rotate(r, -rect.getRigidBody().getRotation(), new Vec2());
        let localCirclePos = r.clone().add(rect.getHalfSize());

        let closestPointToCircle = localCirclePos.clone();
        if(closestPointToCircle.getX() < min.getX())
        {
            closestPointToCircle.setX(min.getX());
        }else if(closestPointToCircle.getX() > max.getX())
        {
            closestPointToCircle.setX(max.getX());
        }

        if(closestPointToCircle.getY() < min.getY())
        {
            closestPointToCircle.setY(min.getY());
        }else if(closestPointToCircle.getY() > max.getY())
        {
            closestPointToCircle.setY(max.getY());
        }

        let circleToBox = localCirclePos.clone().sub(closestPointToCircle);
        return circleToBox.magnitudeSquared() <= circle.getRadius() * circle.getRadius();
    }

    static AABBAndCircle(aabb, circle)
    {
        return CollisionDetector2D.circleAndAABB(circle, aabb);
    }

    /**
     * Checks the collision between two AABB's.
     * @param {AABB} aabb1 - The first AABB.
     * @param {AABB} aabb2 - The second AABB.
     * @returns {boolean} True if collision detected, false otherwise.
     */
    static AABBAndAABB(aabb1, aabb2)
    {
        let min1 = aabb1.getMin();
        let max1 = aabb1.getMax();
        let min2 = aabb2.getMin();
        let max2 = aabb2.getMax();
        return !(min1.getX() > max2.getX() || max1.getX() < min2.getX() || min1.getY() > max2.getY() || max1.getY() < min2.getY());
    }

    /**
     * Gets the min and max of the aabb projected onto an axis.
     * @param {AABB} aabb - The AABB.
     * @param {Vec2} axis - The axis.
     */
    static #getInterval(aabb, axis)
    {
        let result = new Vec2();

        let min = aabb.getMin();
        let max = aabb.getMax();
    }


}
