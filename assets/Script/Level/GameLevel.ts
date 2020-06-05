export default class GameLevel {

    constructor() {

    }

    //读取 配置文件Level

    /**
     * 获取所有的关卡配置
     */
    public static getAllLevel() {

    }

    public static getLevelById(id: number): cc.JsonAsset {
        let json = cc.loader.getRes("" + id) as cc.JsonAsset;
        return json;
    }

}
