export class LocalStorageApi {
    private supported: boolean;

    constructor() {
        this.supported = typeof window["localStorage"] !== "undefined" && window["localStorage"] != null;
    }

    public set(key: string, item: any): void {
        if (this.supported) {
            localStorage.setItem(key, JSON.stringify(item));
        }
    }

    public get<T>(key: string): T | null {
        if (!this.supported) return null;
        const value = localStorage.getItem(key);
        return (value === null)
            ? null
            : JSON.parse(value) as T;
    }

    public remove(key: string): void {
        if (!this.supported) return;
        localStorage.removeItem(key);
    }
}
