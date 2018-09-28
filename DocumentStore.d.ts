declare module "orbit-db-docstore" {
    import { Store } from "orbit-db-store";

    export class DocumentStore extends Store {

        put(key: any, value: any): Promise<void>;
        get(key: any): Array<any>;

        query(mapper: (doc: any) => void): Array<any>

        del(key: any): Promise<string>;
        
    }
}