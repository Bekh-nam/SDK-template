import { Network } from "../types";
import axios from "axios";
import { ENDPOINT_API, PREDICTION_ADDRESS } from "../constant";
import { ethers } from "ethers";
import { PredictionABI } from "../abi/Prediction";

export const getEventIdsOfCreatorFromBlock = async (network: Network, apiKey: string, creatorAddress: string): Promise<Array<number>> => {
	// get data from block
	const { data } = await axios({
		method: "get",
		url: `${ENDPOINT_API[network]}/api?module=logs&action=getLogs&address=${PREDICTION_ADDRESS[network]}&topic2=0x000000000000000000000000${creatorAddress.slice(2)}&apikey=${apiKey}`,
	});
	// format data
	const iface = new ethers.utils.Interface(PredictionABI);
	const eventsOfCreator = data?.result?.map((e: any) => iface.decodeEventLog("CreatedEvent", e.data, e.topics));
	return eventsOfCreator?.map((e: any) => {
		let { eventId } = e;
		return +eventId.toString();
	});
};

export const getEventIdsOfUserPredictedFromBlock = async (network: Network, apiKey: string, userAddress: string): Promise<Array<number>> => {
	const iface = new ethers.utils.Interface(PredictionABI);
	// get data from block
	const { data } = await axios({
		method: "get",
		url: `${ENDPOINT_API[network]}/api?module=logs&action=getLogs&address=${PREDICTION_ADDRESS[network]}&topic0=${iface.getEventTopic(
			"PredictedEvent"
		)}&topic0_1_opr=and&topic1=0x000000000000000000000000${userAddress.slice(2)}&apikey=${apiKey}`,
	});
	// format data
	const eventsOfUserPredicted = data?.result?.map((e: any) => iface.decodeEventLog("PredictedEvent", e.data, e.topics));
	let eventIds = eventsOfUserPredicted?.map((e: any) => {
		let { eventId } = e;
		return +eventId.toString();
	});
	eventIds = new Set(eventIds);
	return Array.from(eventIds);
};
