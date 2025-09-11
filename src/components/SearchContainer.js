import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from '../utils/utilities';

const SearchOuterContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 24px auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: var(--fg);
  font-size: 16px;
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--fg);
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-color: rgba(102, 227, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(102, 227, 255, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg);
  opacity: 0.5;
  font-size: 16px;

  &::before {
    content: '🔍';
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--fg);
  opacity: 0.5;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(102, 227, 255, 0.35);
  }
`;

export default function SearchContainer(props) {
  const { searchQuery, setSearchQuery, clearSearch } = props;
  const [queryText, setQueryText] = useState(searchQuery);

  const handleQueryChange = (e) => {
    setQueryText(e.target.value);
  };

  const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 700), [
    setSearchQuery,
  ]);

  const handleClearSearch = () => {
    setQueryText('');
    clearSearch();
  };

  //debounce call setSearchQuery
  useEffect(() => {
    debouncedSetSearchQuery(queryText);
  }, [queryText]);

  return (
    <SearchOuterContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search recipes, ingredients, author..."
        value={queryText}
        onChange={handleQueryChange}
      />
      {searchQuery && (
        <ClearButton onClick={handleClearSearch} aria-label="Clear search">
          ×
        </ClearButton>
      )}
    </SearchOuterContainer>
  );
}
