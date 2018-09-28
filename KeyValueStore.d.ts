declare module "orbit-db-kvstore" {
    import { Store } from "orbit-db-store";

    export class KeyValueStore extends Store {

        put(key: any, value: any): Promise<void>;
        set(key: any, value: any): Promise<void>;

        get(key: any): any;

    }
}