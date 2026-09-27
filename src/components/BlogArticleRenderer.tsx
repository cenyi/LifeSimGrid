/**
 * LifeSimGrid — Blog article renderer
 *
 * Renders BlogBlock[] as semantic HTML (h2/h3, p, ul/ol, pre/code, table)
 * with the site's Tailwind styling. Inline formatting (**bold**, `code`,
 * [label](url)) is parsed into React nodes — no dangerouslySetInnerHTML,
 * no raw HTML injection surface.
 */

import type { ReactNode } from "react";
import type { BlogBlock } from "@/lib/blog/types";

/* ------------------------------------------------------------------ */
/*  Inline formatting parser                                           */
/* ------------------------------------------------------------------ */

const INLINE_TOKEN =
  /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

/** True when the URL is internal (same-site path). */
function isInternalUrl(url: string): boolean {
  return url.startsWith("/");
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(INLINE_TOKEN);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      if (isInternalUrl(url)) {
        return (
          <a
            key={key}
            href={url}
            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800"
          >
            {label}
          </a>
        );
      }
      return (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-800"
        >
          {label}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

/* ------------------------------------------------------------------ */
/*  Block renderer                                                     */
/* ------------------------------------------------------------------ */

function Block({
  block,
  index,
}: {
  block: BlogBlock;
  index: number;
}) {
  const k = `b${index}`;

  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")}
          className="mb-3 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-2 mt-8 text-xl font-bold text-gray-900">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mb-4 text-[15px] leading-7 text-gray-700">
          {renderInline(block.text, k)}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-5 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-7 text-gray-700">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFCC00]" />
              <span>{renderInline(item, `${k}-${i}`)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-7 text-gray-700">
              <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 font-mono text-xs font-bold text-amber-800">
                {i + 1}
              </span>
              <span>{renderInline(item, `${k}-${i}`)}</span>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 p-4 text-xs leading-relaxed shadow-sm">
          <code className="font-mono text-gray-100">{block.text}</code>
        </pre>
      );
    case "callout":
      return (
        <aside className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-900">
            {renderInline(block.text, k)}
          </p>
        </aside>
      );
    case "table":
      return (
        <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-gray-900"
                  >
                    {renderInline(h, `${k}-h${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="bg-white even:bg-gray-50/50">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-gray-100 px-4 py-2.5 align-top text-gray-600"
                    >
                      {renderInline(cell, `${k}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogArticleRenderer({
  blocks,
}: {
  blocks: BlogBlock[];
}) {
  return (
    <div>
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
    </div>
  );
}
