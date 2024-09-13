"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { isAddress, getAddress } from "viem";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  friendPaymentsABI,
  friend_payments_contract_address,
} from "src/constants";
import { formatEther, createPublicClient, http } from "viem";
import { getExplorerUrl } from "src/utils"; // Import the new function
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { baseSepolia } from "viem/chains";
import { isWalletACoinbaseSmartWallet } from "@coinbase/onchainkit/wallet";
import { UserOperation } from "permissionless";
import {
  NEXT_PUBLIC_CDP_PAYMASTER,
  NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL,
} from "src/config";

interface Recipient {
  address: string;
  amount: string;
}

export default function SendArbitraryPayment() {
  const { chainId, address } = useAccount();

  const {
    data: hash,
    writeContractAsync,
    isPending: isConfirming,
  } = useWriteContract();

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
  }) as any;

  const { writeContractsAsync, data: userOpId } = useWriteContracts();

  const { data: availableCapabilities } = useCapabilities({
    account: address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !chainId) return {};
    const capabilitiesForChain = availableCapabilities[chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: NEXT_PUBLIC_CDP_PAYMASTER,
        },
      };
    }
    return {};
  }, [availableCapabilities, chainId]);

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [paymentName, setPaymentName] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: "", amount: "" },
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [totalWei, setTotalWei] = useState<bigint>(0n);
  const [totalEth, setTotalEth] = useState<string>("0");

  useEffect(() => {
    const newTotalWei = recipients.reduce(
      (sum, r) => sum + (r.amount ? BigInt(r.amount) : 0n),
      0n
    );
    setTotalWei(newTotalWei);
    setTotalEth(formatEther(newTotalWei));
  }, [recipients]);

  const addRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (
    index: number,
    field: keyof Recipient,
    value: string
  ) => {
    const updatedRecipients = recipients.map((recipient, i) =>
      i === index ? { ...recipient, [field]: value } : recipient
    );
    setRecipients(updatedRecipients);
  };

  const validateInputs = (): boolean => {
    const newErrors: string[] = [];

    if (!paymentName.trim()) {
      newErrors.push("Payment name is required");
    }

    recipients.forEach((recipient, index) => {
      if (!isAddress(recipient.address)) {
        newErrors.push(`Recipient ${index + 1} has an invalid address`);
      }
      if (!recipient.amount || BigInt(recipient.amount) <= 0n) {
        newErrors.push(`Recipient ${index + 1} has an invalid amount`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSendPayment = async () => {
    if (!validateInputs()) return;

    const recipientAddresses = recipients.map((r) => getAddress(r.address));
    const amounts = recipients.map((r) => BigInt(r.amount));

    try {
      const userOperation = { sender: address } as UserOperation<"v0.6">;
      const isSmartWalletFunc = await isWalletACoinbaseSmartWallet({
        client: publicClient,
        userOp: userOperation,
      });
      if (isSmartWalletFunc.isCoinbaseSmartWallet) {
        const contracts = [
          {
            address: getAddress(friend_payments_contract_address),
            abi: friendPaymentsABI,
            functionName: "sendArbitraryPayment",
            args: [paymentName, recipientAddresses, amounts],
            value: totalWei,
          },
        ];
        await writeContractsAsync({
          contracts,
          capabilities,
        });
        console.log("The sender address is a valid smart wallet proxy.");
      } else {
        await writeContractAsync({
          address: getAddress(friend_payments_contract_address),
          abi: friendPaymentsABI,
          functionName: "sendArbitraryPayment",
          args: [paymentName, recipientAddresses, amounts],
          value: totalWei,
        });
      }
    } catch (error) {
      console.error("Error sending payment:", error);
      setErrors(["Failed to send payment. Please try again."]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Send Payment</h3>

      <input
        type="text"
        value={paymentName}
        onChange={(e) => setPaymentName(e.target.value)}
        placeholder="Payment Name"
        className="w-full p-2 border rounded mb-4"
      />

      <div className="max-h-60 overflow-y-auto mb-4">
        {recipients.map((recipient, index) => (
          <div key={index} className="mb-2">
            <div className="flex mb-1">
              <input
                type="text"
                value={recipient.address}
                onChange={(e) =>
                  updateRecipient(index, "address", e.target.value)
                }
                placeholder="Address"
                className="flex-grow p-2 border rounded-l text-sm"
              />
              <input
                type="number"
                value={recipient.amount}
                onChange={(e) =>
                  updateRecipient(index, "amount", e.target.value)
                }
                placeholder="Wei"
                className="w-1/3 p-2 border-t border-b border-r rounded-r text-sm"
                step="1"
              />
              {recipients.length > 1 && (
                <button
                  onClick={() => removeRecipient(index)}
                  className="ml-1 text-red-500"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            {recipient.amount && (
              <p className="text-xs text-gray-500">
                ≈ {formatEther(BigInt(recipient.amount))} ETH
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addRecipient}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <PlusIcon className="h-5 w-5 mr-1" />
        Add Recipient
      </button>

      {errors.length > 0 && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 rounded text-sm">
          {errors.map((error, index) => (
            <p key={index} className="text-red-700">
              {error}
            </p>
          ))}
        </div>
      )}

      <div className="mb-4 text-sm">
        <p>Total: {totalWei.toString()} wei</p>
        <p className="text-gray-600">≈ {totalEth} ETH</p>
      </div>
      {hash && (
        <div className="mb-2">
          Transaction Hash:{" "}
          <a
            href={getExplorerUrl(hash, chainId || 84532)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {hash}
          </a>
        </div>
      )}
      {userOpId && (
        <div className="mb-2">
          UserOp ID:{" "}
          <a
            href={`https://jiffyscan.xyz/userOpHash/${userOpId.slice(0, 66)}?network=base-sepolia`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {userOpId.slice(0, 66)}
          </a>
        </div>
      )}
      {isConfirming && (
        <div className="text-yellow-500 mb-2">Waiting for confirmation...</div>
      )}
      {isConfirmed && (
        <div className="text-green-500 mb-2">Transaction confirmed.</div>
      )}
      <button
        onClick={handleSendPayment}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        disabled={isConfirming}
      >
        {isConfirming ? "Processing..." : "Send Payment"}
      </button>
    </div>
  );
}
