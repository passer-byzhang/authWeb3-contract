import { expect } from "chai";
import hre from "hardhat";
import {AuthContract} from "../typechain-types/AuthContract";

describe("AuthContract", function () {

  let privateKey = "0xc8fb4626a6b6919b1f05fb85fbc22bca715b51ee9265425f94bd3cc7ed594aa5";
  let publicKey = "0x143E387F81Aee6C0235727bd91544fc3D1E34Ba2";
  let AuthContract:AuthContract;
  beforeEach(async function () {
    //deploy contract
    const AuthContractFactory = await hre.ethers.getContractFactory("AuthContract");
    AuthContract = await AuthContractFactory.deploy(publicKey);
  });

  it("Signed by a chosen address", async function () {
    let prefix = "\x19Ethereum Signed Message:\n32";
    let user = (await hre.ethers.getSigners())[0];
    let nonce = (await AuthContract.nonces(await user.getAddress()))+1n;
    //encodePacked in ethers.js
    let messageHash = hre.ethers.keccak256(hre.ethers.solidityPacked(["uint256", "uint256"], [100, nonce]));
    let hash = hre.ethers.keccak256(hre.ethers.solidityPacked(["string", "bytes32"], [prefix, messageHash]));
    console.log("hash:", hash);
    //use privateKey to sign
    let signingKey = new hre.ethers.SigningKey(privateKey);
    let signature = signingKey.sign(hash);
    await AuthContract.connect(user).setValue(nonce, 100,{v:signature.v, r:signature.r, s:signature.s});
    expect(await AuthContract.values(await user.getAddress())).to.equal(100);
  });


});
