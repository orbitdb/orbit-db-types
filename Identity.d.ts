declare module "orbit-db-identity-provider" {
    export class Identity {
        constructor (id: string, publicKey: string, idSignature: string, pubKeyIdSignature: string, type: string, provider)

        private _id: string
        private _publicKey: string
        private _signatures: {id:string, publicKey:string}
        private _type: string
        private _provider: string

        get id(): string
        get publicKey(): string
        get signatures(): {id:string, publicKey:string}
        get type(): string
        get provider(): string

        toJSON(): {
            id:string,
            publicKey:string,
            signatures: {id:string, publicKey:string},
            type: string
        }
    }
}