const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {


    private sp: cc.Sprite;
    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
    }

    start() {

    }

    init(spf: cc.SpriteFrame) {
        this.node.scale = 0.5;
        this.node.getComponent(cc.Sprite).spriteFrame = spf;
    }

    initByCreate(str: String) {
        let texture = cc.loader.getRes("texture/" + str) as cc.Texture2D;
        this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        this.node.scale = 1;
    }

    touchEnd(event) {

    }

    touchMove(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        console.log(pos);
    }
}
