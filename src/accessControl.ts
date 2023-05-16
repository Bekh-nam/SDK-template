// import { AptosClient } from "aptos"
import { Types } from "aptos";
import { ACCESS_CONTROL_MODULE, MOUDLE_ADDRESS } from "./constants";

const addMemberToOperatorRole = async (
  signAndSubmitTransactionCallback: (
    transaction: Types.TransactionPayload,
    options?: any
  ) => Promise<any>,
  role: string,
  member: string
): Promise<any> => {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${MOUDLE_ADDRESS}::${ACCESS_CONTROL_MODULE}::add_member_to_operator_role`,
    type_arguments: [],
    arguments: [role, member],
  };
  return signAndSubmitTransactionCallback(payload);
};
export { addMemberToOperatorRole };
