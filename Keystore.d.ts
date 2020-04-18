declare module "orbit-db-keystore" {
    export class Keystore {

        hasKey(id:string): Promise<boolean>

        createKey(id:string): Promise<{publicKey: string, privateKey: string}>

        getKey(id:string): Promise<{publicKey: string, privateKey: string}>

    }

    export default class {
        static create(directory?: string): any;
        static verify(signature: string, publicKey: string, data: string, v?:string): Promise<boolean>
    }
}
