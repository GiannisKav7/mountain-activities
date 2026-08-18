import { de } from "./de";
import { en } from "./en";

export const dict = { de, en };
export type Lang = keyof typeof dict;

export function getLangFromPath(pathname: string): Lang {
  return pathname.startsWith("/en") ? "en" : "de";
}
