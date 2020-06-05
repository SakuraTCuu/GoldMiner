//读取关卡配置
export default class LevelConfig {

    /**
     * 根据id
     */
    public static readLevelById(id: number): void {
        cc.loader.loadRes(""+id, cc.JsonAsset, (err, JsonAsset) => {
            if (err) {
                cc.log("readLevelById.err-->", err);
            }
        })
    }
}
