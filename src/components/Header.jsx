import React from "react";

export default function Header({
  searchTerm,
  setSearchTerm,
  searchOpen,
  setSearchOpen,
  setCategoryFilter,
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
          <li onClick={() => setCategoryFilter("My List")}>My List</li> {/* ✅ Fixed */}
        </ul>
      </nav>

      {/* Right: Search */}
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
      </div>
    </header>
  );
}
