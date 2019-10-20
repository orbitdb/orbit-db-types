declare module 'orbit-db-identity-provider' {
    import {Keystore} from 'orbit-db-keystore';
    import Identity, {IdentityAsJson, IdentityProviderType} from 'orbit-db-identity-provider/src/identity';
    import IdentityProvider, {IdentityProviderOptions} from 'orbit-db-identity-provider/src/identity-provider-interface';

    export interface CreateIdentityOptions extends IdentityProviderOptions {
        type?: IdentityProviderType
        identityKeysPath?: string
        migrate?: ({targetStore: Store, targetId: string}) => Promise<void>
    }

    export interface StaticCreateIdentityOptions extends CreateIdentityOptions {
        identityKeysPath?: string
    }

    export default class Identities {
        constructor(options: { keystore?: Keystore, signingKeystore?: Keystore })

        readonly keystore: Keystore;
        readonly signingKeystore: Keystore;

        sign(identity: IdentityAsJson, data: any): Promise<string>

        verify(signature: string, publicKey: string, data: any, verifier?: any): Promise<boolean>

        createIdentity(options?: CreateIdentityOptions): Promise<Identity>

        signId(id: string): Promise<{ publicKey: string, idSignature: string }>

        verifyIdentity(identity: IdentityAsJson): Promise<boolean>

        static verifyIdentity(identity: IdentityAsJson): Promise<boolean>

        static createIdentity(options?: StaticCreateIdentityOptions): Promise<Identity>

        static isSupported(type: IdentityProviderType): boolean

        static addIdentityProvider(IdentityProviderType: typeof IdentityProvider): void

        static removeIdentityProvider(type: IdentityProviderType): void
    }

}

declare module 'orbit-db-identity-provider/src/identity' {
    import IdentityProvider from 'orbit-db-identity-provider/src/identity-provider-interface';
    import Identities from 'orbit-db-identity-provider';

    export type IdentityProviderType = 'orbitdb' | 'ethereum' | string;

    export interface IdentityAsJson {
        id: string;
        publicKey: string;
        signatures: {
            id: string,
            publicKey: string
        };
        type: IdentityProviderType;
    }

    export default class Identity implements IdentityAsJson {
        constructor(id: string,
                    publicKey: string,
                    idSignature: string,
                    pubKeyIdSignature: string,
                    type: string,
                    provider: IdentityProvider
        )

        readonly id: string;
        readonly publicKey: string;
        readonly signatures: { id: string; publicKey: string };
        readonly type: IdentityProviderType;
        readonly provider: Identities;

        toJSON(): IdentityAsJson
    }

}

declare module 'orbit-db-identity-provider/src/identity-provider-interface' {
    import {Keystore} from 'orbit-db-keystore';
    import {IdentityAsJson, IdentityProviderType} from 'orbit-db-identity-provider/src/identity';

    export interface IdentityProviderOptions {
        /**
         * required by OrbitDBIdentityProvider
         */
        id?: string
        /**
         * required by OrbitDBIdentityProvider
         */
        keystore?: Keystore
        /**
         * required by OrbitDBIdentityProvider
         */
        signingKeystore?: Keystore
        /**
         * required by EthIdentityProvider
         */
        wallet?: any

        [k: string]: any
    }

    export default class IdentityProviderInterface {
        constructor(options: IdentityProviderOptions)

        /**
         * Return id of identity (to be signed by orbit-db public key)
         */
        getId(options?: IdentityProviderOptions): Promise<string>

        /**
         * Return signature of OrbitDB public key signature
         */
        signIdentity(data, options?): Promise<any>

        /**
         * Verify a signature of OrbitDB public key signature
         */
        static verifyIdentity(identity: IdentityAsJson): Promise<boolean>

        /**
         * Return the type for this identity-provider
         */
        static readonly type: IdentityProviderType;
    }

}
