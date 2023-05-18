import { AptosClient, HexString, TokenClient } from 'aptos';
import {
  APTOS_NODE_URL,
  COLLECTION,
  DEFAULT_COIN_TYPE,
  INFORMATION_DATA_MODULE,
  INFORMATION_MODULE,
  MOUDLE_ADDRESS,
  PREDICT_MODULE,
  RESOURCE_ADDRESS,
  SURVEY_MODULE,
  SURVEY_NFT_MODULE,
} from './constants';
import { IChainID } from './types';
import { getOptionHashValue } from './utils';

export const getPredictEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID['value'],
  coinType: string = DEFAULT_COIN_TYPE
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MOUDLE_ADDRESS[chainId],
    `${MOUDLE_ADDRESS[chainId]}::${PREDICT_MODULE}::Prediction<${coinType}>`
  );
  const { handle } = data.all_events;

  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MOUDLE_ADDRESS[chainId]}::${INFORMATION_DATA_MODULE}::EventID`,
      value_type: `${MOUDLE_ADDRESS[chainId]}::${PREDICT_MODULE}::Event<${coinType}>`,
      key: {
        creator,
        description: `${description}?#(${coinType})?#${getOptionHashValue(
          options
        )}`,
      },
    });
    return dataPredict;
  } catch (error: any) {
    return error;
  }
};

export const getSurveyEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID['value'],
  coinType: string = DEFAULT_COIN_TYPE
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MOUDLE_ADDRESS[chainId],
    `${MOUDLE_ADDRESS[chainId]}::${SURVEY_MODULE}::Survey<${coinType}>`
  );
  const { handle } = data.all_events;

  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MOUDLE_ADDRESS[chainId]}::${INFORMATION_MODULE}::EventID`,
      value_type: `${MOUDLE_ADDRESS[chainId]}::${SURVEY_MODULE}::Event<${coinType}>`,
      key: {
        creator,
        description: `${description}?#(${coinType})?#${getOptionHashValue(
          options
        )}`,
      },
    });
    return dataPredict;
  } catch (error: any) {
    return error;
  }
};

export const getSurveyNFTEventByEventID = async (
  creator: HexString,
  description: string,
  options: string[],
  chainId: IChainID['value'],
  coinType: string = DEFAULT_COIN_TYPE
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MOUDLE_ADDRESS[chainId],
    `${MOUDLE_ADDRESS[chainId]}::${SURVEY_NFT_MODULE}::SurveyNft`
  );
  const { handle } = data.all_events;

  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const dataPredict = await client.getTableItem(handle, {
      key_type: `${MOUDLE_ADDRESS[chainId]}::${INFORMATION_MODULE}::EventID`,
      value_type: `${MOUDLE_ADDRESS[chainId]}::${SURVEY_NFT_MODULE}::Event`,
      key: {
        creator,
        description: `${description}?#(${coinType})?#${getOptionHashValue(
          options
        )}`,
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
  chainId: IChainID['value']
) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const tokenClient = new TokenClient(client);
  const tokenId: any = {
    token_data_id: {
      creator: RESOURCE_ADDRESS[chainId],
      collection: COLLECTION,
      name: itemName,
    },
    property_version: '0',
  };
  let amount: string = '';
  await tokenClient.getTokenForAccount(owner, tokenId).then((res) => {
    amount = res.amount;
  });
  return amount;
};
