declare module "orbit-db-kvstore" {
    import Store from "orbit-db-store";

    class KeyValueStore<V> extends Store {

        put(key: string, value: V): Promise<void>;
        set(key: string, value: V): Promise<void>;

        get(key: string): V;

    }
    export = KeyValueStore
}