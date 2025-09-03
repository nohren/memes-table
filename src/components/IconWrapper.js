import React from 'react';
import styled from 'styled-components';
import { iconStore } from '../utils/iconStore';

const IconButton = styled.button`
  @media (max-width: 600px) {
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
  }
  cursor: pointer;
`;
const IconDiv = styled.div`
  @media (max-width: 600px) {
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
  }
`;

export default function IconWrapper(props) {
  const { name, button = false, onClick, currentColor } = props;

  const Icon = iconStore[name] ?? console.error('Icon not found');

  let IconEl;
  if (onClick) {
    IconEl = (
      <IconButton onClick={onClick}>
        <Icon currentColor={currentColor} />
      </IconButton>
    );
  } else {
    IconEl = (
      <IconDiv onClick={onClick}>
        <Icon currentColor={currentColor} />
      </IconDiv>
    );
  }

  return IconEl;
}
