import AABB from "../Physics2D/Primitives/AABB.js";
import CollisionDetector2D from "../Physics2D/RigidBody/CollisionDetector2D.js";
import Vec2 from "../Utilities/Vec2.js";
import Component from "./Component.js";

export default class ClickComponent extends Component
{
    /**
     * @type {function} The callback function.
     */
    #callback;
    #context;

    /**
     * Creates a new click component that will run a callback function when the gameObject is clicked.
     * @param {GameObject} gameObject - The gameObject that this component is attatched to.
     * @param {function} callback - The callback function.
     * @param {*} context - The context.
     */
    constructor(gameObject, callback, context = null)
    {   
        super(gameObject, "clickComponent");
        this.#callback = callback;
        this.#context = context;
        //subscribing to the click event allows us to get the clicks.
        this.getReceiver().subscribe("click");
    }

    /**
     * The function gets called when the gameObject that this component is attatched to gets clicked.
     * @param {function} callback - The callback function.
     */
    setOnClick(callback)
    {
        this.#callback = callback;
    }

    update(deltaT)
    {
        let gameObject = this.getGameObject();
        while(this.getReceiver().hasNextEvent())
        {
            let event = this.getReceiver().getNextEvent();
            let data = event.getData();
            let mouseEvent = data.event;
            let mouseX = mouseEvent.offsetX;
            let mouseY = mouseEvent.offsetY;
            let point = new Vec2(mouseX, mouseY);
            let min = new Vec2(gameObject.getX() - gameObject.getWidth() / 2, gameObject.getY() - gameObject.getHeight() / 2);
            let max = new Vec2(gameObject.getX() + gameObject.getWidth() / 2, gameObject.getY() + gameObject.getHeight() / 2);
            let hit = point.getX() >= min.getX() && point.getX() <= max.getX() && point.getY() >= min.getY() && point.getY() <= max.getY();
            //console.log(hit);
            if(hit)
            {
                if(this.#context)
                {
                    //store the function alreay in end2DTempCallback so that it can be restored later.
                    let temp = this.#context.end2DTempCallback;
                    this.#context.end2DTempCallback = this.#callback;
                    this.#context.end2DTempCallback(gameObject, mouseEvent);
                    this.#context.end2DTempCallback = temp;
                }
                else
                {
                    this.#callback(gameObject, mouseEvent);
                }
            }
        }
    }
}
