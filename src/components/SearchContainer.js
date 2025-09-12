import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { debounce, formatSelectedCategory } from '../utils/utilities';

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

const spin = keyframes`
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(102, 227, 255, 0.2);
  border-top: 2px solid var(--accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease;
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
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};

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
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    selectedCategory,
    selectedHoliday,
  } = props;
  const [queryText, setQueryText] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);

  const handleQueryChange = (e) => {
    setQueryText(e.target.value);
    setIsSearching(true);
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setIsSearching(false);
    }, 700),
    [setSearchQuery]
  );

  const handleClearSearch = () => {
    setQueryText('');
    setIsSearching(false);
    clearSearch();
  };

  //debounce call setSearchQuery
  useEffect(() => {
    if (queryText.trim()) {
      debouncedSetSearchQuery(queryText);
    } else {
      // If query is empty, immediately clear search and stop spinner
      setSearchQuery('');
      setIsSearching(false);
    }
  }, [queryText, debouncedSetSearchQuery, setSearchQuery]);

  console.log('selectedHoliday', selectedHoliday);

  return (
    <SearchOuterContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder={`Search recipes, ingredients, author... in ${formatSelectedCategory(
          selectedCategory,
          selectedHoliday
        )}`}
        value={queryText}
        onChange={handleQueryChange}
      />
      {isSearching && <Spinner visible={isSearching} />}
      {searchQuery && !isSearching && (
        <ClearButton
          visible={searchQuery && !isSearching}
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          ×
        </ClearButton>
      )}
    </SearchOuterContainer>
  );
}
