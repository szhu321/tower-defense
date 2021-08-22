import GameObject from "./GameObject.js"

/**
 * The rectangle gameObject can be used to put rectangles on to the scene.
 * This gameObject will be treated by the renderer as a rectangle and will
 * be drawn with the provided color, and size.
 */
export default class Rectangle extends GameObject
{
    #color = "#ffffff";

    /**
     * Creates a new rectangle that can be put onto the scene.
     * @param {Scene} scene - The scene.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width.
     * @param {number} height - The height.
     */
    constructor(scene, x=0, y=0, width = 50, height = 50)
    {
        super(scene, x, y, width, height);
        super.setRenderingType("Rectangle");
    }

    /**
     * Sets the color of the rectangle. In css format.
     * @param {string} color - The color. 
     */
    setColor(color)
    {
        this.#color = color;
    }

    /**
     * Gets the color of the rectangle. In css format.
     * @returns {string} - The color.
     */
    getColor()
    {
        return this.#color;
    }
}

