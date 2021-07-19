
export default class SceneManager
{
    game;
    currentScene;

    constructor(game)
    {
        this.game = game;
    }

    setScene(Scene)
    {
        this.currentScene = new Scene();
    }

    preUpdate(deltaT)
    {
        if(this.currentScene)
        {
            this.currentScene.preUpdate(deltaT);
        }
    }

    getData()
    {
        if(this.currentScene)
        {
            this.currentScene.gameObjects;
        }
    }
}
