import Vec2 from "./Vec2";

export default class Input
{
    static mouseX = 0;
    static mouseY = 0;
    static keys = {};
    static mousePressed = false;

    static initialize()
    {
        let canvasElement = document.getElementById("gamewindow");
        //setting up the events.
        document.addEventListener("keydown", (e) => {
            //console.log("keydown", e.key);
            Input.keys[e.key] = true;
        }, false);
        document.addEventListener("keyup", (e) => {
            //console.log("keyup", e.key);
            Input.keys[e.key] = false;
        }, false);
        canvasElement.addEventListener("click", (e)=>{
            //console.log("click", e);
            events.push({
                type: "mouseclick",
                data: e,
            });
        }, false);
        canvasElement.addEventListener("mousemove", (e)=>
        {
            //when the mouse moves store the position of the mouse so that it can be used later.
            Input.mouseX = e.offsetX;
            Input.mouseY = e.offsetY;
        });
        canvasElement.addEventListener("mousedown", (e)=>
        {
            Input.mousePressed = true;
        });
        canvasElement.addEventListener("mouseup", (e)=>
        {
            Input.mousePressed = false;
        });
        
    }

    /**returns the mouse position inside a dictionary. x for x position, y for y position. */
    static getMousePosition()
    {
        return new Vec2(Input.mouseX, Input.mouseY);
    }
    
    static isKeyPressed(key)
    {
        if(Input.keys[key] == true)
            return true;
        return false;
    }

    static isMousePressed()
    {
        return Input.mousePressed;
    }
}