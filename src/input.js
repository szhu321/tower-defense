
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
            //console.log("click", e);
            let xv = e.offsetX;
            let yv = e.offsetY;
            let length = Math.sqrt(Math.pow(xv, 2) + Math.pow(yv, 2));
            addBullet(0, 0, (xv/length) * 4, (yv/length) * 4);
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