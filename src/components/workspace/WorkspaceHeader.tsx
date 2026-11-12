import React from "react";
import { StudioWorkspaceProps, WorkspacePane } from "./workspaceTypes";
import { WorkspacePrebuiltMenu } from "./WorkspacePrebuiltMenu";
import { WorkspaceAlgoMenu } from "./WorkspaceAlgoMenu";
import { WorkspacePaneSwitcher } from "./WorkspacePaneSwitcher";
import { WorkspaceControls } from "./WorkspaceControls";
import { WorkspaceProblemIO } from "./WorkspaceProblemIO";

interface WorkspaceHeaderProps extends StudioWorkspaceProps {
  currentPane: WorkspacePane;
  setCurrentPane: (p: WorkspacePane) => void;
}

export function WorkspaceHeader(props: WorkspaceHeaderProps) {
  return (
    <div className="flex flex-col gap-3 bg-card/50 p-4 sm:p-5 rounded-2xl border border-border/80 shadow-xs backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{props.title}</h1>
          {props.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-xl">{props.description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <WorkspaceProblemIO exportData={props.exportData} onImportProblem={props.onImportProblem} onResetProblem={props.onResetProblem} />
          <WorkspacePaneSwitcher activePane={props.currentPane} onSelectPane={props.setCurrentPane} hasGraphBuilder={Boolean(props.graphBuilderSlot)} />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <WorkspacePrebuiltMenu label={props.prebuiltLabel} items={props.prebuiltItems} selectedId={props.selectedPrebuiltId} onSelect={props.onSelectPrebuiltId} onOpenGraphBuilder={props.onOpenGraphBuilder} />
          <WorkspaceAlgoMenu items={props.algorithmItems} selectedId={props.selectedAlgorithmId} onSelect={props.onSelectAlgorithmId} />
        </div>
        <WorkspaceControls controls={props.controls} />
      </div>
    </div>
  );
}
