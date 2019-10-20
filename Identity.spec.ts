/// <reference path="./index.d.ts" />

import {expect} from 'chai';
import Identities from 'orbit-db-identity-provider';
import IdentityProvider, {IdentityProviderOptions} from 'orbit-db-identity-provider/src/identity-provider-interface';
import Identity from 'orbit-db-identity-provider/src/identity';

describe('orbit-db-identity-provider', () => {

    describe('Identities', () => {
        it('should have createIdentity', () => {
            expect(Identities.createIdentity).to.be.an.instanceOf(Function);
        });
        context('with an identity', () => {
            let identity: Identity;
            before(async () => {
                identity = await Identities.createIdentity({
                    id: 'test-id',
                    identityKeysPath: '.tmp/Identities',
                    type: 'orbitdb'
                });
                expect(identity).to.be.not.null;
            });
            it('should have verifyIdentity', async () => {
                const result = await Identities.verifyIdentity(identity.toJSON());
                expect(result).to.be.true;
            });
            it('should have keystore and signingKeystore', async () => {
                expect(identity.provider.keystore).to.be.an('object');
                expect(identity.provider.signingKeystore).to.be.an('object');
            });
        });
        it('should have isSupported', async () => {
            const result = await Identities.isSupported('unknown');
            expect(result).to.be.false;
        });
        it('should have addIdentityProvider and removeIdentityProvider', async () => {
            expect(Identities.addIdentityProvider).to.be.an.instanceOf(Function);
            expect(Identities.removeIdentityProvider).to.be.an.instanceOf(Function);
        });
    });

    describe('Identity', () => {
        let identity: Identity;
        before(async () => {
            identity = await Identities.createIdentity({
                id: 'test-id',
                identityKeysPath: '.tmp/Identity',
                type: 'orbitdb'
            });
            expect(identity).to.be.not.null;
        });
        it('should create identity', async () => {
            const identity = new Identity(
                'an id',
                'public key',
                'idSignature',
                'publicKeyIdSignature',
                'a type',
                new IdentityProvider({})
            );
            expect(identity).to.be.not.null;
        });
        it('should have sign and very', async () => {
            const data = 'data';
            const signature = await identity.provider.sign(identity, data);
            expect(signature).to.be.a('string');
            const result = await identity.provider.verify(signature, identity.publicKey, data);
            expect(result).to.be.true;
        });
        it('should have signId', async () => {
            const signedId = await identity.provider.signId(identity.id);
            expect(signedId.idSignature).to.be.a('string');
            expect(signedId.publicKey).to.be.a('string');
        });
        it('should have toJSON', async () => {
            const identityAsJson = await identity.toJSON();
            expect(identityAsJson.id).to.be.a('string');
            expect(identityAsJson.type).to.be.a('string');
            expect(identityAsJson.publicKey).to.be.a('string');
            expect(identityAsJson.signatures.id).to.be.a('string');
            expect(identityAsJson.signatures.publicKey).to.be.a('string');
        });
    });

    describe('IdentityProviderInterface', () => {
        class CustomProvider extends IdentityProvider {
            static get type() {
                return 'custom-type';
            }

            static set type(_) {
            }

            constructor(options: IdentityProviderOptions) {
                super(options);
            }

            async getId(options?: IdentityProviderOptions): Promise<string> {
                return 'an-id';
            }

            async signIdentity(data, options?): Promise<any> {
                return 'signedIdentity';
            }
        }

        it('should manage IdentityProviderInterface', async () => {
            expect(Identities.isSupported('custom-type')).to.be.false;
            expect(Identities.isSupported('custom-type')).to.be.false;
            Identities.addIdentityProvider(CustomProvider);
            expect(Identities.isSupported('custom-type')).to.be.true;

        });
    });

});
