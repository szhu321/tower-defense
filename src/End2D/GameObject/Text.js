import GameObject from "./GameObject.js";

export default class Text extends GameObject
{
    #text;
    #color

    constructor(scene, text)
    {
        super(scene);
        this.#text = text;
        this.#color = "#ffffff";
        super.setRenderingType("Text");
    }

    /**
     * Gets the text of this gameObject.
     * @returns {string} The text.
     */
    getText()
    {
        return this.#text;
    }

    /**
     * Sets the text of this gameObject.
     * @param {string} text - The text.
     */
    setText(text)
    {
        this.#text = text;
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
