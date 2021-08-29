import { LocalStorageTypes } from "app/LocalStorageTypes";

export const getFromLocaleStorage = (key: LocalStorageTypes): any => {
  const stringifiedValue = localStorage.getItem(key);
  if (stringifiedValue == null) return undefined;
  return JSON.parse(stringifiedValue);
};
