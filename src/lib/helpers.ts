import { StorageKeysEnum } from "@/types";

export class Storages {
    static setStorage<T>(
        type: "local" | "session",
        key: StorageKeysEnum,
        data: T
    ) {
        if (type === "local")
            localStorage.setItem(`chainNotify_${key}`, JSON.stringify(data));
        else sessionStorage.setItem(`chainNotify_${key}`, JSON.stringify(data));
    }

    static checkStorage(
        type: "local" | "session",
        key: StorageKeysEnum
    ): boolean {
        if (type === "local") return !!localStorage.getItem(`chainNotify_${key}`);
        else return !!sessionStorage.getItem(`chainNotify_${key}`);
    }

    static getStorage<T>(
        type: "local" | "session",
        key: StorageKeysEnum
    ): T | null {
        let data: T | null;
        if (type === "local")
            data = Storages.checkStorage(type, key)
                ? JSON.parse(localStorage.getItem(`chainNotify_${key}`)!)
                : null;
        else
            data = Storages.checkStorage(type, key)
                ? JSON.parse(sessionStorage.getItem(`chainNotify_${key}`)!)
                : null;
        return data;
    }

    static removeStorage(type: "local" | "session", key: StorageKeysEnum) {
        if (type === "local") localStorage.removeItem(`chainNotify_${key}`);
        else sessionStorage.removeItem(`chainNotify_${key}`);
    }

    static clearStorage(type: "local" | "session") {
        if (type === "local") localStorage.clear();
        else sessionStorage.clear();
    }
}
