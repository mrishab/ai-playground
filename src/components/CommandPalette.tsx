import React from "react";
import { Modal } from "./ui/Modal";
import { useCommandPalette } from "./command_palette/useCommandPalette";
import { CommandPaletteInput } from "./command_palette/CommandPaletteInput";
import { CommandPaletteResults } from "./command_palette/CommandPaletteResults";

export function CommandPalette({
  isOpen,
  onClose,
  onSelectView,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: string) => void;
}) {
  const {
    query,
    setQuery,
    filteredNav,
    filteredExercises,
    handleSelect,
    handleClose,
  } = useCommandPalette(onClose, onSelectView);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="p-0 overflow-hidden max-w-xl"
    >
      <CommandPaletteInput query={query} onChange={setQuery} />
      <CommandPaletteResults
        query={query}
        filteredNav={filteredNav}
        filteredExercises={filteredExercises}
        onSelect={handleSelect}
      />
    </Modal>
  );
}
