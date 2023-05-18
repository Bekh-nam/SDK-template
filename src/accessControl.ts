// import { AptosClient } from "aptos"
import { AptosClient, HexString, Types } from "aptos";
import {
  ACCESS_CONTROL_MODULE,
  APTOS_NODE_URL,
  MOUDLE_ADDRESS,
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
    function: `${
      MOUDLE_ADDRESS[chainID]
    }::${ACCESS_CONTROL_MODULE}::add_member_to_operator_role`,
    type_arguments: [],
    arguments: [member],
  };
  return signAndSubmitTransactionCallback(payload);
};

const getMemberOperatorRole = async (chainId: IChainID["value"]) => {
  const client = new AptosClient(APTOS_NODE_URL[chainId]);
  const { data }: any = await client.getAccountResource(
    MOUDLE_ADDRESS[chainId],
    `${MOUDLE_ADDRESS[chainId]}::access_control::AccessControl`
  );
  const operator = data.role.data.filter(
    (item: any) => item.key === "Operator"
  )[0].value;
  return operator;
};
export { addMemberToOperatorRole, getMemberOperatorRole };
