import React, { useState } from "react";
import { StudioWorkspaceProps, WorkspacePane } from "./workspaceTypes";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { useWorkspaceLogHistory } from "./useWorkspaceLogHistory";

export function StudioWorkspace(props: StudioWorkspaceProps) {
  const [internalPane, setInternalPane] = useState<WorkspacePane>("animation");
  const currentPane = props.activePane ?? internalPane;
  const history = useWorkspaceLogHistory(
    props.activeLogMessage,
    props.selectedPrebuiltId,
  );

  const handlePaneChange = (pane: WorkspacePane) => {
    setInternalPane(pane);
    props.onPaneChange?.(pane);
  };

  return (
    <div className="space-y-6">
      <WorkspaceHeader
        {...props}
        currentPane={currentPane}
        setCurrentPane={handlePaneChange}
      />
      <WorkspaceLayout
        {...props}
        currentPane={currentPane}
        setCurrentPane={handlePaneChange}
        logHistory={history}
      />
    </div>
  );
}
