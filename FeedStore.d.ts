declare module "orbit-db-feedstore" {
    import { Store } from "orbit-db-store";

    export class FeedStore<T> extends Store {
        add(data: any): Promise<string>;
        get(hash: string): T;

        remove(hash: string): Promise<string>;

        iterator(options?: { 
            gt?: string,
            gte?: string, 
            lt?: string, 
            lte?: string, 
            limit?: number, 
            reverse?: boolean 
        }): {
            [Symbol.iterator](),
            next(): T,
            collect(): T[]
        };
    }
}