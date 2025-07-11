import React from "react";

export default function Header({
  searchTerm,
  setSearchTerm,
  searchOpen,
  setSearchOpen,
  setCategoryFilter,
  resetFolderSelection,  // New prop
}) {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <h1 className="logo" onClick={() => setCategoryFilter(null)}>LocalFlix</h1>
      </div>

      {/* Center: Nav Links */}
      <nav className="header-nav">
        <ul>
          <li onClick={() => setCategoryFilter("TV Shows")}>TV Shows</li>
          <li onClick={() => setCategoryFilter("Movies")}>Movies</li>
          <li onClick={() => setCategoryFilter("My List")}>My List</li>
        </ul>
      </nav>

      {/* Right: Search + Reset Folder Button */}
      <div className="header-right">
        {searchOpen && (
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <button
          className="search-toggle"
          aria-label="Toggle Search"
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          🔍
        </button>

        <button
          className="reset-folder-btn"
          title="Reset folder selection"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to reset your folder selection? This will clear all loaded collections."
              )
            ) {
              resetFolderSelection();
            }
          }}
          style={{
            marginLeft: "12px",
            backgroundColor: "#e53935",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Reset Folder
        </button>
      </div>
    </header>
  );
}
