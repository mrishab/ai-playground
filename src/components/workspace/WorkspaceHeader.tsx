import React from "react";
import { Badge } from "../ui/Badge";
import { StudioWorkspaceProps, WorkspacePane } from "./workspaceTypes";
import { WorkspacePrebuiltMenu } from "./WorkspacePrebuiltMenu";
import { WorkspaceAlgoMenu } from "./WorkspaceAlgoMenu";
import { WorkspacePaneSwitcher } from "./WorkspacePaneSwitcher";
import { WorkspaceControls } from "./WorkspaceControls";

interface WorkspaceHeaderProps extends StudioWorkspaceProps {
  currentPane: WorkspacePane;
  setCurrentPane: (p: WorkspacePane) => void;
}

export function WorkspaceHeader(props: WorkspaceHeaderProps) {
  return (
    <div className="flex flex-col gap-3.5 bg-card/60 p-4 sm:p-5 rounded-2xl border border-border backdrop-blur shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">{props.title}</h1>
              <Badge variant="cyan">{props.category}</Badge>
            </div>
            {props.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-xl">
                {props.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <WorkspacePrebuiltMenu
            label={props.prebuiltLabel}
            items={props.prebuiltItems}
            selectedId={props.selectedPrebuiltId}
            onSelect={props.onSelectPrebuiltId}
            onOpenGraphBuilder={() => props.setCurrentPane("graph_builder")}
          />
          <WorkspaceAlgoMenu
            items={props.algorithmItems}
            selectedId={props.selectedAlgorithmId}
            onSelect={props.onSelectAlgorithmId}
          />
          <WorkspaceControls controls={props.controls} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border/50">
        <WorkspacePaneSwitcher
          activePane={props.currentPane}
          onSelectPane={props.setCurrentPane}
          hasGraphBuilder={Boolean(props.graphBuilderSlot)}
        />
      </div>
    </div>
  );
}
