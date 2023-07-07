import { isFunction } from "lodash-es";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { CreateHttpOptions, RequestOptions, ResponseResult } from "./type";

/**
 * 基于Axios二次封装
 */
export default class Http {
  private readonly instance: AxiosInstance;
  private readonly options: CreateHttpOptions;

  constructor(options: CreateHttpOptions) {
    this.options = options;
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  /**安装拦截器 */
  private setupInterceptors() {
    const transform = this.options.transform!;
    const {
      requestInterceptor,
      requestCatchInterceptor,
      responseInterceptor,
      responseCatchInterceptor,
    } = transform;

    this.instance.interceptors.request.use(
      (config) => {
        if (isFunction(requestInterceptor)) {
          config = requestInterceptor(config) as any;
        }
        return config;
      },
      (error) => {
        isFunction(requestCatchInterceptor) &&
          requestCatchInterceptor(
            error,
            this.options.requestOptions as RequestOptions
          );
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        // response && httpCanceler.removePending(response.config);
        if (isFunction(responseInterceptor)) {
          response = responseInterceptor(response);
        }
        return response;
      },
      (error) =>
        isFunction(responseCatchInterceptor) && responseCatchInterceptor(error)
    );
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, method: "GET" }, options);
  }

  post<T = any>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, data, method: "POST" }, options);
  }

  put<T = any>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, data, method: "PUT" }, options);
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, method: "DELETE" }, options);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: CreateHttpOptions = Object.assign({}, this.options, config);

    const { transform, requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, afterResponseHook } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<ResponseResult>>(conf)
        .then((res: AxiosResponse<ResponseResult>) => {
          if (afterResponseHook && isFunction(afterResponseHook)) {
            try {
              const ret = afterResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          reject(e);
        });
    });
  }
}
