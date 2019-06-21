export interface Storage {
    get: <T>(name: string) => T;
    set: <T>(name: string, value: any) => void;
}

export type Entity<T> = T & { id?: number };
