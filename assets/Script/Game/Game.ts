import GameManger from "./GameManager";
import GameLevel from "../Level/GameLevel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    //
    onLoad() {
        this.initView();
    }

    private initView(): void {
        //读取配置文件
        //根据当前id
        let levelId = GameManger.levelId;
        let json = GameLevel.getLevelById(levelId);
        //
    }
}
