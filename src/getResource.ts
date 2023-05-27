import { AptosClient, HexString, TokenClient } from "aptos";
import {
  APTOS_NODE_URL,
  COLLECTION,
  DEFAULT_COIN_TYPE,
  INFORMATION_DATA_MODULE,
  INFORMATION_MODULE,
  MODULE_ADDRESS,
  PREDICT_MODULE,
  RESOURCE_ADDRESS,
  SURVEY_MODULE,
  SURVEY_NFT_MODULE,
} from "./constants";
import { IChainID } from "./types";
import { getOptionHashValue } from "./utils";

// creator : the event creator
// description: The event description has a data type of string.
// options: The event options has a data type of array.
// chainId: The network chainId
// coinType: The event coin type
export const getPredictEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID["value"],
  coinType: string = DEFAULT_COIN_TYPE
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MODULE_ADDRESS[chainId],
    `${MODULE_ADDRESS[chainId]}::${PREDICT_MODULE}::Prediction<${coinType}>`
  );
  const { handle } = data.all_events;

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MODULE_ADDRESS[chainId]}::${INFORMATION_DATA_MODULE}::EventID`,
      value_type: `${MODULE_ADDRESS[chainId]}::${PREDICT_MODULE}::Event<${coinType}>`,
      key: {
        creator,
        description:
          options.length !== 0
            ? `${description}?#(${coinType})?#${getOptionHashValue(options)}`
            : description,
      },
    });
    return dataPredict;
  } catch (error: any) {
    return error;
  }
};

// creator : the event creator
// description: The event description has a data type of string.
// options: The event options has a data type of array.
// chainId: The network chainId
// coinType: The event coin type
export const getSurveyEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID["value"],
  coinType: string = DEFAULT_COIN_TYPE
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MODULE_ADDRESS[chainId],
    `${MODULE_ADDRESS[chainId]}::${SURVEY_MODULE}::Survey<${coinType}>`
  );
  const { handle } = data.all_events;

  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MODULE_ADDRESS[chainId]}::${INFORMATION_MODULE}::EventID`,
      value_type: `${MODULE_ADDRESS[chainId]}::${SURVEY_MODULE}::Event<${coinType}>`,
      key: {
        creator,
        description:
          options.length !== 0
            ? `${description}?#(${coinType})?#${getOptionHashValue(options)}`
            : description,
      },
    });
    return dataPredict;
  } catch (error: any) {
    return error;
  }
};

// creator : the event creator
// description: The event description has a data type of string.
// options: The event options has a data type of array.
// chainId: The network chainId
export const getSurveyNFTEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID["value"]
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MODULE_ADDRESS[chainId],
    `${MODULE_ADDRESS[chainId]}::${SURVEY_NFT_MODULE}::SurveyNft`
  );
  const { handle } = data.all_events;

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MODULE_ADDRESS[chainId]}::${INFORMATION_MODULE}::EventID`,
      value_type: `${MODULE_ADDRESS[chainId]}::${SURVEY_NFT_MODULE}::Event`,
      key: {
        creator,
        description:
          options.length !== 0
            ? `${description}?#${getOptionHashValue(options)}`
            : description,
      },
    });
    return dataPredict;
  } catch (error: any) {
    return error;
  }
};

export const getTokenBalance = async (
  owner: HexString,
  itemName: string,
  chainId: IChainID["value"]
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const tokenClient = new TokenClient(client);
  const tokenId: any = {
    token_data_id: {
      creator: RESOURCE_ADDRESS[chainId],
      collection: COLLECTION[chainId],
      name: itemName,
    },
    property_version: "0",
  };
  let amount: string = "";
  await tokenClient.getTokenForAccount(owner, tokenId).then((res) => {
    amount = res.amount;
  });
  return amount;
};

export const getTokenForAccount = (
  owner: string,
  itemName: string,
  chainId: IChainID["value"] = 2
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const tokenClient = new TokenClient(client);
  const tokenId: any = {
    token_data_id: {
      creator: RESOURCE_ADDRESS[chainId],
      collection: COLLECTION[chainId],
      name: itemName,
    },
    property_version: "0",
  };
  return tokenClient
    .getTokenForAccount(owner, tokenId)
    .then((res) => res.amount);
};

export const getMemberOperatorRole = async (chainId: IChainID["value"]) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MODULE_ADDRESS[chainId],
    `${MODULE_ADDRESS[chainId]}::access_control::AccessControl`
  );
  const operator = data.role.data.filter(
    (item: any) => item.key === "Operator"
  )[0].value;
  return operator;
};

export const getServiceFee = async (chainId: IChainID["value"]) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MODULE_ADDRESS[chainId],
    `${MODULE_ADDRESS[chainId]}::information_data_factory::Information`
  );
  return data.fee_numerator / data.fee_denominator;
};

export const getOptionPrice = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID["value"],
  token_name: string
) => {
  const event = await getPredictEventByEventID(
    creator,
    description,
    options,
    chainId
  );
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const tokenClient = new TokenClient(client);
  let totalSupply = 0;
  let count = 0;
  await Promise.all(
    options.map(async (option) => {
      const tokenName = `${token_name.split("-")[0]}- ${option}`;
      const tokenData = await tokenClient.getTokenData(
        RESOURCE_ADDRESS[chainId],
        COLLECTION[chainId],
        tokenName
      );
      if (tokenData.supply > 0) {
        totalSupply += Number(tokenData.supply);
        count += 1;
      }
    })
  );
  if (event?.reward?.value < 100000000 || count < 2) {
    return 1;
  }
  const tokenData = await tokenClient.getTokenData(
    RESOURCE_ADDRESS[chainId],
    COLLECTION[chainId],
    token_name
  );
  const initScale = 1 / (options.length - 1);
  const poolScale = tokenData.supply / (totalSupply - tokenData.supply);
  const rewardRate = totalSupply / tokenData.supply;
  const tokenRate = 1 - (initScale - poolScale);
  return (rewardRate / ((rewardRate - 1) * tokenRate + 1)).toFixed(4);
};
