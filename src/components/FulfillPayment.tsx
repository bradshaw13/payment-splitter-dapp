"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { isAddress, getAddress } from "viem";
import { Switch } from "@headlessui/react";
import {
  friendPaymentsABI,
  friend_payments_contract_address,
} from "src/constants";
import { formatEther } from "viem";
import { getExplorerUrl } from "src/utils";

export default function FulfillPayment() {
  const { address, chainId } = useAccount();
  const [paymentId, setPaymentId] = useState("");
  const [debtorToPay, setDebtorToPay] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [payingForSomeoneElse, setPayingForSomeoneElse] = useState(false);
  const [errors, setErrors] = useState({
    paymentId: "",
    amountToPay: "",
    debtorToPay: "",
  });

  const {
    data: hash,
    writeContract,
    isPending: isConfirming,
  } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const validateFulfillPayment = () => {
    let newErrors = { ...errors };
    let isValid = true;

    if (!paymentId.trim()) {
      newErrors.paymentId = "Payment ID is required";
      isValid = false;
    } else {
      newErrors.paymentId = "";
    }

    if (!amountToPay || BigInt(amountToPay) <= BigInt(0)) {
      newErrors.amountToPay = "Amount must be greater than 0 wei";
      isValid = false;
    } else {
      newErrors.amountToPay = "";
    }

    if (payingForSomeoneElse && !isAddress(debtorToPay)) {
      newErrors.debtorToPay = "Invalid Ethereum address";
      isValid = false;
    } else {
      newErrors.debtorToPay = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFulfillPayment = () => {
    if (validateFulfillPayment()) {
      const debtorAddress = payingForSomeoneElse ? debtorToPay : address;
      writeContract({
        address: getAddress(friend_payments_contract_address),
        abi: friendPaymentsABI,
        functionName: "fulfillPayment",
        args: [paymentId, debtorAddress],
        value: BigInt(amountToPay),
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-semibold mb-2">Fulfill Payment</h3>
      <div className="flex items-center mb-2">
        <span className="mr-2">Paying for someone else?</span>
        <Switch
          checked={payingForSomeoneElse}
          onChange={setPayingForSomeoneElse}
          className={`${
            payingForSomeoneElse ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Pay for someone else</span>
          <span
            className={`${
              payingForSomeoneElse ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Payment ID (bytes32)"
        className="w-full p-2 border rounded mb-2"
      />
      {errors.paymentId && (
        <p className="text-red-500 text-sm">{errors.paymentId}</p>
      )}

      <div className="mb-2">
        <label
          htmlFor="amountToPay"
          className="block text-sm font-medium text-gray-700"
        >
          Amount to pay (in wei)
        </label>
        <input
          id="amountToPay"
          type="number"
          value={amountToPay}
          onChange={(e) => setAmountToPay(e.target.value)}
          placeholder="Amount to pay (wei)"
          className="w-full p-2 border rounded"
          min="0"
          step="1"
        />
        {errors.amountToPay && (
          <p className="text-red-500 text-sm">{errors.amountToPay}</p>
        )}
        {amountToPay && (
          <p className="text-sm text-gray-500 mt-1">
            ≈ {formatEther(BigInt(amountToPay))} ETH
          </p>
        )}
      </div>
      {payingForSomeoneElse && (
        <input
          type="text"
          value={debtorToPay}
          onChange={(e) => setDebtorToPay(e.target.value)}
          placeholder="Debtor address to pay for"
          className="w-full p-2 border rounded mb-2"
        />
      )}
      {payingForSomeoneElse && errors.debtorToPay && (
        <p className="text-red-500 text-sm">{errors.debtorToPay}</p>
      )}
      {hash && (
        <div className="mb-2">
          Transaction Hash:{" "}
          <a
            href={getExplorerUrl(hash, chainId || 84532)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {hash.slice(0, 6)}...{hash.slice(-4)}
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
        onClick={handleFulfillPayment}
        className="bg-purple-500 text-white p-2 rounded w-full"
        disabled={isConfirming}
      >
        {isConfirming ? "Processing..." : "Fulfill Payment"}
      </button>
    </div>
  );
}
