import lighthouse from '@lighthouse-web3/sdk';
import axios from 'axios';
import {ethers} from 'ethers';
import {EAS, Offchain, SchemaEncoder, SchemaRegistry} from '@ethereum-attestation-service/eas-sdk';

const signAuthMessage = async(privateKey, messageRequired) => {
    const signer = new ethers.Wallet(privateKey);
    const signedMessage = await signer.signMessage(messageRequired);

    return (signedMessage);
}

const getApiKey = async() => {
    const wallet = {
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
    };

    const url = `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`;
    const verificationMessage = (await axios.get(url)).data;
    const signedMessage = await signAuthMessage(wallet.privateKey, verificationMessage);
    const apiKey = await lighthouse.getApiKey(wallet.publicKey, signedMessage);

    return (apiKey);
}

const uploadFile = async() => {
    const path = '/personal/art-boutique/src/test-file.mock';
    const apiKey = (await getApiKey()).data.apiKey;

    console.log(`Loading mock file...`);
    const response = await lighthouse.upload(path, apiKey);
    console.log(`Loaded! Hash is: ${response.data.Hash}`);

    return (response);
}

const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
const AttestationUID = '0x5b7fbe5cd404bcfb5f1a00a3fdc71c4a145873f3fc00b7c1f3b0bd5b54ad7fd0';

const init = () => {
    const eas = new EAS(EASContractAddress);
    const provider = ethers.providers.getDefaultProvider("sepolia");

    return (eas.connect(provider));
}

const initAsSigner = async(privateKey) => {
    const provider = new ethers.providers.JsonRpcProvider('https://gateway.tenderly.co/public/sepolia');
    const signer = new ethers.Wallet(privateKey, provider);
    const eas = new EAS(EASContractAddress);

    return (eas.connect(signer));
}

const createOnchainAttestation = async(ipfs) => {
    const eas = initAsSigner(process.env.PRIVATE_KEY);
    const schemaEncoder = new SchemaEncoder("string ipfs,string license,uint256 price");
    const encodedData = schemaEncoder.encodeData([
        {name: 'ipfs', value: ipfs, type: 'string'},
        {name: 'license', value: 'some_license', type: 'string'},
        {name: 'price', value: '1337', type: 'uint256'},
    ]);

    const schemaUID = '0x9ab3b6006c32f73b4993c5ca330403c802f52745ecc58eecd0869db7c2b2810c';

    let tx = (await eas).attest({
        schema: schemaUID,
        data: {
            recipient: process.env.PUBLIC_KEY,
            expirationTime: 0,
            data: encodedData,
            revocable: false,
            value: 0
        }
    });

    return (await tx).wait();
}

const uploadResponse = await uploadFile();

await createOnchainAttestation(`ipfs://${uploadResponse.data.Hash}`).then(() => {
    console.log('Created an on-chain attestation.');
})