"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import Footer from "src/components/Footer";
import WalletWrapper from "src/components/WalletWrapper";
import NavigationBar from "src/components/NavigationBar";
import RequestPayment from "src/components/RequestPayment";
import SendPayment from "src/components/SendPayment";
import { friend_payments_contract_address } from "src/constants";

const contractAddress = friend_payments_contract_address.toLowerCase();

export default function Page() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("request");

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <NavigationBar />
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        {address ? (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Friend Payments Dashboard
            </h2>
            <div className="mb-4">
              <div className="flex border-b mb-4">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "request" ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("request")}
                >
                  Request Payments
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "send" ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("send")}
                >
                  Send Payments
                </button>
              </div>
              {activeTab === "request" ? <RequestPayment /> : <SendPayment />}
            </div>
          </div>
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to use the dashboard"
          />
        )}
      </section>
      <Footer />
    </div>
  );
}
