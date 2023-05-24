import { HexString, Types } from "aptos";
import _ from "lodash";
import { getMemberRole } from "./accessControl";
import * as getResource from "./getResource";
import {
  cancelPredictEvent,
  cancelSurveyEvent,
  cancelSurveyNFTEvent,
  createPredictEvent,
  createSurveyEvent,
  createSurveyNFTEvent,
  finalizePredictEvent,
  finalizeSurveyEvent,
  finalizeSurveyNFtEvent,
  predictEvent,
  redeemPredictEvent,
  redeemSurveyEvent,
  redeemSurveyNFTEvent,
  surveyEvent,
  surveyNFTEvent,
} from "./information";
import { IChainID } from "./types";
import * as Constants from "./constants";

export default class InformationSDK {
  private chainID: IChainID["value"];

  private responseField?: string[];

  private signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>;

  constructor(
    callBack: (
      transaction: Types.TransactionPayload,
      options?: any
    ) => Promise<any>,
    chainID: IChainID["value"],
    responseField?: string[]
  ) {
    this.signAndSubmitTransactionCallback = callBack;
    this.chainID = chainID;
    this.responseField = responseField;
  }

  signAndSubmitTransaction = async (
    transaction: Types.TransactionPayload,
    options?: any
  ): Promise<any> => {
    const result = await this.signAndSubmitTransaction(transaction, options);
    if (this.responseField) {
      return _.reduce(
        result,
        (_result: any, value: any, key: string) => {
          if (this.responseField?.includes(key)) {
            return {
              ..._result,
              [key]: value,
            };
          }
          return _result;
        },
        {}
      );
    }
    return result;
  };

  async getOperatorRole(): Promise<any> {
    return getMemberRole(this.signAndSubmitTransaction, this.chainID);
  }

  async createPredictEvent(
    description: string,
    uri: string,
    options: string[],
    start_time: number,
    end_time: number,
    payout_time: number,
    type_arguments: string
  ): Promise<any> {
    return createPredictEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      uri,
      options,
      start_time,
      end_time,
      payout_time,
      type_arguments
    );
  }

  async createSuyveyEvent(
    description: string,
    uri: string,
    reward: number,
    options: string[],
    start_time: number,
    end_time: number,
    payout_time: number,
    type_arguments: string
  ): Promise<any> {
    return createSurveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      uri,
      reward,
      options,
      start_time,
      end_time,
      payout_time,
      type_arguments
    );
  }

  async createSuyveyNFTEvent(
    description: string,
    collection: string,
    uri: string,
    options: string[],
    start_time: number,
    end_time: number,
    payout_time: number
  ): Promise<any> {
    return createSurveyNFTEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      collection,
      uri,
      options,
      start_time,
      end_time,
      payout_time
    );
  }

  async predictEvent(
    option: string,
    amount: number,
    event_creator: HexString,
    event_description: String,
    event_options: string[],
    type_arguments: string
  ): Promise<any> {
    return predictEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      option,
      amount,
      event_creator,
      event_description,
      event_options,
      type_arguments
    );
  }

  async surveyEvent(
    option: string,
    event_creator: HexString,
    event_description: String,
    event_options: string[],
    type_arguments: string
  ): Promise<any> {
    return surveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      option,
      event_creator,
      event_description,
      event_options,
      type_arguments
    );
  }

  async surveyNFTEvent(
    option: string,
    amount: number,
    event_creator: HexString,
    event_description: String,
    event_options: string[],
    token_creator: HexString,
    collection: string,
    token_name: string,
    token_version: number
  ): Promise<any> {
    return surveyNFTEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      option,
      amount,
      event_creator,
      event_description,
      event_options,
      token_creator,
      collection,
      token_name,
      token_version
    );
  }

  async finalizePredictEvent(
    description: string,
    options: string[],
    outcomes: number[],
    type_arguments: string
  ): Promise<any> {
    return finalizePredictEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options,
      outcomes,
      type_arguments
    );
  }

  async finalizeSurveyEvent(
    description: string,
    options: string[],
    outcomes: number[],
    type_arguments: string
  ): Promise<any> {
    return finalizeSurveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options,
      outcomes,
      type_arguments
    );
  }

  async finalizeSurveyNFTEvent(
    description: string,
    options: string[],
    outcomes: number[]
  ): Promise<any> {
    return finalizeSurveyNFtEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options,
      outcomes
    );
  }

  async redeemPredictEvent(
    name: string,
    amount: number,
    type_arguments: string
  ): Promise<any> {
    return redeemPredictEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      name,
      amount,
      type_arguments
    );
  }

  async redeemSurveyEvent(name: string, type_arguments: string): Promise<any> {
    return redeemSurveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      name,
      type_arguments
    );
  }

  async redeemSurveyNFTEvent(name: string, amount: number): Promise<any> {
    return redeemSurveyNFTEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      name,
      amount
    );
  }

  async cancelPredictEvent(
    description: string,
    options: string[],
    type_arguments: string
  ): Promise<any> {
    return cancelPredictEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options,
      type_arguments
    );
  }

  async cancelSurveyEvent(
    description: string,
    options: string[],
    type_arguments: string
  ): Promise<any> {
    return cancelSurveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options,
      type_arguments
    );
  }

  async cancelSurveyNFTEvent(
    description: string,
    options: string[]
  ): Promise<any> {
    return cancelSurveyNFTEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      description,
      options
    );
  }
}
export { getResource, Constants };
