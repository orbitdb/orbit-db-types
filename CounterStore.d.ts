declare module "orbit-db-counterstore" {
    import Store from "orbit-db-store";

    class CounterStore extends Store {
        value: number;
        
        inc(value?: number): Promise<string>;
    }
    export = CounterStore
}