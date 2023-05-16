import { Signer, providers, Contract } from "ethers";
import type { PredictionCollateral } from "../../typechain/PredictionCollateral";
import { providers as multicallProviders } from "@0xsequence/multicall";
import { PredictionABI } from "../../abi/Prediction";
import { Network } from "../../types";
import { PREDICTION_ADDRESS } from "../../constant";
import type { Event } from "./types";

class Prediction {
	private provider: providers.Provider;
	private signer?: Signer;
	private contract: PredictionCollateral;
	private multicallProvider: multicallProviders.MulticallProvider;
	constructor(providerOrSigner: providers.JsonRpcProvider | Signer, network: Network) {
		const provider = providerOrSigner instanceof providers.Provider ? providerOrSigner : providerOrSigner.provider;
		this.signer = (providerOrSigner as Signer)._isSigner ? (providerOrSigner as Signer) : undefined;

		if (!provider) {
			throw new Error("Either a provider or custom signer with provider must be provided");
		}

		this.provider = provider;

		this.multicallProvider = new multicallProviders.MulticallProvider(this.provider);

		this.contract = new Contract(PREDICTION_ADDRESS[network], PredictionABI, this.multicallProvider) as unknown as PredictionCollateral;
	}

	public async getEventDetail(eventId: number): Promise<Event> {
		return await this.contract.eventDetail(eventId);
	}
}

export default Prediction;
