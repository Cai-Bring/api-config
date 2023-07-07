import BaseRestfulAPI, { BaseDataStruct } from "../BaseRestfulAPI";
/**
 * @apiName 接口名称
 * @url 接口地址
 * @author Caizebin
 * @date 2023-07-07
 */
class UserAPI extends BaseRestfulAPI<UserStruct> {
  constructor() {
    super("server/user");
  }
  // 详情使用查看App.vue
  async export(data: exportStruct) {
    return this.request({
      method: "POST",
      // 只需要写server/user后续的地址即可，API类会自动调用成server/user/export
      url: "export",
      data: data,
      responseType: "arraybuffer",
    });
  }

  /**
   * 为了让API业务和组件业务区分开...
   * 你也可以在当前userAPI下衍生出一些你所需要的复杂接口组成，例如，在：获取列表之后再进行导出
   * @params id
   * @params pageNum
   * @params pageSize
   */
  async getUserAndExport(id: string, pageNum = 1, pageSize = 10) {
    const user = await this.get(id);
    console.log(user);
    this.export({
      pageNum,
      pageSize,
    }).then((res) => {
      console.log(res);
    });
  }
}

interface UserStruct extends BaseDataStruct {
  name: string;
}

interface exportStruct {
  pageSize: number;
  pageNum: number;
}

const userAPI = new UserAPI();

export { userAPI, UserStruct };
