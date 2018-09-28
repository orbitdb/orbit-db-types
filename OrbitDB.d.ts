declare module 'orbit-db' {
    import { Store } from "orbit-db-store";
    import { KeyValueStore } from "orbit-db-kvstore";
    import { FeedStore } from "orbit-db-feedstore";
    import { EventStore } from "orbit-db-eventstore";
    import { DocumentStore } from "orbit-db-docstore";
    import { CounterStore } from "orbit-db-counterstore";
    import IPFS from "ipfs";

    export class OrbitDB {

        stores: any;
        directory: string;
        keystore: any;

        constructor(ipfs: IPFS, directory?: "./orbitdb", options?: {});

        create(name: string, type: string, options?: {
            directory?: string,
            write?: string[],
            overwrite?: boolean,
            replicate?: boolean
        }): Promise<Store>;

        open(address: string, options?: {
            type?: string,
            localOnly?: boolean,
            directory?: string,
            create?: boolean,
            overwrite?: boolean,
            replicate?: boolean
        }): Promise<Store>;

        disconnect(): Promise<void>;
        stop(): Promise<void>;

        feed(address: string): Promise<FeedStore>;
        feed(address: string, options: {}): Promise<FeedStore>;

        log(address: string): Promise<EventStore>;
        log(address: string, options: {}): Promise<EventStore>;

        eventlog(address: string): Promise<EventStore>;
        eventlog(address: string, options: {}): Promise<EventStore>;

        keyvalue(address: string): Promise<KeyValueStore>;
        keyvalue(address: string, options: {}): Promise<KeyValueStore>;

        kvstore(address: string): Promise<KeyValueStore>;
        kvstore(address: string, options: {}): Promise<KeyValueStore>;

        counter(address: string): Promise<CounterStore>;
        counter(address: string, options: {}): Promise<CounterStore>;

        docs(address: string): Promise<DocumentStore>;
        docs(address: string, options: {}): Promise<DocumentStore>;

        docstore(address: string): Promise<DocumentStore>;
        docstore(address: string, options: {}): Promise<DocumentStore>;

        static isValidType(type: string);
        static addDatabaseType(type: string, store: Store);
        static getDatabaseTypes(): {};
        static isValidAddress(address: string): boolean;
    }

    export default OrbitDB;
}