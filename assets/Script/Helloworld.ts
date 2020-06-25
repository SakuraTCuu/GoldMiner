const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    private index: number = 0;

    start() {
        // init logic

    }

    clickLevelCreate() {
        cc.director.preloadScene("LevelCreate", () => {
            cc.director.loadScene("LevelCreate");
        });
    }

    /**
     * 点击开始游戏
     */
    clickPlayBtn() {
        cc.director.preloadScene("GameScene", () => {
            cc.loader.loadResDir('texture', cc.Texture2D, (err, textures) => {
                cc.log('图集加载完毕');
                this.index++;
                this.startGame();
            });

            //加载图集 地图资源
            cc.loader.loadResDir("level", cc.JsonAsset, (error: Error, resource: any[], urls: string[]) => {
                cc.log('关卡资源加载完毕');
                this.index++;
                this.startGame();
            });
        })
    }

    startGame() {
        if (this.index === 2) {
            cc.director.loadScene("GameScene");
        }
    }
}
