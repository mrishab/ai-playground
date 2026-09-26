import React from "react";
import Prism from "prismjs";
import { getSyntaxTokenClass } from "./syntaxTokenizer";

export function SyntaxHighlightTokens({ tokens, keyPrefix = "tok" }: { tokens: (string | Prism.Token)[]; keyPrefix?: string }) {
  return (
    <>
      {tokens.map((token, pos) => {
        const itemKey = typeof token === "string" ? `${keyPrefix}-s-${pos}` : `${keyPrefix}-t-${pos}`;
        if (typeof token === "string") {
          {/* react-doctor-disable-next-line react-doctor/no-array-index-as-key */}
          return <span key={itemKey}>{token}</span>;
        }
        if (Array.isArray(token.content)) {
          {/* react-doctor-disable-next-line react-doctor/no-array-index-as-key */}
          return (
            <span key={itemKey} className={getSyntaxTokenClass(token.type)}>
              <SyntaxHighlightTokens tokens={token.content} keyPrefix={itemKey} />
            </span>
          );
        }
        {/* react-doctor-disable-next-line react-doctor/no-array-index-as-key */}
        return (
          <span key={itemKey} className={getSyntaxTokenClass(token.type)}>
            {typeof token.content === "string" ? token.content : String(token.content)}
          </span>
        );
      })}
    </>
  );
}
