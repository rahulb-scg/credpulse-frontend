import { DictionaryType } from "../types/common.type";

export class CommonUtils {
  static IsUndefined = (value: any) => {
    return typeof value === "undefined";
  };

  static IsUndefinedOrNull = (value: any) => {
    if (CommonUtils.IsUndefined(value)) return true;
    return value === null;
  };

  static calculateAverageRating(rating_arr: number[] = []) {
    let rating_obj: any = {};
    for (const rate of rating_arr) {
      if (Object.keys(rating_obj).includes(String(rate))) {
        rating_obj[rate] = rating_obj[rate] + 1;
      } else rating_obj[rate] = 1;
    }
    const total = Object.keys(rating_obj).reduce((acc, rating_key) => {
      return acc + rating_obj[rating_key] * Number(rating_key);
    }, 0);
    return Math.round(total / rating_arr.length);
  }
  static discountPrice(discount_percentage: number, absolute: number) {
    return absolute - absolute * (discount_percentage / 100);
  }

  static createQueryString(
    params: DictionaryType,
    searchParams?: DictionaryType,
  ) {
    const newSearchParams = new URLSearchParams(
      searchParams ? searchParams?.toString() : "",
    );

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    }

    return newSearchParams.toString();
  }

  static isFunction(arg: any) {
    return typeof arg === "function";
  }
  static generateToken = (digit = 4) => {
    const fourDigit = Math.floor(1000 + Math.random() * 9000);
    return fourDigit.toString();
  };
}

export const EmptyFunction = () => {
  // empty function
};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
  return (...args: any) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
