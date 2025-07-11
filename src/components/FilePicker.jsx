import React from "react";

export default function FilePicker({ onPick }) {
  return (
    <button
      onClick={onPick}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      Select Folder
    </button>
  );
}
