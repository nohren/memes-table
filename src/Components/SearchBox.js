import React from 'react';
import styled from 'styled-components';
import SVGWrapper from './SVGWrapper';

const SearchContainer = styled.div`
  width: 25%;
  & > input {
    border-radius: 5px;
    outline: none;
  }
  & > input:focus {
    outline: none;
    box-shadow: 0 0 10px #8017f5;
  }
`;

export default function SearchBox(props) {
  return (
    <SearchContainer>
      <input placeholder="search..." />
      <SVGWrapper name="SearchIcon" button={false} />
    </SearchContainer>
  );
}
