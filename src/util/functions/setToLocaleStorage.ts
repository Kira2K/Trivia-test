import { LocalStorageTypes } from "app/LocalStorageTypes";

export const setToLocaleStorage = ({
  key,
  value,
}: {
  key: LocalStorageTypes;
  value: any;
}): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
