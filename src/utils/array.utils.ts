import { DictionaryType } from "@/types/common.type";
import { CommonUtils } from "./common.utils";
import { ObjectUtils } from "./object.utils";

export class ArrayUtils extends CommonUtils {
  static getObject(arr: Object[], key: string, value: string | number) {
    if (!ArrayUtils.isArray(arr)) return {};
    for (let el of arr) {
      if (ObjectUtils.accessNestedValue(el, key) === value) {
        return el;
      }
    }
    return {};
  }

  static isArray(el: any) {
    return Array.isArray(el);
  }
  static isUniqueObject = (array: any[], key: string) => {
    if (!ArrayUtils.isArray(array)) return false;
    return ArrayUtils.isUnique(array.map((element) => element[key]));
  };

  static isUnique = (array: (string | number)[]) => {
    const exist_elements: any[] = [];
    for (let arr of array) {
      if (!exist_elements.includes(arr)) exist_elements.push(arr);
    }
    return exist_elements?.length === array?.length;
  };

  static removeDuplicates = (array: DictionaryType[], key: string) => {
    const filterArrays: DictionaryType[] = [];
    array.forEach((element) => {
      if (
        ObjectUtils.isEmpty(this.getObject(filterArrays, key, element[key]))
      ) {
        filterArrays.push(element);
      }
    });
    return filterArrays;
  };

  static isEmpty(el: any) {
    if (!el) return true;
    if (!ArrayUtils.isArray(el)) return false;
    return el.length === 0;
  }

  static sortByKey({
    array,
    key,
    order,
    type = "number",
  }: {
    array?: DictionaryType[];
    key: string;
    order?: "asc" | "desc";
    type?: "string" | "number" | "date";
  }) {
    return array?.sort((a, b) => {
      let comparison = 0;
      if (type === "string") {
        comparison = a[key].localeCompare(b[key]);
      } else if (type === "number") {
        comparison = a[key] - b[key];
      } else if (type === "date") {
        comparison = new Date(a[key]).getTime() - new Date(b[key]).getTime();
      }
      return order === "desc" ? comparison * -1 : comparison;
    });
  }
}
