import React from 'react';
import styled from 'styled-components';
import { SVGStore } from '../utils/svgStore';

const IconButton = styled.button``;
const IconDiv = styled.div``;

export default function SVGWrapper(props) {
  const { name, button = false } = props;

  const Icon = SVGStore[name] ?? console.error('Icon not found');

  let IconEl;
  if (button) {
    IconEl = (
      <IconButton>
        <Icon />
      </IconButton>
    );
  } else {
    IconEl = (
      <IconDiv>
        <Icon />
      </IconDiv>
    );
  }

  return IconEl;
}
