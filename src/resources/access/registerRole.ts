import { Contract, Signer } from "ethers";
import { RegisterAbi } from "../../abi/RegisterRole";
import { ADMIN_VIRTUAL_ADDRESS } from "../../constant";
import { Network } from "../../types";
import { RegisterRole as RegisterRoleType } from "../../typechain/RegisterRole";
import type { RegisterOperatorOutput } from "./types";

export default class RegisterRole {
	public contract: RegisterRoleType;

	constructor(signer: Signer, network: Network) {
		this.contract = new Contract(ADMIN_VIRTUAL_ADDRESS[network], RegisterAbi, signer) as unknown as RegisterRoleType;
	}

	public async registerOperator(): Promise<RegisterOperatorOutput> {
		const tx = await this.contract.registerOperator();
		const { from, transactionHash } = await tx.wait();
		return {
			operator: from,
			txHash: transactionHash,
		};
	}
}
