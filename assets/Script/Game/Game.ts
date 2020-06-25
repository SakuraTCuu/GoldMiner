import GameManger from "./GameManager";
import GameLevel from "../Level/GameLevel";
import Item from "../Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    root: cc.Node = null;

    onLoad() {
        this.initView();
    }

    private initView(): void {
        //读取配置文件
        //根据当前id
        let levelId = GameManger.levelId;
        let json = GameLevel.getLevelById(levelId).json as [any];
        cc.log(json)
        for (let i = 0; i < json.length; i++) {
            this.createItem(json[i]);
        }
        //根据关卡配置文件生成关卡
    }

    private createItem(json: any): void {
        cc.log(json)
        let item = cc.instantiate(this.itemPrefab);
        item.name = "item_" + json['id'];
        item.getComponent(Item).initByCreate(json['spf']);
        item.setPosition(cc.v2(json['x'], json['y']));
        this.root.addChild(item);
        cc.log(item)
    }
}
