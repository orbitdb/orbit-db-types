declare module "orbit-db-docstore" {
    import Store from "orbit-db-store";

    class DocumentStore<T> extends Store {

        put(key: any, value: any): Promise<string>;
        get(key: any): T[];

        query(mapper: (doc: T) => void): T[]

        del(key: any): Promise<string>;
        
    }
    export = DocumentStore
}