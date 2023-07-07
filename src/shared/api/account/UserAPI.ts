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
}

interface UserStruct extends BaseDataStruct {
  name: string;
}

const userAPI = new UserAPI();

export { userAPI, UserStruct };
