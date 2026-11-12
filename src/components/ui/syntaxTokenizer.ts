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
      return "text-primary font-semibold";
    case "string":
      return "text-foreground font-mono";
    case "number":
    case "boolean":
      return "text-accent-foreground font-semibold";
    case "comment":
      return "text-muted-foreground italic";
    case "function":
      return "text-primary font-medium";
    case "operator":
      return "text-foreground";
    case "punctuation":
      return "text-muted-foreground";
    case "variable":
    case "property":
      return "text-foreground font-medium";
    default:
      return "text-foreground";
  }
}
