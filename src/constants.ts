export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const friend_payments_contract_address =
  "0x1f4c0976c1610799e3133de9ee1f4ed2335c81a0";

export const friendPaymentsABI = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptFriendRequest",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "activeRequestCount",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "requestCount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "activeRequestCountMax",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "changeActiveRequestCountMax",
    inputs: [
      {
        name: "newMax",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "expirePayment",
    inputs: [
      {
        name: "_paymentId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "friendships",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
      {
        name: "friendaddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum FriendPayments.FriendshipStatus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fulfillPayment",
    inputs: [
      {
        name: "_paymentId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "debtorToPay",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "generateUniquePaymentID",
    inputs: [
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getFriendshipStatus",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
      {
        name: "friend",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isFriendsWithMe",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isMutualFriends",
    inputs: [
      {
        name: "mainFriend",
        type: "address",
        internalType: "address",
      },
      {
        name: "poi",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paymentRequests",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "paymentId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "requestor",
        type: "address",
        internalType: "address",
      },
      {
        name: "paymentName",
        type: "string",
        internalType: "string",
      },
      {
        name: "amountPerDebtor",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalDebtLeft",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "expirationTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "status",
        type: "uint8",
        internalType: "enum FriendPayments.PaymentStatus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rejectFriendRequest",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeFriend",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestPayment",
    inputs: [
      {
        name: "_debtors",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_paymentName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_amountPerDebtor",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_expirationTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rescindFriendRequest",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendArbitraryPayment",
    inputs: [
      {
        name: "_paymentName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_debtors",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "sendFriendRequest",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ArbitraryPaymentSent",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "debtor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "paymentName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendRemoved",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendRequestAccepted",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendRequestRejected",
    inputs: [
      {
        name: "rejector",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "rejected",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendRequestRescinded",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FriendRequestSent",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PaymentRequested",
    inputs: [
      {
        name: "uniqueId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "requestor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "debtors",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "paymentName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlreadyFriends",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AmountPerDebtorGreaterThanZero",
    inputs: [],
  },
  {
    type: "error",
    name: "CannotRequestPaymentFromSelf",
    inputs: [],
  },
  {
    type: "error",
    name: "DuplicateFriendRequest",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "FriendRequestMustBeOpenToAccept",
    inputs: [],
  },
  {
    type: "error",
    name: "IncorrectPaymentAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEthPayment",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidFriendRequestRescind",
    inputs: [],
  },
  {
    type: "error",
    name: "MaximumRequestsOut",
    inputs: [],
  },
  {
    type: "error",
    name: "MustBeFriendsToRemove",
    inputs: [],
  },
  {
    type: "error",
    name: "NoDebtorsProvided",
    inputs: [],
  },
  {
    type: "error",
    name: "NoFriendRequestToReject",
    inputs: [],
  },
  {
    type: "error",
    name: "NotADebtor",
    inputs: [],
  },
  {
    type: "error",
    name: "NotFriends",
    inputs: [
      {
        name: "notFriendAddress",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "PaymentExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
] as const;
