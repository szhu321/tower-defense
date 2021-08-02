import Emitter from "../Event/Emitter.js";
import EventManager from "../Event/EventManager.js";
import Receiver from "../Event/Receiver.js";
import Vec2 from "../Utilities/Vec2.js";
import Event from "../Event/Event.js";

export default class Input
{
    static #mouseX = 0;
    static #mouseY = 0;
    static #keys = {};
    static #mousePressed = false;

    /**
     * @type {Emitter} The emitter.
     */
    static #emitter;

    /**
     * @type {Receiver} The receiver.
     */
    static #receiver;

    /**
     * Sets up the Input Engine by attching some listeners to the canvas.
     * @param {HTMLCanvasElement} - The canvas.
     * @param {EventManager} - The event Manager.
     */
    static initialize(canvas)
    {
        let canvasElement = canvas;
        //setting up the events.
        document.addEventListener("keydown", (e) => {
            Input.#keys[e.key] = true;
        }, false);
        document.addEventListener("keyup", (e) => {
            Input.#keys[e.key] = false;
        }, false);
        canvasElement.addEventListener("click", (e)=> {
            //add a click event to the event queue.
            let data = {event: e};
            this.#emitter.fireEvent("click", data);
        }, false);
        canvasElement.addEventListener("mousemove", (e)=>
        {
            //when the mouse moves store the position of the mouse so that it can be used later.
            Input.#mouseX = e.offsetX;
            Input.#mouseY = e.offsetY;
        });
        canvasElement.addEventListener("mousedown", (e)=>
        {
            Input.#mousePressed = true;
        });
        canvasElement.addEventListener("mouseup", (e)=>
        {
            Input.#mousePressed = false;
        });
        
    }

    static initializeEventSystem(eventManager)
    {
        this.#emitter = new Emitter(eventManager, null);
        this.#receiver = new Receiver(eventManager, null);
    }

    /**returns the mouse position inside a dictionary. x for x position, y for y position. 
     * @returns {Vec2} - The current mouse position.
    */
    static getMousePosition()
    {
        return new Vec2(Input.#mouseX, Input.#mouseY);
    }
    
    /**
     * Checks to see if a certain key is pressed.
     * @param {string} key - The key code.
     * @returns {boolean} - True if the key is pressed. False otherwise.
     */
    static isKeyPressed(key)
    {
        if(Input.#keys[key] == true)
            return true;
        return false;
    }

    /**
     * Checks to see if the mouse is pressed or not.
     * @returns {boolean} - True if the mouse is pressed. False otherwise.
     */
    static isMousePressed()
    {
        return Input.#mousePressed;
    }
}