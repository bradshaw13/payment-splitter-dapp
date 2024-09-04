"use client";
import { useAccount, useWriteContract, useConfig } from "wagmi";
import { useState, useEffect } from "react";
import WalletWrapper from "src/components/WalletWrapper";
import { isAddress, Address, getAddress } from "viem";
import { Switch } from "@headlessui/react";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  friendPaymentsABI,
  friend_payments_contract_address,
} from "src/constants";
import { formatEther } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { keccak256, toBytes } from "viem";
import {} from "wagmi";

const PAYMENT_REQUESTED_EVENT_SIGNATURE = keccak256(
  toBytes("PaymentRequested(bytes32,address,string,address[])")
);

export default function RequestPayment() {
  const { address, chainId } = useAccount();
  const [friendAddress, setFriendAddress] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    debtors: [""] as string[],
    paymentName: "",
    amountPerDebtor: "",
    expirationDateTime: "",
  });
  const [paymentId, setPaymentId] = useState("");
  const [debtorToPay, setDebtorToPay] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [payingForSomeoneElse, setPayingForSomeoneElse] = useState(false);
  const [lastPaymentId, setLastPaymentId] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    friendAddress: "",
    paymentName: "",
    amountPerDebtor: "",
    expirationDateTime: "",
    debtors: "",
    paymentId: "",
    amountToPay: "",
    debtorToPay: "",
  });

  const { writeContract, writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        // data here is the transaction receipt, not the return value
        console.log("Transaction successful:", data);
        // We'll need to wait for the transaction to be mined and then get the logs
      },
    },
  });

  const sendFriendRequest = (friendAddress: string) => {
    writeContract({
      address: getAddress(friend_payments_contract_address),
      abi: friendPaymentsABI,
      functionName: "sendFriendRequest",
      args: [getAddress(friendAddress)],
    });
  };

  const validateFriendAddress = (address: string) => {
    if (!isAddress(address)) {
      setErrors((prev) => ({
        ...prev,
        friendAddress: "Invalid Ethereum address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, friendAddress: "" }));
    }
  };

  const validatePaymentDetails = () => {
    let newErrors = { ...errors };
    let isValid = true;

    // Validate payment name
    if (!paymentDetails.paymentName.trim()) {
      newErrors.paymentName = "Payment name cannot be empty";
      isValid = false;
    } else {
      newErrors.paymentName = "";
    }

    // Validate amount per debtor
    if (
      !paymentDetails.amountPerDebtor ||
      BigInt(paymentDetails.amountPerDebtor) <= BigInt(0)
    ) {
      newErrors.amountPerDebtor = "Amount must be greater than 0 wei";
      isValid = false;
    } else {
      newErrors.amountPerDebtor = "";
    }

    // Validate expiration date and time
    const expirationDate = new Date(paymentDetails.expirationDateTime);
    const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000);
    if (expirationDate <= tenMinutesFromNow) {
      newErrors.expirationDateTime =
        "Expiration must be at least 10 minutes in the future";
      isValid = false;
    } else {
      newErrors.expirationDateTime = "";
    }

    // Validate debtors
    const validDebtors = paymentDetails.debtors.filter((debtor) =>
      isAddress(debtor)
    );
    if (validDebtors.length === 0) {
      newErrors.debtors = "At least one valid debtor address is required";
      isValid = false;
    } else if (validDebtors.length !== paymentDetails.debtors.length) {
      newErrors.debtors = "Some debtor addresses are invalid";
      isValid = false;
    } else {
      newErrors.debtors = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateFulfillPayment = () => {
    let newErrors = { ...errors };
    let isValid = true;

    // Validate payment ID
    if (!paymentId.trim()) {
      newErrors.paymentId = "Payment ID is required";
      isValid = false;
    } else {
      newErrors.paymentId = "";
    }

    // Validate amount to pay
    if (!amountToPay || BigInt(amountToPay) <= BigInt(0)) {
      newErrors.amountToPay = "Amount must be greater than 0 wei";
      isValid = false;
    } else {
      newErrors.amountToPay = "";
    }

    // Validate debtor to pay if paying for someone else
    if (payingForSomeoneElse && !isAddress(debtorToPay)) {
      newErrors.debtorToPay = "Invalid Ethereum address";
      isValid = false;
    } else {
      newErrors.debtorToPay = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendFriendRequest = () => {
    if (isAddress(friendAddress)) {
      sendFriendRequest(friendAddress);
    } else {
      setErrors((prev) => ({
        ...prev,
        friendAddress: "Invalid Ethereum address",
      }));
    }
  };

  const config = useConfig();

  const handleRequestPayment = async () => {
    if (validatePaymentDetails()) {
      const expirationTimestamp = Math.floor(
        new Date(paymentDetails.expirationDateTime).getTime() / 1000
      );
      try {
        const hash = await writeContractAsync({
          address: getAddress(friend_payments_contract_address),
          abi: friendPaymentsABI,
          functionName: "requestPayment",
          args: [
            paymentDetails.debtors,
            paymentDetails.paymentName,
            BigInt(paymentDetails.amountPerDebtor),
            BigInt(expirationTimestamp),
          ],
        });
        setTxHash(hash);

        // Wait for the transaction to be mined
        const receipt = await waitForTransactionReceipt(config, { hash });

        // Find the event log that contains the payment ID
        const event = receipt.logs.find(
          (log) => log.topics[0] === PAYMENT_REQUESTED_EVENT_SIGNATURE
        );

        if (event && event.topics[1]) {
          const paymentId = event.topics[1];
          setLastPaymentId(paymentId);
          console.log("Payment ID:", paymentId);
        } else {
          console.error("PaymentRequested event not found in logs");
        }
      } catch (error) {
        console.error("Error requesting payment:", error);
      }
    }
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

  // Use useEffect to set the default expiration date/time when the component mounts
  useEffect(() => {
    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
    oneDayLater.setMinutes(
      oneDayLater.getMinutes() - oneDayLater.getTimezoneOffset()
    ); // Adjust for local timezone
    const defaultDateTime = oneDayLater.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
    setPaymentDetails((prev) => ({
      ...prev,
      expirationDateTime: defaultDateTime,
    }));
  }, []);

  const addDebtorField = () => {
    setPaymentDetails((prev) => ({
      ...prev,
      debtors: [...prev.debtors, ""],
    }));
  };

  const removeDebtorField = (index: number) => {
    setPaymentDetails((prev) => ({
      ...prev,
      debtors: prev.debtors.filter((_, i) => i !== index),
    }));
  };

  const updateDebtorAddress = (index: number, value: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      debtors: prev.debtors.map((addr, i) => (i === index ? value : addr)),
    }));
  };

  const getExplorerUrl = (hash: string) => {
    if (chainId === 84532) {
      // Base Goerli (testnet)
      return `https://sepolia.basescan.org/tx/${hash}`;
    } else if (chainId === 8453) {
      // Base Mainnet
      return `https://basescan.org/tx/${hash}`;
    } else {
      // Default to Base sepolia if chain is unknown
      return `https://sepolia.basescan.org/tx/${hash}`;
    }
  };

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        {address ? (
          <div className="w-full max-w-md">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Friend Management</h3>
              <input
                type="text"
                value={friendAddress}
                onChange={(e) => {
                  setFriendAddress(e.target.value);
                  validateFriendAddress(e.target.value);
                }}
                placeholder="Friend's address"
                className="w-full p-2 border rounded"
              />
              {errors.friendAddress && (
                <p className="text-red-500 text-sm">{errors.friendAddress}</p>
              )}
              <button
                onClick={handleSendFriendRequest}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Send Friend Request
              </button>
              {/* {isFriend !== undefined && (
              <p className="mt-2">
                {isFriend ? "You are friends" : "You are not friends"}
              </p>
            )} */}
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Request Payment</h3>
              <input
                type="text"
                value={paymentDetails.paymentName}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    paymentName: e.target.value,
                  })
                }
                placeholder="Payment name"
                className="w-full p-2 border rounded mb-2"
              />
              {errors.paymentName && (
                <p className="text-red-500 text-sm">{errors.paymentName}</p>
              )}
              <div className="mb-2">
                <label
                  htmlFor="amountPerDebtor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount per debtor (in wei)
                </label>
                <input
                  id="amountPerDebtor"
                  type="number"
                  value={paymentDetails.amountPerDebtor}
                  onChange={(e) => {
                    setPaymentDetails({
                      ...paymentDetails,
                      amountPerDebtor: e.target.value,
                    });
                  }}
                  placeholder="Amount per debtor (wei)"
                  className="w-full p-2 border rounded"
                  min="0"
                  step="1"
                />
                {errors.amountPerDebtor && (
                  <p className="text-red-500 text-sm">
                    {errors.amountPerDebtor}
                  </p>
                )}
                {paymentDetails.amountPerDebtor && (
                  <p className="text-sm text-gray-500 mt-1">
                    ≈ {formatEther(BigInt(paymentDetails.amountPerDebtor))} ETH
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-2">
                <label
                  htmlFor="expirationDateTime"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Expiration Date and Time
                </label>
                <input
                  id="expirationDateTime"
                  type="datetime-local"
                  value={paymentDetails.expirationDateTime}
                  onChange={(e) => {
                    setPaymentDetails({
                      ...paymentDetails,
                      expirationDateTime: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
              {errors.expirationDateTime && (
                <p className="text-red-500 text-sm">
                  {errors.expirationDateTime}
                </p>
              )}
              <div className="space-y-2">
                {paymentDetails.debtors.map((debtor, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={debtor}
                      onChange={(e) =>
                        updateDebtorAddress(index, e.target.value)
                      }
                      placeholder="Debtor address"
                      className="flex-grow p-2 border rounded"
                    />
                    {paymentDetails.debtors.length > 1 && (
                      <button
                        onClick={() => removeDebtorField(index)}
                        className="ml-2 text-red-500"
                      >
                        <XCircleIcon className="h-6 w-6" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.debtors && (
                <p className="text-red-500 text-sm">{errors.debtors}</p>
              )}
              <button
                onClick={addDebtorField}
                className="mt-2 flex items-center text-green-500 hover:text-green-600"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                <span>Add another debtor</span>
              </button>
              <button
                onClick={handleRequestPayment}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Request Payment
              </button>
              {(txHash || lastPaymentId) && (
                <div className="mt-4 p-4 bg-blue-100 rounded-md">
                  <h4 className="font-semibold text-blue-800">
                    Payment Request Submitted
                  </h4>
                  {txHash && (
                    <p className="text-sm text-blue-600">
                      Transaction Hash:{" "}
                      <a
                        href={getExplorerUrl(txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono underline"
                      >
                        {txHash}
                      </a>
                    </p>
                  )}
                  {lastPaymentId && (
                    <p className="text-sm text-blue-600">
                      Payment ID:{" "}
                      <span className="font-mono">{lastPaymentId}</span>
                    </p>
                  )}
                  <p className="text-xs text-blue-500 mt-1">
                    Save this information for future reference or to share with
                    debtors.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
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
              <button
                onClick={handleFulfillPayment}
                className="bg-purple-500 text-white p-2 rounded"
              >
                Fulfill Payment
              </button>
            </div>
          </div>
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to use the dashboard"
          />
        )}
      </section>
    </div>
  );
}
