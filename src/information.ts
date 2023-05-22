import { HexString, Types } from "aptos";
import {
  COLLECTION,
  INFORMATION_MODULE,
  MOUDLE_ADDRESS,
  RESOURCE_ADDRESS,
} from "./constants";
import { IChainID } from "./types";

const createPredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  uri: string,
  options: string[],
  start_time: number,
  end_time: number,
  payout_time: number,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::create_predict_event`,
    type_arguments: [type_arguments],
    arguments: [
      `${description}?#(${type_arguments})`,
      uri,
      options,
      start_time,
      end_time,
      payout_time,
    ],
  };
  return signAndSubmitTransactionCallback(payload);
};

const createSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  uri: string,
  reward: number,
  options: string[],
  start_time: number,
  end_time: number,
  payout_time: number,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::create_survey_event`,
    type_arguments: [type_arguments],
    arguments: [
      `${description}?#(${type_arguments})`,
      uri,
      reward,
      options,
      start_time,
      end_time,
      payout_time,
    ],
  };
  return signAndSubmitTransactionCallback(payload);
};

const createSurveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  collection: string,
  uri: string,
  options: string[],
  start_time: number,
  end_time: number,
  payout_time: number
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::create_survey_nft_event`,
    type_arguments: [],
    arguments: [
      description,
      collection,
      uri,
      options,
      start_time,
      end_time,
      payout_time,
    ],
  };
  return signAndSubmitTransactionCallback(payload);
};

const predictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  option: string,
  amount: number,
  event_creator: HexString,
  event_description: String,
  event_options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::predict_event`,
    type_arguments: [type_arguments],
    arguments: [
      option,
      amount,
      event_creator,
      `${event_description}?#(${type_arguments})`,
      event_options,
    ],
  };
  return signAndSubmitTransactionCallback(payload);
};

const surveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  option: string,
  event_creator: HexString,
  event_description: String,
  event_options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::survey_event`,
    type_arguments: [type_arguments],
    arguments: [option, event_creator, `${event_description}?#(${type_arguments})`, event_options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const surveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  option: string,
  amount: number,
  event_creator: HexString,
  event_description: String,
  event_options: string[],
  token_creator: HexString,
  collection: string,
  token_name: string,
  token_version: number
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::survey_nft_event`,
    type_arguments: [],
    arguments: [
      option,
      amount,
      event_creator,
      event_description,
      event_options,
      token_creator,
      collection,
      token_name,
      token_version,
    ],
  };
  return signAndSubmitTransactionCallback(payload);
};

const redeemPredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  name: string,
  amount: number,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::redeem_predict_event`,
    type_arguments: [type_arguments],
    arguments: [RESOURCE_ADDRESS[chainID], COLLECTION[chainID], name, amount],
  };
  return signAndSubmitTransactionCallback(payload);
};

const redeemSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  name: string,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::redeem_survey_event`,
    type_arguments: [type_arguments],
    arguments: [RESOURCE_ADDRESS[chainID], COLLECTION[chainID], name],
  };
  return signAndSubmitTransactionCallback(payload);
};

const redeemSurveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  name: string,
  amount: number
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::redeem_survey_nft_event`,
    type_arguments: [],
    arguments: [RESOURCE_ADDRESS[chainID], COLLECTION[chainID], name, amount],
  };
  return signAndSubmitTransactionCallback(payload);
};

const finalizePredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[],
  outcomes: number[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::finalize_predict_event`,
    type_arguments: [type_arguments],
    arguments: [`${description}?#(${type_arguments})`, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};

const finalizeSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[],
  outcomes: number[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::finalize_survey_event`,
    type_arguments: [type_arguments],
    arguments: [`${description}?#(${type_arguments})`, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};

const finalizeSurveyNFtEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[],
  outcomes: number[]
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::finalize_survey_nft_event`,
    type_arguments: [],
    arguments: [description, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelPredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::cancel_predict_event`,
    type_arguments: [type_arguments],
    arguments: [`${description}?#(${type_arguments})`, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::cancel_survey_event`,
    type_arguments: [type_arguments],
    arguments: [`${description}?#(${type_arguments})`, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelSurveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  description: string,
  options: string[]
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::cancel_survey_nft_event`,
    type_arguments: [],
    arguments: [description, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const registerCoinType = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${INFORMATION_MODULE}::register_coin_type`,
    type_arguments: [type_arguments],
    arguments: [],
  };
  return signAndSubmitTransactionCallback(payload);
};
export {
  createPredictEvent,
  createSurveyEvent,
  createSurveyNFTEvent,
  predictEvent,
  surveyEvent,
  surveyNFTEvent,
  redeemPredictEvent,
  redeemSurveyEvent,
  redeemSurveyNFTEvent,
  finalizePredictEvent,
  finalizeSurveyNFtEvent,
  cancelPredictEvent,
  cancelSurveyEvent,
  cancelSurveyNFTEvent,
  registerCoinType,
  finalizeSurveyEvent,
};
