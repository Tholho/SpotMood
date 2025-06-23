import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync<T>(
  key: string,
  value: T | null,
): Promise<void> {
  const stringValue = value === null ? null : JSON.stringify(value);

  if (Platform.OS === "web") {
    try {
      if (stringValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, stringValue);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    try {
      if (stringValue === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, stringValue);
      }
    } catch (e) {
      console.error("SecureStore write failed:", e);
    }
  }
}

export async function getStorageItemAsync<T>(key: string): Promise<T | null> {
  let stringValue: string | null = null;

  if (Platform.OS === "web") {
    try {
      stringValue = localStorage.getItem(key);
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    try {
      stringValue = await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error("SecureStore read failed:", e);
    }
  }

  if (stringValue === null) return null;

  try {
    return JSON.parse(stringValue) as T;
  } catch (e) {
    console.error(`Failed to parse stored value for key "${key}":`, e);
    return null;
  }
}

export function useStorageState<T>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  // Load on mount
  useEffect(() => {
    getStorageItemAsync<T>(key).then(setState);
  }, [key]);

  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync<T>(key, value);
    },
    [key],
  );

  return [state, setValue];
}
