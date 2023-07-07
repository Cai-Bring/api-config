import { TURBO_CACHE_TYPE } from "../const";
import { RequestOptions } from "./type";
import { spin } from "../hooks/useSpin";
import { AxiosRequestConfig } from "axios";

export function requestInterceptor(config: AxiosRequestConfig) {
  return config;
}

/**
 * 请求前处理
 * @param config
 * @returns
 */
export function beforeRequestHook(
  config: AxiosRequestConfig,
  options: RequestOptions
) {
  const { noToken, showSpin } = options;

  /**请求需要携带token */
  if (!noToken) {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + localStorage.getItem(TURBO_CACHE_TYPE.TOKEN),
    };
  }

  /**请求加载效果 */
  if (showSpin) spin(true);
  return config;
}

/**
 * 请求拦截器失败处理
 * @param config
 * @returns
 */
export function requestCatchInterceptor(error: any, options: RequestOptions) {
  const { showSpin, onFail } = options;

  if (showSpin) spin(false);
  if (onFail) {
    onFail();
  }
  return Promise.reject(error);
}
