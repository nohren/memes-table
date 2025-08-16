import React from 'react';
import styled from 'styled-components';
import SVGWrapper from './SVGWrapper';

const SearchContainer = styled.div`
  width: 25%;
  position: relative;
  & > input {
    border-radius: 5px;
    outline: none;
    width: 65%;
  }
  & > input:focus {
    outline: none;
    box-shadow: 0 0 10px #8017f5;
  }
`;

const SVGCSS = styled.div`
  position: absolute;
  left: 61%;
  top: 3.5px;
  cursor: pointer;
`;

export default function SearchBox(props) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter clicked');
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('search');
  };

  return (
    <SearchContainer>
      <input placeholder="search recipe..." onKeyDown={onKeyDown} />
      <SVGCSS>
        <SVGWrapper name="SearchIcon" button={false} onClick={handleSearch} />
      </SVGCSS>
    </SearchContainer>
  );
}
