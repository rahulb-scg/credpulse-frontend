import axios from "axios";

import { getClientHostName } from "@/constants/api.constant";
import { AuthStorageUtils } from "./storage.utils";
import { DictionaryType } from "@/types/common.type";

export const getAccessToken = (type = "Bearer") => {
  const token = AuthStorageUtils.getAccessToken();
  return `${type} ${token}`;
};

export const getAuthorizationHeader = () => {
  return { Authorization: getAccessToken() };
};

const apiRoute = `${getClientHostName()}/api`;
const PRODUCTION_URL = apiRoute;
const DEVELOPMENT_URL = apiRoute;
export const api_request_methods = ["get", "post", "put", "patch", "delete"];
export const serverBaseUrl =
  process.env.NODE_ENV !== "production" ? DEVELOPMENT_URL : PRODUCTION_URL;
export interface APIResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export class ApiService<TData> {
  public endPoint: string;
  public headers: any = {
    "Content-Type": "application/json",
  };

  constructor(entitySlug: string, config?: { isLoggedIn?: boolean }) {
    this.endPoint = `${serverBaseUrl}/${entitySlug}`;
    this.headers.Authorization = config?.isLoggedIn
      ? getAccessToken()
      : undefined;
  }

  async getOne(): Promise<APIResponse<TData>> {
    return await axios.get(`${this.endPoint}`, this.headers);
  }
  async getAll(): Promise<APIResponse<TData[]>> {
    return await axios({
      method: "get",
      url: `${this.endPoint}`,
      headers: this.headers,
    });
  }
  async post(
    data: Omit<TData, "id" | "created_at" | "updated_at">,
  ): Promise<APIResponse<TData>> {
    return await axios({
      method: "post",
      url: this.endPoint,
      data,
      headers: this.headers,
    });
  }

  async search(data: DictionaryType): Promise<APIResponse<TData>> {
    return await axios({
      method: "post",
      url: this.endPoint,
      data,
      headers: this.headers,
    });
  }
  async put(
    data: Omit<TData, "id" | "created_at" | "updated_at">,
  ): Promise<APIResponse<TData>> {
    return await axios.put(this.endPoint, data, this.headers);
  }
  async delete(id: string): Promise<void> {
    return await axios.delete(`${this.endPoint}/${id}`, this.headers);
  }
}
