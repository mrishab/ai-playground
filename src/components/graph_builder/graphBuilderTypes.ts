
export type GraphBuilderToolMode = "move" | "add_node" | "add_edge" | "delete";

export interface GraphBuilderEdge {
  from: string;
  to: string;
  cost: number;
}


