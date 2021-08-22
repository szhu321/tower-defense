import ClickComponent from "../../End2D/Component/ClickComponent.js";
import Rectangle from "../../End2D/GameObject/Rectangle.js";
import Scene from "../../End2D/Scene/Scene.js";
import GameLevel from "./GameLevel.js";
import Text from "../../End2D/GameObject/Text.js";


export default class Menu extends Scene
{
    create()
    {
        

        //Add a play buttton.
        let screenWidth = this.getGame().getScreenWidth();
        let screenHeight = this.getGame().getScreenHeight();
        let playBtn = new Rectangle(this, screenWidth * 0.5, screenHeight * 0.2, 500, 100);
        playBtn.setColor("#3d9cdb");
        playBtn.addComponent(new ClickComponent(playBtn, this.changeToPlayScene, this));

        //Add the text.
        let playText = new Text(this, "Play");
        playText.setX(playBtn.getX());
        playText.setY(playBtn.getY());
        
        this.add(playBtn);
        this.add(playText);
        
        
    }

    changeToPlayScene()
    {
        this.getGame().getSceneManager().setScene(GameLevel);
    }

    update()
    {

    }
}