// verifierStorage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "spotify_verifier";

export async function setVerifier(value: string | null): Promise<void> {
  if (Platform.OS === "web") {
    try {
      //unsafe usage only for development...
      if (value === null) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, value);
      }
    } catch (e) {
      console.error("LocalStorage is unavailable:", e);
    }
  } else {
    try {
      if (value === null) {
        await SecureStore.deleteItemAsync(KEY);
      } else {
        await SecureStore.setItemAsync(KEY, value);
      }
    } catch (e) {
      console.error("SecureStore write failed:", e);
    }
  }
}

export async function getVerifier(): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      console.error("LocalStorage is unavailable:", e);
      return null;
    }
  } else {
    try {
      return await SecureStore.getItemAsync(KEY);
    } catch (e) {
      console.error("SecureStore read failed:", e);
      return null;
    }
  }
}
