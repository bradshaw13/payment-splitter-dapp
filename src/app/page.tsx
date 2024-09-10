"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import Footer from "src/components/Footer";
import WalletWrapper from "src/components/WalletWrapper";
import NavigationBar from "src/components/NavigationBar";
import RequestPayment from "src/components/RequestPayment";
import SendArbitraryPayment from "src/components/SendArbitraryPayment";
import FulfillPayment from "src/components/FulfillPayment";
import { friend_payments_contract_address } from "src/constants";
import FriendManagement from "src/components/FriendManagement";

const contractAddress = friend_payments_contract_address.toLowerCase();

export default function Page() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("request");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      <main className="flex-grow flex flex-col items-center px-4 py-8">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Friend Payments Dashboard
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          (Work in Progress - Currently available only on Base Sepolia)
        </p>
        {address ? (
          <div className="w-full max-w-md">
            <div className="flex border-b mb-6">
              <button
                className={`py-2 px-4 ${
                  activeTab === "friend_management"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
                onClick={() => setActiveTab("friend_management")}
              >
                Friend Management
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "request" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("request")}
              >
                Request Payment
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "send" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("send")}
              >
                Send Arbitrary Payment
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "fulfill" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveTab("fulfill")}
              >
                Fulfill Payment
              </button>
            </div>
            <div className="mt-6">
              {activeTab === "friend_management" && <FriendManagement />}
              {activeTab === "request" && <RequestPayment />}
              {activeTab === "send" && <SendArbitraryPayment />}
              {activeTab === "fulfill" && <FulfillPayment />}
            </div>
          </div>
        ) : (
          <WalletWrapper
            className="w-full max-w-md"
            text="Sign in to use the dashboard"
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
