import { HexString } from "aptos";
import axios from "axios";
import { IChainID } from "./types";
import { GraphQLEndpoint, MODULE_ADDRESS } from "./constants";
import { getPredictEventByEventID } from "./getResource";

export const getEventByCreator = async (
  creator: HexString,
  chainID: IChainID["value"]
) => {
  const body = {
    operationName: "GetEventByCreator",
    query: `query GetEventByCreator {
      events(
        where: {account_address: {_like: "${MODULE_ADDRESS[chainID]}"}, type: {_regex: "CreateEvent"}}
      ) {
        data
      }
    }
    `,
    variables: null,
  };
  const data = await axios.post(GraphQLEndpoint[chainID], body);
  const results: any[] = [];
  await Promise.all(
    data.data.data.events
      ?.reduce(
        (a: any[], event: any) =>
          event.data.creator === creator ? [...a, event] : a,
        []
      )
      .map(async (value: any) => {
        const result = await getPredictEventByEventID(
          value.data.event_id.creator,
          value.data.event_id.description,
          [],
          chainID
        );
        results.push(result);
      })
  );
  return results;
};

export const getJoinedEvent = async (
  predictor: HexString,
  chainID: IChainID["value"]
) => {
  const body = {
    operationName: "GetEventByCreator",
    query: `query GetEventByCreator {
      events(
        where: {account_address: {_like: "${MODULE_ADDRESS[chainID]}"}, type: {_regex: "PredictEvent"}}
      ) {
        data
      }
    }
    `,
    variables: null,
  };
  const data = await axios.post(GraphQLEndpoint[chainID], body);
  const results: any[] = [];
  await Promise.all(
    data.data.data.events
      ?.reduce(
        (a: any[], event: any) =>
          event.data.predicter === predictor ? [...a, event] : a,
        []
      )
      .map(async (value: any) => {
        const result = await getPredictEventByEventID(
          value.data.event_id.creator,
          value.data.event_id.description,
          [],
          chainID
        );
        results.push(result);
      })
  );
  return results;
};
