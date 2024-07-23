import {ethers} from "hardhat";
async function deploy(){
    //deploy contract
    let publicKey="0x143E387F81Aee6C0235727bd91544fc3D1E34Ba2";
    const AuthContractFactory = await ethers.getContractFactory("AuthContract");
    const AuthContract = await AuthContractFactory.deploy(publicKey);
    await AuthContract.waitForDeployment();
    console.log("AuthContract deployed to:",await AuthContract.getAddress());
}
deploy();