import React from 'react'

export default function Filters({ search, onSearchChange, level, onLevelChange }) {
  return (
    <div className="filters" role="region" aria-label="Log filters">
      <label className="filter-row">
        <span className="filter-label">Search</span>
        <input
          aria-label="Search logs"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search messages or user"
        />
      </label>

      <label className="filter-row">
        <span className="filter-label">Level</span>
        <select aria-label="Filter by level" value={level} onChange={(e) => onLevelChange(e.target.value)}>
          <option value="">All</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
          <option value="alert">Alert</option>
          <option value="highlight">Highlight</option>
        </select>
      </label>
    </div>
  )
}
