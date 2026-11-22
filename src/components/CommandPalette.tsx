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
    selectedIndex,
    handleKeyDown,
    handleSelect,
    handleClose,
  } = useCommandPalette(onClose, onSelectView);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="p-0 overflow-hidden max-w-xl"
    >
      <CommandPaletteInput query={query} onChange={setQuery} onKeyDown={handleKeyDown} />
      <CommandPaletteResults
        query={query}
        filteredNav={filteredNav}
        filteredExercises={filteredExercises}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />
    </Modal>
  );
}
