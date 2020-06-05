const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    start() {
        // init logic
    }

    /**
     * 点击开始游戏
     */
    clickPlayBtn() {
        cc.director.preloadScene("GameScene", () => {
            cc.director.loadScene("GameScene");
        })
    }
}
