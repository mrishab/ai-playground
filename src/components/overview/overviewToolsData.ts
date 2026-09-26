import { OverviewToolItem } from "./overviewToolsTypes";
import { MAIN_TOOLS_A } from "./overviewToolsMainA";
import { MAIN_TOOLS_B } from "./overviewToolsMainB";
import { PROTO_TOOLS } from "./overviewToolsProto";

export type { OverviewToolItem };

export const OVERVIEW_TOOLS: OverviewToolItem[] = [
  ...MAIN_TOOLS_A,
  ...MAIN_TOOLS_B,
  ...PROTO_TOOLS,
];
