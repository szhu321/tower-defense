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
    addEnemy(800, 500);
    addEnemy(400, 300);
    addEnemy(200, 390);
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
        //Changing the velocity.
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

        //then collision detection.
        checkCollisions();

        //finally the object is moved.
        node.x += node.velocityX;
        node.y += node.velocityY;
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
        if(node.visible)
        {
            if(node.type == "player")
                ctx.fillStyle = "green";
            if(node.type == "enemy")
                ctx.fillStyle = "red";
            if(node.type == "bullet")
                ctx.fillStyle = "white";
            ctx.fillRect(node.x, node.y, node.width, node.height);
        }
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
    let player = addNode("player", 500, 500, 20, 20);
    player.physical = true;
    return player;
}

/**A an enemy in a given x and y location.*/
function addEnemy(x, y)
{
    let enemy = addNode("enemy", x, y, 20, 20);
    enemy.physical = true;
    return enemy;
}

/**add a still particle that will degrade over time */
function addParticle(x, y)
{
    let particle = addNode("particle", x, y, 2, 2);
    particle.physical = false;
    particle.hp = 120;
}

/**creates a bullet at the given start location and velocity */
function addBullet(x, y, xv, yv)
{
    let bullet = addNode("bullet", x, y, 5, 5);
    bullet.velocityX = xv;
    bullet.velocityY = yv;
}

/** The function to call when you want to add a game node to data */
function addNode(type, x, y, width, height)
{
    let node = {
        type: type,
        x: x,
        y: y,
        width: width,
        height: height,
        velocityX: 0,
        velocityY: 0,
        visible: true,
        physical: false,
    };
    data.push(node);
    console.log(data);
    return node;
}

/**check for collisions and change the velocity as neccessary. */
function checkCollisions()
{
    //check for collisions with the game border.
    data.forEach((node) => 
    {
        if(node.type == "player")
        {
            //check with left and right boundary.
            if(node.x + node.velocityX < 0 || (node.x + node.velocityX) + node.width > SCREEN_WIDTH)
                node.velocityX = 0;
            //check with the top and bottom boundary.
            if(node.y + node.velocityY < 0 || node.y + node.velocityY + node.height > SCREEN_HEIGHT)
                node.velocityY = 0;
        }
    });

    //check for collisions with other physical objects.
    for(let i = 0; i < data.length; i++)
    {
        let currentNode = data[i];
        for(let j = 0; i < data.length; j++)
        {
            let otherNode = data[j];
            if(currentNode == otherNode)
                break;
            let collision = true;
            //check to see if the two nodes collide or not.
            //if a collision is detected stop both nodes.
            if(currentNode.x + currentNode.width + currentNode.velocityX < otherNode.x + otherNode.velocityX)
                collision = false;
            else if(currentNode.x + currentNode.velocityX > otherNode.x + otherNode.width + otherNode.velocityX)
                collision = false;
            else if(currentNode.y + currentNode.height + currentNode.velocityY < otherNode.y + otherNode.velocityY)
                collision = false;
            else if(currentNode.y + currentNode.velocityY > otherNode.y + otherNode.height + otherNode.velocityY)
                collision = false;
            
            if(collision)
            {
                currentNode.velocityX = 0;
                currentNode.velocityY = 0;
                otherNode.velocityX = 0;
                otherNode.velocityY = 0;
            }
        }
    }
}