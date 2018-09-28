declare module "orbit-db-eventstore" {
    import { Store } from "orbit-db-store";

    export class EventStore extends Store {
        add(data: any): Promise<string>;
        get(hash: string): any;

        iterator(): Array<any>;
        iterator(options: { 
            gt: string,
            gte: string, 
            lt: string, 
            lte: string, 
            limit: number, 
            reverse: boolean 
        }): Array<any>;
    }
}