import EMath from "../../Utilities/EMath.js";
import RaycastResult from "../Primitives/RaycastResult.js";
import Circle from "../Primitives/Circle.js";
import Ray2D from "../Primitives/Ray2D.js";

export default class CollisionDetector2D
{
    
    /**Test to see if a point is on a line or not */
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

    /**Test to see if a point is on or in a circle. */
    static pointInCircle(point, circle)
    {
        return point.clone().sub(circle.getCenter()).magnitudeSquared() <= circle.getRadius() * circle.getRadius();
    }

    /**Testing to see if a point is in a AABB */
    static pointInAABB(point, aabb)
    {
        return point.getX() >= aabb.getMin().getX() && point.getX() <= aabb.getMax().getX()
            && point.getY() >= aabb.getMin().getY() && point.getY() <= aabb.getMax().getY();
    }

    /**Testing to see if a point is in a rectangle */
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

    /**Testing line and circle intersection */
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

    /**Testing line intersection AABB */
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

    /**Testing line intersection Rectangle */
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
     * 
     * @param {Circle} circle - the circle
     * @param {Ray2D} ray - the 2D ray
     * @param {RaycastResult} result - the raycast result
     */
    static raycast(circle, ray, result = null)
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
            let point = ray.getOrigin().clone().add(ray.getDirection().mult(t));
            let normal = point.clone().sub(circle.getCenter());
            normal.normalize();
            result.init(point, normal, t, true);
        }

        return true;
    }

}
