import { DictionaryType } from "../types/common.type";

export default class LocalStorageUtils {
  static setLocalState(key: string, data: DictionaryType) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getLocalState(key: string) {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static removeLocalState(key: string) {
    localStorage.removeItem(key);
  }

  static clearAllLocalStorage() {
    localStorage.clear();
  }
}

export const authSession = "auth_session";
export type UserSessionType = {
  user: DictionaryType;
  access_token: string;
  refresh_token: string;
};
export class AuthStorageUtils {
  static getAccessToken() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.access_token;
  }
  static getRefreshToken() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.refresh_token;
  }
  static getUser() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.user;
  }

  static logout() {
    localStorage.removeItem(authSession);
  }

  static setInfo(data: DictionaryType) {
    LocalStorageUtils.setLocalState(authSession, data);
  }
}
