declare module "orbit-db-kvstore" {
    import { Store } from "orbit-db-store";

    export class KeyValueStore<K, V> extends Store {

        put(key: K, value: V): Promise<void>;
        set(key: K, value: V): Promise<void>;

        get(key: K): V;

    }
}