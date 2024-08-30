export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const clickContractAddress =
  "0x67c97D1FB8184F038592b2109F854dfb09C77C75";

export const clickContractABI = [
  {
    type: "function",
    name: "click",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const collectionAddress = "0xd6915560d3bb24aec04dc42ef409921ed1931510";
export const comment = "testing";
export const mintContractAddress = "0x777777722D078c97c6ad07d9f36801e653E356Ae";
export const mintABI = [
  {
    inputs: [
      { internalType: "address", name: "mintTo", type: "address" },
      { internalType: "uint256", name: "quantity", type: "uint256" },
      { internalType: "address", name: "collection", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "mintReferral", type: "address" },
      { internalType: "string", name: "comment", type: "string" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
export const mintReferral = "0x0000000000000000000000000000000000000000";
export const quantity = "1";
export const tokenId = "1";

export const friendPaymentsABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "AlreadyFriends",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountPerDebtorGreaterThanZero",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotRequestPaymentFromSelf",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "DuplicateFriendRequest",
    type: "error",
  },
  {
    inputs: [],
    name: "FriendRequestMustBeOpenToAccept",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectPaymentAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEthPayment",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidFriendRequestRescind",
    type: "error",
  },
  {
    inputs: [],
    name: "MaximumRequestsOut",
    type: "error",
  },
  {
    inputs: [],
    name: "MustBeFriendsToRemove",
    type: "error",
  },
  {
    inputs: [],
    name: "NoDebtorsProvided",
    type: "error",
  },
  {
    inputs: [],
    name: "NoFriendRequestToReject",
    type: "error",
  },
  {
    inputs: [],
    name: "NotADebtor",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "notFriendAddress",
        type: "address",
      },
    ],
    name: "NotFriends",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "PaymentExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "FriendRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "FriendRequestAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "rejector",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "rejected",
        type: "address",
      },
    ],
    name: "FriendRequestRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "FriendRequestRescinded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "FriendRequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "acceptFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "activeRequestCount",
    outputs: [
      {
        internalType: "uint256",
        name: "requestCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activeRequestCountMax",
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
        name: "newMax",
        type: "uint256",
      },
    ],
    name: "changeActiveRequestCountMax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_paymentId",
        type: "bytes32",
      },
    ],
    name: "expirePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_paymentId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "debtorToPay",
        type: "address",
      },
    ],
    name: "fulfillPayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "generateUniquePaymentID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "isFriendsWithMe",
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
        internalType: "address",
        name: "mainFriend",
        type: "address",
      },
      {
        internalType: "address",
        name: "poi",
        type: "address",
      },
    ],
    name: "isMutualFriends",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "paymentRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "paymentId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "requestor",
        type: "address",
      },
      {
        internalType: "string",
        name: "paymentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amountPerDebtor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalDebtLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
      {
        internalType: "enum FriendPayments.PaymentStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "rejectFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "removeFriend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_debtors",
        type: "address[]",
      },
      {
        internalType: "string",
        name: "_paymentName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amountPerDebtor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expirationTime",
        type: "uint256",
      },
    ],
    name: "requestPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "rescindFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "sendFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
