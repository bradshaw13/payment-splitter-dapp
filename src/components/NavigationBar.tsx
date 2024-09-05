import React from "react";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import { useAccount } from "wagmi";

const NavigationBar: React.FC = () => {
  const { address } = useAccount();
  return (
    <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
      <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0 px-4 md:px-8">
        <h1 className="text-2xl font-bold">Payment Splitter</h1>
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </div>
    </section>
  );
};

export default NavigationBar;
