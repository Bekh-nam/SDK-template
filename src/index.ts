import { HexString, Types } from "aptos";
import { addMemberToOperatorRole } from "./accessControl";
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

  private signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>;

  constructor(
    callBack: (
      transaction: Types.TransactionPayload,
      options?: any
    ) => Promise<any>,
    chainID: IChainID["value"]
  ) {
    this.signAndSubmitTransactionCallback = callBack;
    this.chainID = chainID;
  }

  async addMemberToOperatorRole(member: HexString): Promise<any> {
    return addMemberToOperatorRole(
      this.signAndSubmitTransactionCallback,
      this.chainID,
      member
    );
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
      this.chainID,
      name,
      amount,
      type_arguments
    );
  }

  async redeemSurveyEvent(name: string, type_arguments: string): Promise<any> {
    return redeemSurveyEvent(
      this.signAndSubmitTransactionCallback,
      this.chainID,
      name,
      type_arguments
    );
  }

  async redeemSurveyNFTEvent(name: string, amount: number): Promise<any> {
    return redeemSurveyNFTEvent(
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
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
      this.signAndSubmitTransactionCallback,
      this.chainID,
      description,
      options
    );
  }
}
export { getResource, Constants };
