export const AdminVirtualAbi = [
	{ inputs: [{ internalType: "address", name: "accessControl", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
	{
		inputs: [{ internalType: "address", name: "addr", type: "address" }],
		name: "hasOperator",
		outputs: [{ internalType: "bool", name: "isOperator", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{ inputs: [], name: "metaspacecyAccessControls", outputs: [{ internalType: "contract MetaspacecyAccessControls", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "registerOperator", outputs: [], stateMutability: "nonpayable", type: "function" },
];
