// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "../node_modules/@sismo-core/sismo-connect-solidity/contracts/libs/SismoLib.sol";
// groupId 0xc1f8949ad3fc0cf61fd4d7bf2800ee7c
// appId 0x7f6d87d9e732ec81f05f54993d26deba
contract Lock is SismoConnect{

    using SismoConnectHelper for SismoConnectVerifiedResult;

    uint public number;
    address payable public owner;
    bytes16 private constant GROUP_ID = 0xc1f8949ad3fc0cf61fd4d7bf2800ee7c;
    

    constructor(bytes16 appId) payable SismoConnect(buildConfig(appId)) {
       number = 0;
    }

    function doSomethingUsingSismoConnect(bytes memory sismoConnectResponse) public {    
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            // we want users to prove that they own a Sismo Vault
            // and that they are members of the group with the id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
            // we are recreating the auth and claim requests made in the frontend to be sure that 
            // the proofs provided in the response are valid with respect to this auth request
            auth: buildAuth({authType: AuthType.VAULT}),       
            claim: buildClaim({groupId: GROUP_ID,
            claimType : ClaimType.GTE
        }),

        // we also want to check if the signed message provided in the response is the signature of the user's address
        signature:  buildSignature({message: abi.encode(msg.sender)})

        
        });
        
        number += 1 ;
    }

    function getGroupId() public pure returns (bytes16){
        return GROUP_ID;
    }
}
