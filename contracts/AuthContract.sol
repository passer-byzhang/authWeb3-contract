// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract AuthContract {
    address public signer;

    mapping(address => uint256) public nonces;
    mapping(address => uint256) public values;

    constructor(address _signer) payable {
        signer = _signer;
    }

    struct Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    function setValue(
        uint256 _nonce,
        uint256 _value,
        Signature memory _signature
    ) public {
        require(_nonce == nonces[msg.sender] + 1, "Invalid nonce");
        require(_value > values[msg.sender], "Invalid value");
        bytes32 signedRootMsg = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encodePacked(_value, _nonce ))
            )
        );
        address recovered = ecrecover(signedRootMsg, _signature.v, _signature.r, _signature.s);
        require(recovered == signer, "Invalid signature");
        nonces[msg.sender] = _nonce;
        values[msg.sender] = _value;
    }
    

}
