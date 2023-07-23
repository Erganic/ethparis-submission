pragma solidity ^0.8.0;

import {IEAS} from "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/contracts/IEAS.sol";
import {Attestation} from "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/master/contracts/Common.sol";

interface IMailbox {
    function dispatch(
        uint32 _destination,
        bytes32 _recipient,
        bytes calldata _body
    ) external returns (bytes32);
}

contract L2CommunicationInitiator {
    address constant HL_GATEWAY_ADDRESS = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    IEAS immutable eas;

    constructor(address EASAddress) {
        eas = IEAS(EASAddress);
    }

    //schema: beneficiary, chainId, vaultAddress, amount
    function withdraw(bytes32 attestationId) public {
        Attestation memory attestation = eas.getAttestation(attestationId);

        //(address beneficiary, uint32 cId, address vault, uint amount) = _decodeData(attestation.data);

        //ActionMessage: ActionType, CustomAddress?, amount? 
        IMailbox(HL_GATEWAY_ADDRESS).dispatch(44787, addressToBytes32(0x8d741Bdf3007FDf9f72277cef2A7103e8fE2B2F6), "0x42069");
    }

    function _decodeData(bytes memory data) private pure returns (address beneficiary, uint32 chainId, address vaultAddress, uint amount) {
        (beneficiary, chainId, vaultAddress, amount) = abi.decode(data, (address, uint32, address, uint));
    }

    function initiate(uint32 destination, bytes32 recipient) private {
        IMailbox(HL_GATEWAY_ADDRESS).dispatch(destination, recipient, '0x69');
    }

    // alignment preserving cast
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }
}