import { HttpTransform, RequestOptions } from "./type";
import Http from "./Http";
import {
  beforeRequestHook,
  requestInterceptor,
  requestCatchInterceptor,
} from "./requestHandler";
import {
  responseInterceptor,
  responseCatchInterceptor,
} from "./responseHandler";

/**
 * 数据转换
 */
const transform: HttpTransform = {
  beforeRequestHook,
  requestInterceptor,
  requestCatchInterceptor,
  responseInterceptor,
  responseCatchInterceptor,
};

let http: Http;

/**
 * 创建http实例
 * @param requestOptions
 */
function createHttp(baseUrl: string, requestOptions: RequestOptions) {
  const baseURL = requestOptions.apiPrefix
    ? `${baseUrl}/${requestOptions.apiPrefix}/`
    : baseUrl;
  http = new Http({ transform, requestOptions, baseURL });
}

export { http, createHttp };

export * from "./type";
