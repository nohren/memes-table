import React from 'react';
import styled from 'styled-components';
import IconWrapper from './IconWrapper';

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

  /* Mobile: vertically center the icon and enlarge it slightly */
  @media (max-width: 600px) {
    top: 50%;
    transform: translateY(-50%);
    svg {
      width: 18px;
      height: 18px;
    }
  }
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
        <IconWrapper name="SearchIcon" button={false} onClick={handleSearch} />
      </SVGCSS>
    </SearchContainer>
  );
}
