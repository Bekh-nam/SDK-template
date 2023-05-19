// import { AptosClient } from "aptos"
import { HexString, Types } from "aptos";
import {
  ACCESS_CONTROL_MODULE,
  MOUDLE_ADDRESS,
  SECONDARY_ACCESS_CONTROL_MODULE,
} from "./constants";
import { IChainID } from "./types";

const addMemberToOperatorRole = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainID: IChainID["value"],
  member: HexString
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainID]}::${ACCESS_CONTROL_MODULE}::add_member_to_operator_role`,
    type_arguments: [],
    arguments: [member],
  };
  return signAndSubmitTransactionCallback(payload);
};

const getMemberRole = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainId: IChainID["value"]
) => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS[chainId]}::${SECONDARY_ACCESS_CONTROL_MODULE}::get_role`,
    type_arguments: [],
    arguments: [],
  };
  return signAndSubmitTransactionCallback(payload);
};

export { addMemberToOperatorRole, getMemberRole };
