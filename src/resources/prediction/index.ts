import { Signer, providers, Contract, BigNumber, ethers } from "ethers";
import type { PredictionCollateral } from "../../typechain/PredictionCollateral";
import { PredictionABI } from "../../abi/Prediction";
import { Network } from "../../types";
import { NATIVE_ADDRESS, PREDICTION_ADDRESS } from "../../constant";
import AdminVirtual from "../access/adminVirtual";
import type { EventDetail, CreatedEventOutput, PredictedEventOutput, ResolveEventOutput, RedeemEventOutput, CancelEventOutput } from "./types";
import type { RegisterOperatorOutput } from "../access/types";
import { Erc20Abi } from "../../abi/ERC20";
import type { ERC20 as ERC20Contract } from "../../typechain/ERC20";

class InformationSDK {
	public contract: PredictionCollateral;

	private network: Network;
	private provider: providers.Provider;
	private signer?: Signer;

	constructor(providerOrSigner: providers.JsonRpcProvider | Signer, network: Network) {
		const provider = providerOrSigner instanceof providers.Provider ? providerOrSigner : providerOrSigner.provider;
		this.signer = (providerOrSigner as Signer)._isSigner ? (providerOrSigner as Signer) : undefined;

		if (!provider) {
			throw new Error("Either a provider or custom signer with provider must be provided");
		}

		this.provider = provider;
		this.network = network;

		this.contract = new Contract(PREDICTION_ADDRESS[network], PredictionABI, this.provider) as unknown as PredictionCollateral;
	}

	public async getEventDetail(eventId: number): Promise<EventDetail> {
		const { description, answers, creator, payment, reward, creatorFee, startTime, endTime, extraTime, outcomes } = await this.contract.eventDetail(eventId);
		return {
			description,
			answers,
			creator,
			payment,
			reward,
			creatorFee: +creatorFee.toString(),
			startTime: +startTime.toString(),
			endTime: +endTime.toString(),
			extraTime: +extraTime.toString(),
			outcomes: outcomes.map((o) => +o.toString()),
		};
	}

	public async registerOperator(): Promise<RegisterOperatorOutput> {
		const adminVirtual = new AdminVirtual(this._getSigner(), this.network);
		return await adminVirtual.registerOperator();
	}

	public async createEvent(
		description: string,
		answers: Array<string>,
		payment: string,
		creatorFee: number,
		startTime: number,
		endTime: number,
		extraTime: number,
		accountAddress?: string
	): Promise<CreatedEventOutput> {
		const signer: Signer = this._getSigner(accountAddress);
		const entranceFee = await this.contract.entranceFee();
		const tx = await this.contract.connect(signer).createEvent(description, answers, payment, creatorFee, startTime, endTime, extraTime, { value: entranceFee });
		const { logs, transactionHash } = await tx.wait();

		return {
			description,
			answers,
			creator: await signer.getAddress(),
			payment,
			creatorFee,
			startTime,
			endTime,
			extraTime,
			txHash: transactionHash,
			eventId: parseInt(logs[0]?.topics[1], 16),
		};
	}

	public async predictEvent(eventId: number, option: number, amount: number, accountAddress?: string): Promise<PredictedEventOutput> {
		const signer: Signer = this._getSigner(accountAddress);
		const event: EventDetail = await this.getEventDetail(eventId);
		const amountWei: BigNumber = await this._parseAmountToWei(event.payment, amount);
		let dataTx;
		if (event.payment === NATIVE_ADDRESS) {
			let tx = await this.contract.connect(signer).predictEvent(eventId, option, 0, { value: amountWei });
			dataTx = await tx.wait();
		} else {
			let tx = await this.contract.connect(signer).predictEvent(eventId, option, amountWei, { value: 0 });
			dataTx = await tx.wait();
		}
		const { transactionHash } = dataTx;
		return {
			predictor: await signer.getAddress(),
			eventId,
			option,
			amount: amountWei,
			txHash: transactionHash,
		};
	}

	public async resolveEvent(eventId: number, outcomes: Array<number>, accountAddress?: string): Promise<ResolveEventOutput> {
		const signer: Signer = this._getSigner(accountAddress);
		const tx = await this.contract.connect(signer).resolveEvent(
			eventId,
			outcomes.map((o) => o * 100)
		);
		const { transactionHash } = await tx.wait();
		return {
			creator: await signer.getAddress(),
			eventId,
			outcomes,
			txHash: transactionHash,
		};
	}

	public async redeemEvent(eventId: number, option: number, amount: number, accountAddress?: string): Promise<RedeemEventOutput> {
		const signer: Signer = this._getSigner(accountAddress);
		const event: EventDetail = await this.getEventDetail(eventId);
		const amountWei: BigNumber = await this._parseAmountToWei(event.payment, amount);
		const tx = await this.contract.connect(signer).redeemEvent(eventId, option, amountWei);

		const { transactionHash } = await tx.wait();
		return {
			predictor: await signer.getAddress(),
			eventId,
			option,
			amount: amountWei,
			txHash: transactionHash,
		};
	}

	public async cancelEvent(eventId: number, accountAddress?: string): Promise<CancelEventOutput> {
		const signer: Signer = this._getSigner(accountAddress);
		const tx = await this.contract.connect(signer).cancelEvent(eventId);
		const { transactionHash } = await tx.wait();

		return {
			creator: await signer.getAddress(),
			eventId,
			txHash: transactionHash,
		};
	}

	public async updateEntranceFee(amount: BigNumber, accountAddress?: string): Promise<string> {
		const signer: Signer = this._getSigner(accountAddress);
		const tx = await this.contract.connect(signer).updateEntranceFee(amount);
		const { transactionHash } = await tx.wait();
		return transactionHash;
	}

	public getSigner(accountAddress?: string): Signer {
		if (this.signer) {
			return this.signer;
		}

		if (!(this.provider instanceof providers.JsonRpcProvider)) {
			throw new Error("Either signer or a JsonRpcProvider must be provided");
		}

		return this.provider.getSigner(accountAddress);
	}

	private _getSigner(accountAddress?: string): Signer {
		if (this.signer) {
			return this.signer;
		}

		if (!(this.provider instanceof providers.JsonRpcProvider)) {
			throw new Error("Either signer or a JsonRpcProvider must be provided");
		}

		return this.provider.getSigner(accountAddress);
	}

	private async _parseAmountToWei(addressToken: string, amount: number): Promise<BigNumber> {
		if (addressToken === NATIVE_ADDRESS) {
			return ethers.utils.parseUnits(amount.toString(), 18);
		} else {
			const token = new Contract(addressToken, Erc20Abi, this.provider) as unknown as ERC20Contract;
			let decimal = await token.decimals();
			return ethers.utils.parseUnits(amount.toString(), decimal);
		}
	}
}

export default InformationSDK;
