export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_log_uuid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_prev_owner_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_new_owner_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_date",
        type: "string",
      },
      {
        internalType: "string",
        name: "_query",
        type: "string",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "changeOwner",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_type_of",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phone_no",
        type: "string",
      },
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location_address",
        type: "string",
      },
    ],
    name: "createCustomer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "getCustomer",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "getCustomerProducts",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_manufacturerId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_type_of",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_is_antique",
        type: "bool",
      },
      {
        internalType: "string",
        name: "_ownerId",
        type: "string",
      },
      {
        internalType: "address",
        name: "_manufacturer_address",
        type: "address",
      },
    ],
    name: "registerProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_product_certificates",
        type: "string[]",
      },
    ],
    name: "uploadDocuments",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
