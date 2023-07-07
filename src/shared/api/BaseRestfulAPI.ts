import { http, RequestOptions, AxiosRequestConfig } from "../core/http";

/**
 * 基础请求封装
 */
export default class BaseRestfulAPI<T extends BaseDataStruct> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  request(
    config: AxiosRequestConfig,
    options?: Partial<RequestOptions>
  ): Promise<any> {
    const url = config.url || "";
    if (url.indexOf(this.baseUrl) === -1) {
      config.url = `${this.baseUrl}${url ? "/" + url : ""}`;
    }
    return http.request(config, options);
  }

  insert(data: Partial<T>, options?: Partial<RequestOptions>): Promise<T> {
    return this.request(
      {
        method: "post",
        data,
      },
      options
    );
  }

  update(data: Partial<T>, options?: Partial<RequestOptions>): Promise<T> {
    return this.request(
      {
        method: "put",
        data,
      },
      options
    );
  }

  save(data: Partial<T>, options?: Partial<RequestOptions>): Promise<T> {
    return data.id ? this.update(data, options) : this.insert(data, options);
  }

  get(id: string, options?: Partial<RequestOptions>): Promise<T> {
    return this.request(
      {
        method: "get",
        url: `${id}`,
      },
      options
    );
  }

  async list(
    data: Partial<T>,
    options?: Partial<RequestOptions>
  ): Promise<ListResult<T>> {
    return this.request(
      {
        method: "post",
        url: `list`,
        data,
      },
      options
    ).then<ListResult<T>>((result: any) => {
      const list = (result && result.list) || [];
      const total = (result && result.total) || 0;
      return { list, total };
    });
  }

  delete(ids: string[], options?: Partial<RequestOptions>) {
    return this.request(
      {
        method: "delete",
        data: ids,
      },
      options
    );
  }
}

export interface BaseDataStruct {
  id?: string;
}

export interface ListResult<T> {
  list: T[];
  total: number;
}
