import type { WalletSet } from "../types/wallet";
import { toEnv } from "./env";
import { toJson } from "./json";
import { toCsv } from "./csv";
import { toHardhat } from "./hardhat";
import { toFoundry } from "./foundry";

export type ExportFormat = "env" | "json" | "csv" | "hardhat" | "foundry";

export type ExportSpec = {
  id: ExportFormat;
  label: string;
  filename: string;
  language: string;
  mime: string;
};

export const EXPORT_SPECS: ExportSpec[] = [
  { id: "env", label: ".env", filename: ".env", language: "bash", mime: "text/plain" },
  { id: "json", label: "JSON", filename: "wallets.json", language: "json", mime: "application/json" },
  { id: "csv", label: "CSV", filename: "wallets.csv", language: "text", mime: "text/csv" },
  { id: "hardhat", label: "Hardhat", filename: "hardhat.config.ts", language: "typescript", mime: "text/plain" },
  { id: "foundry", label: "Foundry", filename: "foundry.env", language: "bash", mime: "text/plain" },
];

export function serialize(format: ExportFormat, sets: WalletSet[]): string {
  switch (format) {
    case "env":
      return toEnv(sets);
    case "json":
      return toJson(sets);
    case "csv":
      return toCsv(sets);
    case "hardhat":
      return toHardhat(sets);
    case "foundry":
      return toFoundry(sets);
  }
}

export { toEnv, toJson, toCsv, toHardhat, toFoundry };
