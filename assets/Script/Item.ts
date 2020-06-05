const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {


    private sp: cc.Sprite;
    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.node.scale = 0.5;
    }

    start() {

    }

    init(spf: cc.SpriteFrame) {
        this.node.getComponent(cc.Sprite).spriteFrame = spf;
    }

    touchEnd(event) {

    }

    touchMove(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        console.log(pos);
    }
}
