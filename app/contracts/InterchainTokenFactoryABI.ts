const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "interchainTokenService_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "GatewayToken",
    type: "error",
  },
  { inputs: [], name: "InvalidChainName", type: "error" },
  { inputs: [], name: "InvalidCodeHash", type: "error" },
  { inputs: [], name: "InvalidImplementation", type: "error" },
  { inputs: [], name: "InvalidOwner", type: "error" },
  { inputs: [], name: "InvalidOwnerAddress", type: "error" },
  { inputs: [], name: "MulticallFailed", type: "error" },
  {
    inputs: [{ internalType: "address", name: "minter", type: "address" }],
    name: "NotMinter",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "NotOperator",
    type: "error",
  },
  { inputs: [], name: "NotOwner", type: "error" },
  { inputs: [], name: "NotProxy", type: "error" },
  { inputs: [], name: "SetupFailed", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "canonicalInterchainTokenId",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "chainNameHash_", type: "bytes32" },
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "canonicalInterchainTokenSalt",
    outputs: [{ internalType: "bytes32", name: "salt", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "chainNameHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint8", name: "decimals", type: "uint8" },
      { internalType: "uint256", name: "initialSupply", type: "uint256" },
      { internalType: "address", name: "minter", type: "address" },
    ],
    name: "deployInterchainToken",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "originalChain", type: "string" },
      {
        internalType: "address",
        name: "originalTokenAddress",
        type: "address",
      },
      { internalType: "string", name: "destinationChain", type: "string" },
      { internalType: "uint256", name: "gasValue", type: "uint256" },
    ],
    name: "deployRemoteCanonicalInterchainToken",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "originalChainName", type: "string" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "address", name: "minter", type: "address" },
      { internalType: "string", name: "destinationChain", type: "string" },
      { internalType: "uint256", name: "gasValue", type: "uint256" },
    ],
    name: "deployRemoteInterchainToken",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "gateway",
    outputs: [
      { internalType: "contract IAxelarGateway", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      { internalType: "address", name: "implementation_", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "interchainTokenAddress",
    outputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "interchainTokenId",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "chainNameHash_", type: "bytes32" },
      { internalType: "address", name: "deployer", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "interchainTokenSalt",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "interchainTokenService",
    outputs: [
      {
        internalType: "contract IInterchainTokenService",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "owner_", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "owner_", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "proposeOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "registerCanonicalInterchainToken",
    outputs: [{ internalType: "bytes32", name: "tokenId", type: "bytes32" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "setup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      {
        internalType: "bytes32",
        name: "newImplementationCodeHash",
        type: "bytes32",
      },
      { internalType: "bytes", name: "params", type: "bytes" },
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default abi;
