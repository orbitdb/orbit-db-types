declare module 'orbit-db' {
    import { Store } from "orbit-db-store";
    import { KeyValueStore } from "orbit-db-kvstore";
    import { FeedStore } from "orbit-db-feedstore";
    import { EventStore } from "orbit-db-eventstore";
    import { DocumentStore } from "orbit-db-docstore";
    import { CounterStore } from "orbit-db-counterstore";
    import IPFS from "ipfs";
    import elliptic from "elliptic";

    export class OrbitDB {

        stores: any;
        directory: string;
        keystore: any;
        key: elliptic.ec.KeyPair

        constructor(ipfs: IPFS, directory?: string, options?: {
            peerId?: string,
            keystore?: any
        });

        create(name: string, type: string, options?: DBOptions): Promise<Store>;

        open(address: string, options?: DBOptions): Promise<Store>;

        disconnect(): Promise<void>;
        stop(): Promise<void>;

        feed(address: string, options?: DBOptions): Promise<FeedStore>;
        log(address: string, options?: DBOptions): Promise<EventStore>;
        eventlog(address: string, options?: DBOptions): Promise<EventStore>;
        keyvalue(address: string, options?: DBOptions): Promise<KeyValueStore>;
        kvstore(address: string, options?: DBOptions): Promise<KeyValueStore>;
        counter(address: string, options?: DBOptions): Promise<CounterStore>;
        docs(address: string, options?: DBOptions): Promise<DocumentStore>;
        docstore(address: string, options?: DBOptions): Promise<DocumentStore>;

        static isValidType(type: string);
        static addDatabaseType(type: string, store: Store);
        static getDatabaseTypes(): {};
        static isValidAddress(address: string): boolean;
    }

    export default OrbitDB;
}