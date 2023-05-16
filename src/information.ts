import { Types } from "aptos";
import { INFORMATION_MODULE, MOUDLE_ADDRESS } from "./constants";

const createPredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
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
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::create_predict_event`,
    type_arguments: [type_arguments],
    arguments: [description, uri, options, start_time, end_time, payout_time],
  };
  return signAndSubmitTransactionCallback(payload);
};

const createSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
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
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::create_survey_event`,
    type_arguments: [type_arguments],
    arguments: [
      description,
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
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::create_survey_nft_event`,
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
  option: string,
  amount: number,
  event_creator: string,
  event_description: String,
  event_options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::predict_event`,
    type_arguments: [type_arguments],
    arguments: [
      option,
      amount,
      event_creator,
      event_description,
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
  option: string,
  event_creator: string,
  event_description: String,
  event_options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::survey_event`,
    type_arguments: [type_arguments],
    arguments: [option, event_creator, event_description, event_options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const surveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  option: string,
  amount: number,
  event_creator: string,
  event_description: String,
  event_options: string[],
  token_creator: string,
  collection: string,
  token_name: string,
  token_version: number
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::survey_nft_event`,
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
  creator: string,
  collection: string,
  name: string,
  amount: number,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::redeem_predict_event`,
    type_arguments: [type_arguments],
    arguments: [creator, collection, name, amount],
  };
  return signAndSubmitTransactionCallback(payload);
};

const redeemSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  creator: string,
  collection: string,
  name: string,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::redeem_survey_event`,
    type_arguments: [type_arguments],
    arguments: [creator, collection, name],
  };
  return signAndSubmitTransactionCallback(payload);
};

const redeemSurveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  creator: string,
  collection: string,
  name: string,
  amount: number
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::redeem_survey_nft_event`,
    type_arguments: [],
    arguments: [creator, collection, name, amount],
  };
  return signAndSubmitTransactionCallback(payload);
};

const finalizePredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  outcomes: number[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::finalize_predict_event`,
    type_arguments: [type_arguments],
    arguments: [description, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};

const finalizeSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  outcomes: number[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::finalize_survey_event`,
    type_arguments: [type_arguments],
    arguments: [description, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};


const finalizeSurveyNFtEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  outcomes: number[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::finalize_survey_event`,
    type_arguments: [type_arguments],
    arguments: [description, options, outcomes],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelPredictEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::cancel_predict_event`,
    type_arguments: [type_arguments],
    arguments: [description, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelSurveyEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::cancel_survey_event`,
    type_arguments: [type_arguments],
    arguments: [description, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const cancelSurveyNFTEvent = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  description: string,
  options: string[],
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::cancel_survey_nft_event`,
    type_arguments: [type_arguments],
    arguments: [description, options],
  };
  return signAndSubmitTransactionCallback(payload);
};

const registerCoinType = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  type_arguments: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[2]}::${INFORMATION_MODULE}::register_coin_type`,
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
