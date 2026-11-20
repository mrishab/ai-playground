import React from "react";
import { Play } from "lucide-react";
import { Button } from "../ui/Button";

interface ConstraintAutoAcButtonProps {
  isPlaying: boolean;
  disabled: boolean;
  onToggleAutoAC: () => void;
}

export function ConstraintAutoAcButton({
  isPlaying,
  disabled,
  onToggleAutoAC,
}: ConstraintAutoAcButtonProps) {
  return (
    <Button
      variant={isPlaying ? "destructive" : "outline"}
      size="sm"
      onClick={onToggleAutoAC}
      disabled={disabled}
      className="gap-1.5 h-8 min-w-[175px] justify-center transition-colors duration-150"
    >
      {isPlaying ? (
        <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-primary" />
      ) : (
        <Play className="h-3.5 w-3.5 fill-current" />
      )}
      {isPlaying ? "Pause" : "Auto Arc Consistency"}
    </Button>
  );
}
