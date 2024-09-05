"use client";

import { friend_payments_contract_address } from "src/constants";
import {
  SMART_CONTRACT_GITHUB_LINK,
  DAPP_GITHUB_LINK,
  RICK_ROLL,
} from "src/links";
import ArrowSvg from "src/svg/ArrowSvg";

const docLinks = [
  {
    href:
      "https://sepolia.basescan.org/address/" +
      friend_payments_contract_address,
    title: "Contract Address",
  },
  { href: SMART_CONTRACT_GITHUB_LINK, title: "Contracts Github" },
  { href: DAPP_GITHUB_LINK, title: "Dapp Github" },
  { href: RICK_ROLL, title: "X" },
];

export default function Footer() {
  return (
    <section className="w-full py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <ul className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4">
          {docLinks.map(({ href, title }) => (
            <li key={href} className="text-center">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                title={title}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <p>{title}</p>
                <ArrowSvg />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
