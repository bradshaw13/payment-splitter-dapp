"use client";

import {
  DISCORD_LINK,
  FIGMA_LINK,
  GITHUB_LINK,
  RICK_ROLL,
  TWITTER_LINK,
} from "src/links";
import ArrowSvg from "src/svg/ArrowSvg";

const docLinks = [
  { href: RICK_ROLL, title: "Docs" },
  { href: GITHUB_LINK, title: "Github" },
  { href: RICK_ROLL, title: "Discord" },
  { href: RICK_ROLL, title: "Figma" },
  { href: RICK_ROLL, title: "X" },
];

export default function Footer() {
  return (
    <section className="mt-auto mb-2 flex w-full flex-col flex-col-reverse justify-between gap-2 md:mt-8 md:mb-6 md:flex-row">
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
