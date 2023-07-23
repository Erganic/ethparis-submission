pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/safe-global/safe-contracts/main/contracts/SafeL2.sol";

interface IMessageRecipient {
    /**
     * @notice Handle an interchain message
     * @param _origin Domain ID of the chain from which the message came
     * @param _sender Address of the message sender on the origin chain as bytes32
     * @param _body Raw bytes content of message body
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external;
}
//Lives on Celo Testnet
contract L2LightVault is SafeL2, IMessageRecipient {
    address constant AUTHORIZED_EXECUTOR_ADDRESS = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;

    bytes private receivedData;

    constructor(address initiator, uint32 targetChainId, address targetAddress) {

    }

    modifier HLRequest() {
        require(msg.sender == AUTHORIZED_EXECUTOR_ADDRESS);
        _;
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external {
        receivedData = _body;
    }
    
    function managePurchases() public {

    }

    function getReceivedData() public view returns (bytes memory) {
        return receivedData;
    }

    function transferControl(address to) external HLRequest {
        require(to != address(0));
    }
}