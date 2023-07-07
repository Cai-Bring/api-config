import { ResponseResult } from "./type";
import { spin } from "../hooks/useSpin";
import { AxiosResponse } from "axios";

/**
 * 返回成功拦截器
 * @param config
 * @returns
 */
export function responseInterceptor(
  response: AxiosResponse<ResponseResult<any>>
) {
  const { showSpin, okMsg, failMsg } = (response?.config as any)
    ?.requestOptions;

  /**取消加载效果 */
  if (showSpin) spin(false);

  /**
   * 来自接口返回
   *  */
  if (response?.data?.status) {
    const { status, message, data } = response.data;
    const payload = {
      msg: message,
      code: status,
      type: status === 200 ? "success" : "error",
    };
    if (failMsg && status !== 200) {
      payload.msg = failMsg;
    }
    if (status !== 200) {
      return Promise.reject(payload);
    }
    if (okMsg && status === 200) {
      payload.msg = okMsg;
    }
    return data || "";
  }
}

/**
 * 返回失败拦截器
 * @param config
 * @returns
 */
export function responseCatchInterceptor(error: any) {
  const { showSpin, onFail, failMsg, noToken } =
    error?.response?.config?.requestOptions;
  const payload = { msg: "", code: 0, type: "error", noToken };

  if (showSpin) spin(false);
  if (onFail) onFail();

  if (error.response) {
    payload.code = error.response.status;
    switch (error.response.status) {
      case 400:
        payload.msg = error.response.data?.message || "请求错误(400)";
        break;
      case 401:
        payload.msg =
          error.response.data?.hyz_message || "未授权，请重新登录(401)";
        return Promise.reject(error);
      case 403:
        payload.msg = error.response.data?.message || "无权限访问(403)";
        break;
      case 404:
        payload.msg = error.response.data?.message || "请求资源不存在(404)";
        break;
      case 500:
        payload.msg = error.response.data?.message || "服务器错误(500)";
        break;
      case 503:
        payload.msg = error.response.data?.message || "服务升级维护中(503)";
        break;
      default:
        payload.msg =
          error.response.data?.message || `请求失败${error.response.status}`;
        break;
    }
  }

  if (failMsg) {
    payload.msg = failMsg;
  }

  return Promise.reject(error);
}
