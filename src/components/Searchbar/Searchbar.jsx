import React from 'react';
export function Searchbar({ onSubmit }) {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input name="search" type="text" />
      </form>
    </header>
  );
}
