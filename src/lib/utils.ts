import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function genId() {
  const length = 8;
  let result = "";
  const characters = "abcdef0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
