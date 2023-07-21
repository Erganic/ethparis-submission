import lighthouse from '@lighthouse-web3/sdk';
import axios from 'axios';
import {ethers} from 'ethers';

const signAuthMessage = async(privateKey, messageRequired) => {
    const signer = new ethers.Wallet(privateKey);
    const signedMessage = await signer.signMessage(messageRequired);

    return (signedMessage);
}

const getApiKey = async() => {
    const wallet = {
        publicKey: process.env.PUBLIC_ADDRESS,
        privateKey: process.env.PRIVATE_ADDRESS
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
    const response = await lighthouse.upload(path, apiKey);

    return (response);
}

const uploadResponse = await uploadFile();

console.log(uploadResponse);