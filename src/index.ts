import { Types } from "aptos";
import { addMemberToOperatorRole } from "./accessControl";
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

export default class InformationSDK {
  private chainID: number;

  private signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>;

  constructor(
    callBack: (
      transaction: Types.TransactionPayload,
      options?: any
    ) => Promise<any>,
    chainID: number
  ) {
    this.signAndSubmitTransactionCallback = callBack;
    this.chainID = chainID;
  }

  async addMemberToOperatorRole(role: string, member: string): Promise<any> {
    return addMemberToOperatorRole(
      this.signAndSubmitTransactionCallback,
      role,
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
    event_creator: string,
    event_description: String,
    event_options: string[],
    type_arguments: string
  ): Promise<any> {
    return predictEvent(
      this.signAndSubmitTransactionCallback,
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
    event_creator: string,
    event_description: String,
    event_options: string[],
    type_arguments: string
  ): Promise<any> {
    return surveyEvent(
      this.signAndSubmitTransactionCallback,
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
    event_creator: string,
    event_description: String,
    event_options: string[],
    type_arguments: string,
    token_creator: string,
    collection: string,
    token_name: string,
    token_version: number
  ): Promise<any> {
    return surveyNFTEvent(
      this.signAndSubmitTransactionCallback,
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
      description,
      options,
      outcomes,
      type_arguments
    );
  }

  async finalizeSurveyNFTEvent(
    description: string,
    options: string[],
    outcomes: number[],
    type_arguments: string
  ): Promise<any> {
    return finalizeSurveyNFtEvent(
      this.signAndSubmitTransactionCallback,
      description,
      options,
      outcomes,
      type_arguments
    );
  }

  async redeemPredictEvent(
    creator: string,
    collection: string,
    name: string,
    amount: number,
    type_arguments: string
  ): Promise<any> {
    return redeemPredictEvent(
      this.signAndSubmitTransactionCallback,
      creator,
      collection,
      name,
      amount,
      type_arguments
    );
  }

  async redeemSurveyEvent(
    creator: string,
    collection: string,
    name: string,
    type_arguments: string
  ): Promise<any> {
    return redeemSurveyEvent(
      this.signAndSubmitTransactionCallback,
      creator,
      collection,
      name,
      type_arguments
    );
  }

  async redeemSurveyNFTEvent(
    creator: string,
    collection: string,
    name: string,
    amount: number
  ): Promise<any> {
    return redeemSurveyNFTEvent(
      this.signAndSubmitTransactionCallback,
      creator,
      collection,
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
      description,
      options,
      type_arguments
    );
  }

  async cancelSurveyNFTEvent(
    description: string,
    options: string[],
    type_arguments: string
  ): Promise<any> {
    return cancelSurveyNFTEvent(
      this.signAndSubmitTransactionCallback,
      description,
      options,
      type_arguments
    );
  }
}
