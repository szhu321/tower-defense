import Scene from "./Scene.js";
import Game from "./game.js";
import GameObject from "./GameObject.js";

/**The sceneManager takes care of storing the current scene */
export default class SceneManager
{
    #game;

    /**
     * @type {Scene} The current scene.
     */
    #currentScene;

    /**
     * Creates a new SceneManager used by the current game.
     * @param {Game} game - The game instance.
     */
    constructor(game)
    {
        this.#game = game;
    }

    /**
     * Sets the current scene to the passed in Class Name of the Scene.
     * @param {Function} sceneClass 
     */
    setScene(sceneClass)
    {
        this.#currentScene = new sceneClass(this.getGame());
    }

    /**
     * Gets the current scene.
     * @returns {Scene} The current scene.
     */
    getCurrentScene()
    {
        return this.#currentScene;
    }

    /**
     * This preupdate calls the current scene's preUpdate method.
     * @param {number} deltaT - The time passed since last update.
     */
    preUpdate(deltaT)
    {
        if(this.#currentScene)
        {
            this.#currentScene.preUpdate(deltaT);
        }
    }

    /**
     * Gets the game objects array from the current scene. Null if the current scene does not exists.
     * @returns {GameObject[]} - The game objects array.
     */
    getData()
    {
        if(this.#currentScene)
        {
            return this.#currentScene.getGameObjects();
        }
        return null;
    }

    /**
     * Gets the SceneManager's game instance.
     * @returns {Game} - The game instance.
     */
    getGame()
    {
        return this.#game;
    }
}
