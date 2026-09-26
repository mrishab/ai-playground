import React from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "../ui/Button";

interface SearchAutoPlayButtonProps {
  isPlaying: boolean;
  disabled: boolean;
  onTogglePlay: () => void;
}

export function SearchAutoPlayButton({
  isPlaying,
  disabled,
  onTogglePlay,
}: SearchAutoPlayButtonProps) {
  return (
    <Button
      variant={isPlaying ? "destructive" : "default"}
      size="sm"
      onClick={onTogglePlay}
      disabled={disabled}
      className="gap-1.5 font-semibold h-8"
    >
      {isPlaying ? (
        <Pause className="h-3.5 w-3.5 fill-current" />
      ) : (
        <Play className="h-3.5 w-3.5 fill-current" />
      )}
      {isPlaying ? "Pause" : "Auto Search"}
    </Button>
  );
}
