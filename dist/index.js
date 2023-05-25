"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  InformationSDK: () => prediction_default,
  Network: () => Network
});
module.exports = __toCommonJS(src_exports);

// src/resources/prediction/index.ts
var import_ethers2 = require("ethers");

// src/abi/Prediction.ts
var PredictionABI = [
  {
    inputs: [
      { internalType: "address", name: "_proofToken", type: "address" },
      { internalType: "address", name: "_feeRecipient", type: "address" },
      { internalType: "address", name: "_accessControl", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "eventId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "AdditionalRewardEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "uint256", name: "eventId", type: "uint256" }
    ],
    name: "CancelEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "eventId", type: "uint256" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "string", name: "description", type: "string" },
      { indexed: false, internalType: "string[]", name: "_answers", type: "string[]" },
      { indexed: false, internalType: "address", name: "payment", type: "address" },
      { indexed: false, internalType: "uint256", name: "creatorFee", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "startTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "extraTime", type: "uint256" }
    ],
    name: "CreatedEvent",
    type: "event"
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Paused", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "predictor", type: "address" },
      { indexed: true, internalType: "uint256", name: "eventId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "option", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "PredictedEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "predictor", type: "address" },
      { indexed: true, internalType: "uint256", name: "eventId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "option", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "reward", type: "uint256" }
    ],
    name: "RedeemEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "eventId", type: "uint256" },
      { indexed: false, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "uint256[]", name: "outcomes", type: "uint256[]" },
      { indexed: false, internalType: "uint256", name: "creatorFee", type: "uint256" }
    ],
    name: "ResolvedEvent",
    type: "event"
  },
  { anonymous: false, inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }], name: "Unpaused", type: "event" },
  { inputs: [], name: "INVERSE_BASIS_POINT", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "MAX_CREATOR_FEE", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "SERVICE_FEE", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_eventId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" }
    ],
    name: "additionalRewardEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [{ internalType: "uint256", name: "_eventId", type: "uint256" }], name: "cancelEvent", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "string[]", name: "_answers", type: "string[]" },
      { internalType: "address", name: "_payment", type: "address" },
      { internalType: "uint256", name: "_creatorFee", type: "uint256" },
      { internalType: "uint256", name: "_startTime", type: "uint256" },
      { internalType: "uint256", name: "_endTime", type: "uint256" },
      { internalType: "uint256", name: "_extraTime", type: "uint256" }
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { inputs: [], name: "entranceFee", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "_eventId", type: "uint256" }],
    name: "eventDetail",
    outputs: [
      {
        components: [
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string[]", name: "answers", type: "string[]" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "address", name: "payment", type: "address" },
          { internalType: "uint256", name: "reward", type: "uint256" },
          { internalType: "uint256", name: "creatorFee", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "endTime", type: "uint256" },
          { internalType: "uint256", name: "extraTime", type: "uint256" },
          { internalType: "uint256[]", name: "outcomes", type: "uint256[]" }
        ],
        internalType: "struct PredictionCollateral.Event",
        name: "_event",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "extraReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "feeRecipient", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "metaspacecyAccessControls", outputs: [{ internalType: "contract MetaspacecyAccessControls", name: "", type: "address" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "paused", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_eventId", type: "uint256" },
      { internalType: "uint256", name: "_option", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" }
    ],
    name: "predictEvent",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { inputs: [], name: "proofTokens", outputs: [{ internalType: "contract IProofTokens", name: "", type: "address" }], stateMutability: "view", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_eventId", type: "uint256" },
      { internalType: "uint256", name: "_option", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" }
    ],
    name: "redeemEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_eventId", type: "uint256" },
      { internalType: "uint256[]", name: "_outcomes", type: "uint256[]" }
    ],
    name: "resolveEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "totalEvent", outputs: [{ internalType: "uint256", name: "total", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }], name: "updateEntranceFee", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "address", name: "_recepient", type: "address" }], name: "updateFeeRecipient", outputs: [], stateMutability: "nonpayable", type: "function" }
];

// src/constant.ts
var PREDICTION_ADDRESS = {
  97: "0x34183b75A30fFA12ee5c0d97F951F6e7F468Cd22",
  56: ""
};
var ADMIN_VIRTUAL_ADDRESS = {
  97: "0xF31eE0EaeA33c9792b20959bf79e5CF6F40867Db",
  56: ""
};
var NATIVE_ADDRESS = "0x0000000000000000000000000000000000000000";

// src/resources/access/adminVirtual.ts
var import_ethers = require("ethers");

// src/abi/AdminVirtual.ts
var AdminVirtualAbi = [
  { inputs: [{ internalType: "address", name: "accessControl", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "hasOperator",
    outputs: [{ internalType: "bool", name: "isOperator", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "metaspacecyAccessControls", outputs: [{ internalType: "contract MetaspacecyAccessControls", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "registerOperator", outputs: [], stateMutability: "nonpayable", type: "function" }
];

// src/resources/access/adminVirtual.ts
var AdminVirtual = class {
  constructor(signer, network) {
    this.contract = new import_ethers.Contract(ADMIN_VIRTUAL_ADDRESS[network], AdminVirtualAbi, signer);
  }
  async registerOperator() {
    const tx = await this.contract.registerOperator();
    const { from, transactionHash } = await tx.wait();
    return {
      operator: from,
      txHash: transactionHash
    };
  }
};

// src/abi/ERC20.ts
var Erc20Abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/resources/prediction/index.ts
var InformationSDK = class {
  constructor(providerOrSigner, network) {
    const provider = providerOrSigner instanceof import_ethers2.providers.Provider ? providerOrSigner : providerOrSigner.provider;
    this.signer = providerOrSigner._isSigner ? providerOrSigner : void 0;
    if (!provider) {
      throw new Error("Either a provider or custom signer with provider must be provided");
    }
    this.provider = provider;
    this.network = network;
    this.contract = new import_ethers2.Contract(PREDICTION_ADDRESS[network], PredictionABI, this.provider);
  }
  async getEntranceFee() {
    const feeWei = await this.contract.entranceFee();
    return +import_ethers2.ethers.utils.formatEther(feeWei);
  }
  async getServiceFeePercent() {
    const percent = await this.contract.SERVICE_FEE();
    return +percent.toString();
  }
  async getTotalEvent() {
    const total = await this.contract.totalEvent();
    return +total.toString();
  }
  async getEventDetail(eventId) {
    const { description, answers, creator, payment, reward, creatorFee, startTime, endTime, extraTime, outcomes } = await this.contract.eventDetail(eventId);
    return {
      description,
      answers,
      creator,
      payment,
      reward,
      creatorFee: +creatorFee.toString(),
      startTime: +startTime.toString(),
      endTime: +endTime.toString(),
      extraTime: +extraTime.toString(),
      outcomes: outcomes.map((o) => +o.toString())
    };
  }
  async registerOperator() {
    const adminVirtual = new AdminVirtual(this._getSigner(), this.network);
    return await adminVirtual.registerOperator();
  }
  async createEvent(description, answers, payment, creatorFee, startTime, endTime, extraTime, accountAddress) {
    var _a;
    const signer = this._getSigner(accountAddress);
    const entranceFee = await this.contract.entranceFee();
    const tx = await this.contract.connect(signer).createEvent(description, answers, payment, creatorFee, startTime, endTime, extraTime, { value: entranceFee });
    const { logs, transactionHash } = await tx.wait();
    return {
      description,
      answers,
      creator: await signer.getAddress(),
      payment,
      creatorFee,
      startTime,
      endTime,
      extraTime,
      txHash: transactionHash,
      eventId: parseInt((_a = logs[0]) == null ? void 0 : _a.topics[1], 16)
    };
  }
  async predictEvent(eventId, option, amount, accountAddress) {
    const signer = this._getSigner(accountAddress);
    const event = await this.getEventDetail(eventId);
    const amountWei = await this._parseAmountToWei(event.payment, amount);
    let dataTx;
    if (event.payment === NATIVE_ADDRESS) {
      let tx = await this.contract.connect(signer).predictEvent(eventId, option, 0, { value: amountWei });
      dataTx = await tx.wait();
    } else {
      let tx = await this.contract.connect(signer).predictEvent(eventId, option, amountWei, { value: 0 });
      dataTx = await tx.wait();
    }
    const { transactionHash } = dataTx;
    return {
      predictor: await signer.getAddress(),
      eventId,
      option,
      amount: amountWei,
      txHash: transactionHash
    };
  }
  async resolveEvent(eventId, outcomes, accountAddress) {
    const signer = this._getSigner(accountAddress);
    const tx = await this.contract.connect(signer).resolveEvent(
      eventId,
      outcomes.map((o) => o * 100)
    );
    const { transactionHash } = await tx.wait();
    return {
      creator: await signer.getAddress(),
      eventId,
      outcomes,
      txHash: transactionHash
    };
  }
  async redeemEvent(eventId, option, amount, accountAddress) {
    const signer = this._getSigner(accountAddress);
    const event = await this.getEventDetail(eventId);
    const amountWei = await this._parseAmountToWei(event.payment, amount);
    const tx = await this.contract.connect(signer).redeemEvent(eventId, option, amountWei);
    const { transactionHash } = await tx.wait();
    return {
      predictor: await signer.getAddress(),
      eventId,
      option,
      amount: amountWei,
      txHash: transactionHash
    };
  }
  async cancelEvent(eventId, accountAddress) {
    const signer = this._getSigner(accountAddress);
    const tx = await this.contract.connect(signer).cancelEvent(eventId);
    const { transactionHash } = await tx.wait();
    return {
      creator: await signer.getAddress(),
      eventId,
      txHash: transactionHash
    };
  }
  async updateEntranceFee(amount, accountAddress) {
    const signer = this._getSigner(accountAddress);
    const tx = await this.contract.connect(signer).updateEntranceFee(amount);
    const { transactionHash } = await tx.wait();
    return transactionHash;
  }
  getSigner(accountAddress) {
    if (this.signer) {
      return this.signer;
    }
    if (!(this.provider instanceof import_ethers2.providers.JsonRpcProvider)) {
      throw new Error("Either signer or a JsonRpcProvider must be provided");
    }
    return this.provider.getSigner(accountAddress);
  }
  _getSigner(accountAddress) {
    if (this.signer) {
      return this.signer;
    }
    if (!(this.provider instanceof import_ethers2.providers.JsonRpcProvider)) {
      throw new Error("Either signer or a JsonRpcProvider must be provided");
    }
    return this.provider.getSigner(accountAddress);
  }
  async _parseAmountToWei(addressToken, amount) {
    if (addressToken === NATIVE_ADDRESS) {
      return import_ethers2.ethers.utils.parseUnits(amount.toString(), 18);
    } else {
      const token = new import_ethers2.Contract(addressToken, Erc20Abi, this.provider);
      let decimal = await token.decimals();
      return import_ethers2.ethers.utils.parseUnits(amount.toString(), decimal);
    }
  }
};
var prediction_default = InformationSDK;

// src/types.ts
var Network = /* @__PURE__ */ ((Network2) => {
  Network2[Network2["bnbTestnet"] = 97] = "bnbTestnet";
  Network2[Network2["bnbMainnet"] = 56] = "bnbMainnet";
  return Network2;
})(Network || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InformationSDK,
  Network
});
//# sourceMappingURL=index.js.map