// import { AptosClient } from "aptos"
import { Types } from "aptos";
import { MODULE_ADDRESS, SECONDARY_ACCESS_CONTROL_MODULE } from "./constants";
import { IChainID } from "./types";

const getMemberRole = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  chainId: IChainID["value"]
) => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MODULE_ADDRESS[chainId]}::${SECONDARY_ACCESS_CONTROL_MODULE}::get_role`,
    type_arguments: [],
    arguments: [],
  };
  return signAndSubmitTransactionCallback(payload);
};

export { getMemberRole };
