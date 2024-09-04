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
    <section className="mt-auto mb-16 pb-8 flex w-full flex-col flex-col-reverse justify-between gap-2 md:mt-8 md:mb-24 md:pb-12 md:flex-row">
      <aside className="flex items-center pt-2 md:pt-0">
        <h3 className="mr-2 mb-2 text-m md:mb-0">Cool right?</h3>
      </aside>
      <ul className="mt-4 flex max-w-full flex-col flex-wrap justify-center gap-3 md:mt-0 md:flex-row md:justify-start md:gap-6">
        {docLinks.map(({ href, title }) => (
          <li className="flex" key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              title={title}
              className="flex items-center gap-1"
            >
              <p>{title}</p>
              <ArrowSvg />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
