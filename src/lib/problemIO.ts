/**
 * Problem I/O: Universal XML and JSON Serialization & Deserialization
 * Supports all AI Playground problem formats: Search graphs, CSPs, Bayes nets,
 * DTree datasets, Neural sets, Planning worlds, Robot worlds, Deduction KBs, Strips problems.
 */

const VALID_XML_TAG = /^(?!xml)[a-zA-Z_][a-zA-Z0-9_.-]*$/i;

function escapeXml(unsafe: string): string {
  return String(unsafe)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function serializeValue(val: any, tagName: string, indent: string): string {
  const isTagValid = VALID_XML_TAG.test(tagName);
  const tag = isTagValid ? tagName : "field";
  const keyAttr = isTagValid ? "" : ` key="${escapeXml(tagName)}"`;

  if (val === null || val === undefined) {
    return `${indent}<${tag}${keyAttr} type="null"/>\n`;
  }
  if (typeof val === "boolean") {
    return `${indent}<${tag}${keyAttr} type="boolean">${val}</${tag}>\n`;
  }
  if (typeof val === "number") {
    return `${indent}<${tag}${keyAttr} type="number">${val}</${tag}>\n`;
  }
  if (typeof val === "string") {
    return `${indent}<${tag}${keyAttr} type="string">${escapeXml(val)}</${tag}>\n`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return `${indent}<${tag}${keyAttr} type="array"/>\n`;
    }
    let out = `${indent}<${tag}${keyAttr} type="array">\n`;
    for (const item of val) {
      out += serializeValue(item, "item", indent + "  ");
    }
    out += `${indent}</${tag}>\n`;
    return out;
  }
  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) {
      return `${indent}<${tag}${keyAttr} type="object"/>\n`;
    }
    let out = `${indent}<${tag}${keyAttr} type="object">\n`;
    for (const k of keys) {
      out += serializeValue(val[k], k, indent + "  ");
    }
    out += `${indent}</${tag}>\n`;
    return out;
  }
  return `${indent}<${tag}${keyAttr}>${escapeXml(String(val))}</${tag}>\n`;
}

function getDOMParser(): DOMParser {
  if (typeof window !== "undefined" && window.DOMParser) {
    return new window.DOMParser();
  }
  if (typeof DOMParser !== "undefined") {
    return new DOMParser();
  }
  throw new Error("DOMParser is not available in the current environment.");
}

function parseAttrValue(val: string): any {
  const trimmed = val.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (trimmed !== "" && !isNaN(Number(trimmed)) && !trimmed.startsWith("0x")) {
    return Number(trimmed);
  }
  return val;
}

function deserializeNode(element: Element): any {
  const typeAttr = element.getAttribute("type");

  if (typeAttr === "null") return null;
  if (typeAttr === "boolean") return element.textContent?.trim() === "true";
  if (typeAttr === "number") return Number(element.textContent?.trim());
  if (typeAttr === "string") return element.textContent ?? "";

  // Extract non-type and non-key attributes
  const attrs: Record<string, any> = {};
  if (element.attributes) {
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (attr.name === "type" || attr.name === "key") continue;
      attrs[attr.name] = parseAttrValue(attr.value);
    }
  }
  const hasAttrs = Object.keys(attrs).length > 0;

  const children = Array.from(element.children);

  if (
    typeAttr === "array" ||
    (!typeAttr && children.length > 0 && children.every((c) => c.tagName.toLowerCase() === "item"))
  ) {
    return children.map((c) => deserializeNode(c));
  }

  if (typeAttr === "object" || children.length > 0) {
    const res: Record<string, any> = { ...attrs };
    for (const child of children) {
      const key = child.getAttribute("key") || child.tagName;
      const childVal = deserializeNode(child);
      if (key in res) {
        if (res[key] === childVal) {
          // Sibling or attribute with identical scalar value
          continue;
        }
        if (Array.isArray(res[key])) {
          res[key].push(childVal);
        } else {
          res[key] = [res[key], childVal];
        }
      } else {
        res[key] = childVal;
      }
    }
    return res;
  }

  // Fallback if no type attribute and no children
  const text = element.textContent ?? "";
  const trimmed = text.trim();
  if (hasAttrs) {
    if (trimmed !== "") {
      return { ...attrs, value: parseAttrValue(trimmed) };
    }
    return attrs;
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (trimmed !== "" && !isNaN(Number(trimmed)) && !trimmed.startsWith("0x")) {
    return Number(trimmed);
  }
  return text;
}

/**
 * Serialize problem data to standard AI Playground XML string.
 */
export function exportProblemXml(problem: any, toolType = "generic"): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<ai-playground-problem version="1.0" toolType="${escapeXml(toolType)}">\n`;
  xml += `  <toolType type="string">${escapeXml(toolType)}</toolType>\n`;
  xml += serializeValue(problem, "problem", "  ");
  xml += `</ai-playground-problem>\n`;
  return xml;
}

/**
 * Serialize problem data to formatted AI Playground JSON string.
 */
export function exportProblemJson(problem: any, toolType = "generic"): string {
  const payload = {
    format: "ai-playground-problem",
    version: "1.0",
    toolType,
    problem,
  };
  return JSON.stringify(payload, null, 2);
}

const ROOT_TAG_TOOL_MAP: Record<string, string> = {
  search: "search",
  "search-graph": "search",
  graph: "search",
  bayes: "bayes",
  "bayes-network": "bayes",
  bayesian: "bayes",
  csp: "constraint",
  constraint: "constraint",
  hill: "hill",
  sls: "hill",
  deduction: "deduction",
  "knowledge-base": "deduction",
  dtree: "dtree",
  "decision-tree": "dtree",
  neural: "neural",
  "neural-network": "neural",
  planning: "planning",
  robot: "robot",
  strips: "strips_to_csp",
  strips_to_csp: "strips_to_csp",
  "strips-csp": "strips_to_csp",
};

/**
 * Parse an AI Playground XML problem string back to object.
 */
export function parseProblemXml(xmlString: string): { toolType?: string; problem: any } {
  const parser = getDOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");
  const parserError = xmlDoc.getElementsByTagName("parsererror");
  if (parserError.length > 0) {
    const rawMsg = parserError[0].textContent || "Invalid XML format";
    const cleanMsg = rawMsg.split("\n")[0].replace(/^error on line/i, "Error on line").trim();
    throw new Error("XML Parse Error: " + cleanMsg);
  }

  const root = xmlDoc.documentElement;
  const toolTypeAttr = root.getAttribute("toolType") || root.getAttribute("type") || undefined;
  const data = deserializeNode(root);

  const rootTagLower = root.tagName.toLowerCase();
  const inferredToolType = ROOT_TAG_TOOL_MAP[rootTagLower];

  const rawToolType = data?.toolType || toolTypeAttr || inferredToolType;
  const toolType = Array.isArray(rawToolType) ? rawToolType[0] : rawToolType;
  const problem = data?.problem !== undefined ? data.problem : data;

  return { toolType, problem };
}

/**
 * Parse an AI Playground JSON problem string back to object.
 */
export function parseProblemJson(jsonString: string): { toolType?: string; problem: any } {
  const parsed = JSON.parse(jsonString);
  if (parsed && typeof parsed === "object") {
    if (parsed.format === "ai-playground-problem" && parsed.problem !== undefined) {
      return { toolType: parsed.toolType, problem: parsed.problem };
    }
    if (parsed.problem !== undefined) {
      return { toolType: parsed.toolType, problem: parsed.problem };
    }
    return { toolType: parsed.toolType, problem: parsed };
  }
  return { problem: parsed };
}

/**
 * Universal importer: detects whether string is XML or JSON and parses it.
 */
export function importProblemAny(rawText: string): {
  toolType?: string;
  problem: any;
  format: "json" | "xml";
} {
  const trimmed = (rawText || "").trim();
  if (!trimmed) {
    throw new Error("Empty input: Please provide valid XML or JSON problem data.");
  }
  if (trimmed.startsWith("<")) {
    const res = parseProblemXml(trimmed);
    return { ...res, format: "xml" };
  } else {
    const res = parseProblemJson(trimmed);
    return { ...res, format: "json" };
  }
}

/**
 * Triggers browser file download with blob URL.
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string): void {
  if (typeof document === "undefined") return;
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.addEventListener("click", (e) => {
      // Prevent navigation warning in testing/JSDOM environments
      if (typeof process !== "undefined" && process.env?.NODE_ENV === "test") {
        e.preventDefault();
      }
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    console.warn("triggerFileDownload skipped:", err);
  }
}
