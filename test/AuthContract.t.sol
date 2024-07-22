// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "../lib/forge-std/src/Test.sol";
import {AuthContract} from "../contracts/AuthContract.sol";

contract AuthContractTest is Test {
    AuthContract authContract;
    uint256 public privateKey = 0xc8fb4626a6b6919b1f05fb85fbc22bca715b51ee9265425f94bd3cc7ed594aa5;

    function setUp() public {
        authContract = new AuthContract(address(0x143E387F81Aee6C0235727bd91544fc3D1E34Ba2));
    }

    function getSignedHash(uint256 value,uint256 nonce) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    keccak256(abi.encodePacked(value, nonce))
                )
            );
    }

    function testSetValue() public {
        uint256 nonce = authContract.nonces(address(this))+1;
        uint256 newValue = 100;
        bytes32 prefixHash = getSignedHash(newValue, nonce);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
                privateKey,
                prefixHash
            );
        AuthContract.Signature memory signature = AuthContract.Signature(v, r, s);
        authContract.setValue(nonce, newValue, signature);
        assertEq(authContract.values(address(this)), newValue);
    }
}