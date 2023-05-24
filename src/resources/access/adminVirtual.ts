import { Contract, Signer } from "ethers";
import { AdminVirtualAbi } from "../../abi/AdminVirtual";
import { ADMIN_VIRTUAL_ADDRESS } from "../../constant";
import { Network } from "../../types";
import { AdminVirtual as AdminVirtualType } from "../../typechain/AdminVirtual";
import type { RegisterOperatorOutput } from "./types";

export default class AdminVirtual {
	public contract: AdminVirtualType;

	constructor(signer: Signer, network: Network) {
		this.contract = new Contract(ADMIN_VIRTUAL_ADDRESS[network], AdminVirtualAbi, signer) as unknown as AdminVirtualType;
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
