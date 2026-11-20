import React from "react";
import { StudioWorkspaceProps, WorkspacePane } from "./workspaceTypes";
import { WorkspaceBottomDock } from "./WorkspaceBottomDock";
import { WorkspaceLogView } from "./WorkspaceLogView";
import { GraphBuilderPlaceholder } from "./GraphBuilderPlaceholder";

interface WorkspaceLayoutProps extends StudioWorkspaceProps {
  currentPane: WorkspacePane;
  setCurrentPane: (p: WorkspacePane) => void;
}

export function WorkspaceLayout(props: WorkspaceLayoutProps) {
  const { currentPane, setCurrentPane, animationSlot, graphBuilderSlot, codingSlot, logSlot, theorySlot, inspectorSlot, stateSlot, logHistory } = props;

  const renderMainPane = () => {
    switch (currentPane) {
      case "graph_builder":
        return graphBuilderSlot || <GraphBuilderPlaceholder />;
      case "coding":
        return codingSlot || animationSlot;
      case "log":
        return logSlot || <WorkspaceLogView log={props.activeLogMessage} history={logHistory} statsBadges={props.statsBadges} />;
      case "theory":
        return theorySlot || animationSlot;
      case "animation":
      default:
        return animationSlot;
    }
  };

  const isFullWidthPane = currentPane === "coding" || currentPane === "log" || currentPane === "theory";

  return (
    <div className="space-y-4">
      {isFullWidthPane ? (
        <div className="space-y-4">{renderMainPane()}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4 min-w-0">
            {renderMainPane()}
          </div>
          {(inspectorSlot || stateSlot) && (
            <div className="space-y-4 min-w-0">
              {inspectorSlot}
              {stateSlot}
            </div>
          )}
        </div>
      )}

      <WorkspaceBottomDock
        activeLogMessage={props.activeLogMessage}
        statsBadges={props.statsBadges}
        onOpenLogPane={() => setCurrentPane("log")}
        currentPane={currentPane}
      />
    </div>
  );
}
