import {EAS, Offchain, SchemaEncoder, SchemaRegistry} from '@ethereum-attestation-service/eas-sdk';
import {ethers} from 'ethers';

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

const getAttestation = async(uid) => {
    const eas = init();
    const attestation = await eas.getAttestation(uid);

    return (attestation);
}

const createOnchainAttestation = async() => {
    const eas = initAsSigner(process.env.PRIVATE_KEY);
    const schemaEncoder = new SchemaEncoder("string ipfs,string license,uint256 price");
    const encodedData = schemaEncoder.encodeData([
        {name: 'ipfs', value: 'ipfs://string', type: 'string'},
        {name: 'license', value: 'some_license', type: 'string'},
        {name: 'price', value: '1337', type: 'uint256'},
    ]);

    const schemaUID = '0x9ab3b6006c32f73b4993c5ca330403c802f52745ecc58eecd0869db7c2b2810c';

    let tx = (await eas).attest({
        schema: schemaUID,
        data: {
            recipient: process.env.ADDRESS,
            expirationTime: 0,
            data: encodedData
        }
    });

    return (await tx).wait();

    //const response = (await tx).wait();
}

const prepareRawTx = async() => {
    const provider = new ethers.providers.JsonRpcProvider('https://gateway.tenderly.co/public/sepolia');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const txData = '0xf17325e700000000000000000000000000000000000000000000000000000000000000209ab3b6006c32f73b4993c5ca330403c802f52745ecc58eecd0869db7c2b2810c0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000003635c9adc5dea00000000000000000000000000000000000000000000000000000000000000000000f736f6d6575726c676f657368657265000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036d69740000000000000000000000000000000000000000000000000000000000';

    const rawTx = {
        from: '0x64A2CE65F76b3F6CeAB1d37430Aaf6710baD95ff',
        to: EASContractAddress,
        nonce: signer.getTransactionCount(),
        data: txData,
        maxFeePerGas: BigInt('0x59683266'),
        maxPriorityFeePerGas: BigInt('0x59682f00'),
        gasLimit: 10000000
    }

    const response = await signer.sendTransaction(rawTx);

    console.log('Waiting for tx execution');

    await response.wait();
}

await prepareRawTx();