//Author: Sheng Wei, Joshua

SCREEN_WIDTH = 1280;
SCREEN_HEIGHT = 720;
FPS = 60;

let data = [];
let input;

//The code gets called here.
function initialize()
{
    console.log("Initializing.");
    //sets the size of the canvas.
    let canvas = document.getElementById("gamewindow");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    input = new Input(canvas);
    clearGameWindow();
    addPlayer();
    start();
}


/**maingame loop function*/
async function start()
{
    let previousTime = Date.now(); //gets the current time in milliseconds
    let x = 1;
    //scuffed game loop.
    while(true)
    {
        tick();
        render();
        //calculate the time needed to sleep based on the FPS.
        let singleFrameTime = (1.0/FPS) * 1000; //calculate the maximum number of ms perframe.
        let currentTime = Date.now();
        let timePassed = currentTime - previousTime;
        let sleepTime = singleFrameTime - timePassed;
        //console.log(sleepTime);
        if(sleepTime > 0)
            await sleep(sleepTime);
        previousTime = Date.now();
    }
}

//all physics calculations will go in here.
function tick()
{
    data.forEach(node => {
        if(node.type == "player")
        {
            let mousePos = input.getMousePosition();
            
            //checks to see if any of the control keys are pressed or not.
            if(input.isKeyPressed("w"))
                node.velocityY = -5;
            else if(input.isKeyPressed("s"))
                node.velocityY = 5;
            else
                node.velocityY = 0;
            if(input.isKeyPressed("a"))
                node.velocityX = -5;
            else if(input.isKeyPressed("d"))
                node.velocityX = 5;
            else
                node.velocityX = 0;

            
        }
        node.x += node.velocityX;
        node.y += node.velocityY;
        // if(node.x > (SCREEN_WIDTH - 10) || node.x < 0)
        //     node.x = 0;
        // if(node.y > (SCREEN_HEIGHT - 10) || node.y < 0)
        //     node.velocityY = 0;
        
    });
}

//all gamewindow drawing will go in here.
function render()
{
    let canvas = document.getElementById("gamewindow");
    let ctx = canvas.getContext("2d");
    //first draw the background.
    clearGameWindow();

    //draw the game nodes, like players and enemies.
    data.forEach(node => {
        if(node.type == "player")
            ctx.fillStyle = "green";
        ctx.fillRect(node.x, node.y, node.width, node.height);
    });
}


//------------------------  HELPER FUNCTIONS ------------------------------
/** This function draws the background of the game window. */
function clearGameWindow()
{
    let canvas = document.getElementById("gamewindow");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#213400";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

/**
 * @param ms - The number of milliseconds to sleep the program.
 */
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a new player by adding an entry to data.
 */
function addPlayer()
{
    data.push({
        type: "player",
        x: 500,
        y: 500,
        width: 10,
        height: 10,
        velocityX: 3,
        velocityY: 5
    });
}
