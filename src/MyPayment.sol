// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "openzeppelin/contracts/finance/PaymentSplitter.sol";

contract MyPayment {

    mapping(address => uint256) public balance;

    PaymentsStruct[] public PaymentSplitterArray;

    struct PaymentsStruct { 
        //PaymentSplitter payment;
        address[] payees;
        uint256[] shares_;
        uint parent;
    }


    function createNewPaymentStructure(address[] calldata payees, uint256[] calldata shares_, uint parent) public {

        //PaymentSplitter paymentSplitter = new PaymentSplitter(payees, shares_);

        PaymentsStruct memory tempopay = PaymentsStruct(payees, shares_, parent);

        PaymentSplitterArray.push(tempopay);
    }

    function payChild(uint child) public payable{

        uint256 amount = msg.value;

        pay(child, amount);

    }

    function pay(uint child, uint256 amount) private {

        if(child != 0){
            uint256 newAmount = amount/2;

            PaymentsStruct memory tempo = PaymentSplitterArray[child];

            for (uint i=0; i<tempo.payees.length; i++) {
                balance[tempo.payees[i]] += tempo.shares_[i]*newAmount / 100;
            }

            pay(tempo.parent , newAmount);

        }else {
            uint256 newAmount = amount;

            PaymentsStruct memory tempo = PaymentSplitterArray[child];

            for (uint i=0; i<tempo.payees.length; i++) {
                balance[tempo.payees[i]] += tempo.shares_[i]*newAmount / 100;
            }
        }
    }

    function withdraw() public payable{
        uint256 userBalance = balance[msg.sender];
        balance[msg.sender] = 0;
        address payable userAddress = payable(msg.sender);
        bool sent = userAddress.send(userBalance);
        require(sent, "Failed to send Ether");
    }

    function getBalance(address user) public view returns (uint256){
        return balance[user];
    }

    function getPaymentUser(uint id, uint id2) public view returns(address){
        address user = PaymentSplitterArray[id].payees[id2];
        return user;
    }

    function getPaymentShares(uint id, uint id2) public view returns(uint256){
        uint256 shares = PaymentSplitterArray[id].shares_[id2];
        return shares;
    }
}