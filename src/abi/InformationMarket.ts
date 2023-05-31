export const informationMarketAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_metaspacecyAccessControls",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_entryFee",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_serviceFee",
				type: "uint256",
			},
			{
				internalType: "address payable",
				name: "_beneficiary",
				type: "address",
			},
			{
				internalType: "address[]",
				name: "_eventTypes",
				type: "address[]",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "eventType",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
		],
		name: "EventTypeAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "eventType",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
		],
		name: "EventTypeRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "eventType",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
		],
		name: "EventTypeReplaced",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "eventType",
				type: "address",
			},
		],
		name: "addEventType",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes",
			},
		],
		name: "createEvent",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getBeneficiary",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getEntryFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "eventType",
				type: "uint256",
			},
		],
		name: "getEventTypeInfo",
		outputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getServiceFee",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "marketFee",
		outputs: [
			{
				internalType: "uint256",
				name: "entryFee",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "serviceFee",
				type: "uint256",
			},
			{
				internalType: "address payable",
				name: "beneficiary",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "metaspacecyAccessControls",
		outputs: [
			{
				internalType: "contract MetaspacecyAccessControls",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "pauseIM",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
		],
		name: "removeEventType",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "typeId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "eventType",
				type: "address",
			},
		],
		name: "replaceEventType",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "beneficiary",
				type: "address",
			},
		],
		name: "setBeneficiary",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "entryFee",
				type: "uint256",
			},
		],
		name: "setEntryFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "serviceFee",
				type: "uint256",
			},
		],
		name: "setServiceFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "unpauseIM",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
