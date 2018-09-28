declare module "orbit-db-store" {
    import IPFS = require("ipfs");
    import { EventEmitter } from 'events';

    export class Store {
        
        address: { root: string, path: string };
        key: any;
        type: string;
        replicationStatus: { buffered: number, queued: number, progress: number, max: number};

        events: EventEmitter;

        constructor (ipfs: IPFS, identity, address: string, options: {});
        
        load(): Promise<void>;
        load(smount: number): Promise<void>;

        close(): Promise<void>;
        drop(): Promise<void>;

    }
}