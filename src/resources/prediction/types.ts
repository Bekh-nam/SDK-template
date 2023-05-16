import { BigNumber } from "ethers";

export type Event = {
	description: string;
	answers: Array<string>;
	creator: string;
	payment: string;
	reward: BigNumber;
	creatorFee: BigNumber;
	startTime: BigNumber;
	endTime: BigNumber;
	extraTime: BigNumber;
	outcomes: Array<BigNumber>;
};
