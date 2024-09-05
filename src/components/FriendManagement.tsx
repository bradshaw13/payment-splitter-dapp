import { useAccount, useWriteContract, useConfig } from "wagmi";
import { useState, useEffect } from "react";

import { isAddress, Address, getAddress } from "viem";
import {
  friendPaymentsABI,
  friend_payments_contract_address,
} from "src/constants";

export default function FriendManagement() {
  const [friendAddress, setFriendAddress] = useState("");

  const [errors, setErrors] = useState({
    friendAddress: "",
  });

  const { writeContract } = useWriteContract();

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

  return (
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
      </div>
    </div>
  );
}
