import Item from "../Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelCreate extends cc.Component {

    @property(cc.Node)
    root: cc.Node = null;

    @property(cc.ScrollView)
    leftScrollView: cc.ScrollView = null;

    @property(cc.Node)
    leftGoodsContent: cc.Node = null;

    @property(cc.Node)
    rightGoodsContent: cc.Node = null;

    @property(cc.Node)
    centerContent: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    spfList: cc.SpriteFrame[] = [];

    private isSelect: boolean = false;

    private newItem: cc.Node = null;

    onLoad() {
        this.initContent();
    }

    start() {

    }

    initContent(): void {
        for (let i = 0; i < this.spfList.length; i++) {
            let item = cc.instantiate(this.itemPrefab);
            item.getComponent(Item).init(this.spfList[i]);
            item.name = i + "";
            item.on(cc.Node.EventType.TOUCH_START, this.touchStart, this)
            item.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
            item.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this)
            item.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this)
            this.leftGoodsContent.addChild(item);
        }
    }

    /**
     * 
     * @param event
     */
    touchMove(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        let localPos = this.centerContent.convertToNodeSpaceAR(pos);
        this.newItem.setPosition(localPos);
        this.leftScrollView.enabled = false;
    }

    touchStart(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        cc.log("touchStart->>", pos.x, pos.y);
        let i = Number(event.getCurrentTarget().name);
        this.newItem = cc.instantiate(this.itemPrefab);
        this.newItem.name = i + "";
        this.newItem.getComponent(Item).init(this.spfList[i]);
        let localPos = this.centerContent.convertToNodeSpaceAR(pos);
        this.newItem.setPosition(localPos);
        this.centerContent.addChild(this.newItem);

        //拖动的时候不显示遮罩
        this.centerContent.getComponent(cc.Mask).enabled = false;
    }

    touchCancel(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        let localPos = this.centerContent.convertToNodeSpaceAR(pos);
        this.leftScrollView.enabled = true;
        //判断是否在center rect内
        let flag = this.centerContent.getBoundingBox().contains(localPos);
        if (!flag) {
            this.newItem.destroy();
            this.newItem = null;
        }
        this.centerContent.getComponent(cc.Mask).enabled = true;
    }

    touchEnd(event: cc.Event.EventTouch) {
        cc.log("touchEnd-->>")
        if (this.newItem) {
            this.newItem.destroy();
            this.newItem = null;
        }
        this.leftScrollView.enabled = true;
    }

    /**
     * 点击生成
     */
    onClickCreateBtn(): void {
        //遍历 节点  生成json数组信息
        let resultArr = [];



        for (let i = 0; i < this.centerContent.childrenCount; i++) {
            let item = this.centerContent.children[i];

            //换算x,y实际坐标
            let newPos = this.calcTrustPos(cc.v2(item.x, item.y), this.centerContent);
            let temp = {
                id: item.name,
                x: newPos.x,
                y: newPos.y,
                spf: item.getComponent(cc.Sprite).spriteFrame.name
            }
            resultArr.push(temp);
        }

        let resultStr = JSON.stringify(resultArr);
        console.log(resultStr)
    }

    /**
     * 换算展示时的坐标
     * 当前x : 当前父节点宽高 = 实际x : canvas宽高
     */
    private calcTrustPos(pos: cc.Vec2, curParent: cc.Node): cc.Vec2 {
        let ratio = this.node.width / curParent.width
        return pos.mulSelf(ratio);
    }
}
