import {
  AptosAccount,
  AptosClient,
  HexString,
  TransactionBuilderRemoteABI,
  Types,
} from "aptos";
import _, { isString } from "lodash";
import { getMemberRole } from "./accessControl";
import * as getResource from "./getResource";
import * as services from "./services";
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

  private privateKey?: HexString;

  private responseField?: string[];

  private signAndSubmitTransactionCallback?: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>;

  // ChainID of the network used by the user
  // responseField is an array of values that the user wants to return after using the signAndSubmitTransaction function
  // example ["hash"] => result {hash: ...}
  // callBack: is signAndSubmitTransaction function of wallet adapter
  // if you don't have wallet adapter you can use private key
  constructor(
    chainID: IChainID["value"],
    callBack?:
      | ((transaction: Types.TransactionPayload, options?: any) => Promise<any>)
      | string,
    responseField?: string[]
  ) {
    if (isString(callBack)) {
      this.privateKey = new HexString(callBack);
    } else {
      this.signAndSubmitTransactionCallback = callBack;
    }

    this.chainID = chainID;
    this.responseField = responseField;
  }

  signAndSubmitTransaction = async (
    transaction: any,
    options?: any
  ): Promise<any> => {
    let result;
    if (this.privateKey) {
      const aptosClient = new AptosClient(
        Constants.APTOS_NODE_URL[this.chainID]
      );

      const sender = new AptosAccount(this.privateKey.toUint8Array());
      const builder = new TransactionBuilderRemoteABI(aptosClient, {
        sender: sender.address(),
        ...options,
      });
      const rawTxn = await builder.build(
        transaction.function,
        transaction.type_arguments,
        transaction.arguments
      );
      const sign = await aptosClient.signTransaction(sender, rawTxn);
      result = await aptosClient.submitTransaction(sign);
    } else if (this.signAndSubmitTransactionCallback) {
      result = await this.signAndSubmitTransactionCallback(
        transaction,
        options
      );
    }
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

  // description: The event description has a data type of string.
  // uri: The event media
  // options: The event options has a data type of array.
  // startTime: The event start time
  // endTime: The event end time
  // payoutTime: The redemption time for users after the event ends
  // coinType: The event coin type
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

  // description: The event description has a data type of string.
  // uri: The event media
  // reward: The event reward
  // options: The event options has a data type of array.
  // startTime: The event start time
  // endTime: The event end time
  // payoutTime: The redemption time for users after the event ends
  // coinType: The event coin type
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

  // description: The event description has a data type of string.
  // collection: The event collection name
  // uri: The event media
  // options: The event options has a data type of array.
  // startTime: The event start time
  // endTime: The event end time
  // payoutTime: The redemption time for users after the event ends
  // coinType: The event coin type
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

  // option: your option
  // amount: Number of options
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

  // option: your option
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

  // option: your option
  // amount: Number of options
  // token_creator: token creator
  // collection: token collection
  // token_name: token name
  // token_version: token properties version
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

  // The length of outcomes must be equal to the length of options.
  // outcomes is an array of numbers
  // outcomes is the event result
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

  // The length of outcomes must be equal to the length of options.
  // outcomes is an array of numbers
  // outcomes is the event result
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

  // The length of outcomes must be equal to the length of options.
  // outcomes is an array of numbers
  // outcomes is the event result
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

  // name is the name of the token that users receive when they make a prediction
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

  // name is the name of the token that users receive when they make a prediction
  async redeemSurveyEvent(name: string, type_arguments: string): Promise<any> {
    return redeemSurveyEvent(
      this.signAndSubmitTransaction,
      this.chainID,
      name,
      type_arguments
    );
  }

  // name is the name of the token that users receive when they make a prediction
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
export { getResource, Constants, services };
