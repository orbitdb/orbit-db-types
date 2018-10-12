declare module "orbit-db-eventstore" {
    import { Store } from "orbit-db-store";

    export class EventStore<T> extends Store {
        add(data: any): Promise<string>;
        get(hash: string): T;

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