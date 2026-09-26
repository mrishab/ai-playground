import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-prolog";

export function getPrismTokens(code: string, language: string = "javascript"): (string | Prism.Token)[] {
  const grammar = Prism.languages[language] || Prism.languages.javascript;
  return Prism.tokenize(code, grammar);
}

export function getSyntaxTokenClass(type: string): string {
  switch (type) {
    case "keyword":
      return "text-purple-600 dark:text-purple-400 font-semibold";
    case "string":
      return "text-emerald-600 dark:text-emerald-400";
    case "number":
    case "boolean":
      return "text-amber-600 dark:text-amber-400";
    case "comment":
      return "text-slate-400 dark:text-slate-500 italic";
    case "function":
      return "text-blue-600 dark:text-blue-400 font-medium";
    case "operator":
      return "text-pink-600 dark:text-pink-400";
    case "punctuation":
      return "text-slate-500 dark:text-slate-400";
    case "variable":
    case "property":
      return "text-cyan-600 dark:text-cyan-400";
    default:
      return "text-slate-800 dark:text-slate-200";
  }
}
