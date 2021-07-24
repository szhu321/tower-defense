
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
        this.currentScene = new Scene(this.game);
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
            return this.currentScene.gameObjects;
        }
        return null;
    }
}
