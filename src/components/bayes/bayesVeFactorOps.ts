import { VeFactor, VeFactorRow } from "./bayesVeTypes";

export function restrictFactor(factor: VeFactor, variable: string, value: string): VeFactor {
  if (!factor.variables.includes(variable)) return factor;
  const remVars = factor.variables.filter((v) => v !== variable);
  const rows: VeFactorRow[] = factor.table
    .filter((r) => r.assignment[variable] === value)
    .map((r) => {
      const copy = { ...r.assignment };
      delete copy[variable];
      return { assignment: copy, value: r.value };
    });
  return { id: factor.id, name: `${factor.name}[${variable}=${value}]`, variables: remVars, table: rows };
}

export function multiplyFactors(f1: VeFactor, f2: VeFactor, newName: string): VeFactor {
  const mergedVars = Array.from(new Set([...f1.variables, ...f2.variables]));
  const f2Set = new Set(f2.variables);
  const commonVars = f1.variables.filter((v) => f2Set.has(v));
  const table: VeFactorRow[] = [];
  for (const r1 of f1.table) {
    for (const r2 of f2.table) {
      const match = commonVars.every((v) => r1.assignment[v] === r2.assignment[v]);
      if (match) {
        table.push({ assignment: { ...r1.assignment, ...r2.assignment }, value: r1.value * r2.value });
      }
    }
  }
  return { id: `f-${Math.random().toString(36).slice(2, 7)}`, name: newName, variables: mergedVars, table };
}

export function sumOutVariable(factor: VeFactor, variable: string, newName: string): VeFactor {
  const remVars = factor.variables.filter((v) => v !== variable);
  const map = new Map<string, { assignment: Record<string, string>; value: number }>();
  for (const row of factor.table) {
    const key = remVars.map((v) => `${v}=${row.assignment[v]}`).sort().join(",");
    const existing = map.get(key);
    if (existing) {
      existing.value += row.value;
    } else {
      const copy = { ...row.assignment };
      delete copy[variable];
      map.set(key, { assignment: copy, value: row.value });
    }
  }
  return { id: `f-${Math.random().toString(36).slice(2, 7)}`, name: newName, variables: remVars, table: Array.from(map.values()) };
}
