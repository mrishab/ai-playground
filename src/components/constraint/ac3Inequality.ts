import { VariableDomains } from "./constraintTypes";

export function isInequalitySupported(
  constraintName: string,
  var0: string,
  var1: string,
  varX: string,
  valX: string,
  otherVar: string,
  currentDomains: VariableDomains,
): boolean {
  if (constraintName.includes("!=") || constraintName === "") {
    return currentDomains[otherVar].some((v) => v !== valX);
  }
  if (constraintName.includes("<") && var0 === varX) {
    return currentDomains[otherVar].some(
      (v) => parseFloat(v) > parseFloat(valX),
    );
  }
  if (constraintName.includes("<") && var1 === varX) {
    return currentDomains[otherVar].some(
      (v) => parseFloat(v) < parseFloat(valX),
    );
  }
  return true;
}
