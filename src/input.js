
class Input
{
    mouseX = 0;
    mouseY = 0;
    keys = {};

    constructor(canvasElement)
    {
        //setting up the events.
        document.addEventListener("keydown", (e) => {
            //console.log("keydown", e.key);
            this.keys[e.key] = true;
        }, false);
        document.addEventListener("keyup", (e) => {
            //console.log("keyup", e.key);
            this.keys[e.key] = false;
        }, false);
        canvasElement.addEventListener("click", (e)=>{
            console.log("click", e);
        }, false);
        canvasElement.addEventListener("mousemove", (e)=>
        {
            //when the mouse moves store the position of the mouse so that it can be used later.
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        });
        
    }

    /**returns the mouse position inside a dictionary. x for x position, y for y position. */
    getMousePosition()
    {
        return {x: this.mouseX, y: this.mouseY};
    }
    
    isKeyPressed(key)
    {
        if(this.keys[key] == true)
            return true;
        return false;
    }
}