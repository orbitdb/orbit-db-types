declare module "orbit-db-identity-provider" {
    export class Identity {
        constructor (id: string, publicKey: string, idSignature: string, pubKeyIdSignature: string, type: string, provider)

        private _id: string
        private _publicKey: string
        private _signatures: {id:string, publicKey:string}
        private _type: string
        private _provider: string

        readonly id: string
        readonly publicKey: string
        readonly signatures: { id: string, publicKey: string }
        readonly type: string
        readonly provider: string

        toJSON(): {
            id:string,
            publicKey:string,
            signatures: {id:string, publicKey:string},
            type: string
        }
    }
}