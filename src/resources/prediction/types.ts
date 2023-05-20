import { BigNumber } from "ethers";

export type EventDetail = {
	description: string;
	answers: Array<string>;
	creator: string;
	payment: string;
	reward: BigNumber;
	creatorFee: number;
	startTime: number;
	endTime: number;
	extraTime: number;
	outcomes: Array<number>;
};

export type CreatedEventOutput = Omit<EventDetail, "outcomes" | "reward"> & {
	eventId: number;
	txHash: string;
};

export type PredictedEventOutput = {
	predictor: string;
	eventId: number;
	option: number;
	amount: BigNumber;
	txHash: string;
};

export type ResolveEventOutput = {
	creator: string;
	eventId: number;
	outcomes: Array<number>;
	txHash: string;
};

export type RedeemEventOutput = Omit<PredictedEventOutput, "">;

export type CancelEventOutput = {
	creator: string;
	eventId: number;
	txHash: string;
};
