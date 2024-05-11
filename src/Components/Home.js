import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const MyStyledComponent = styled.div`
  border: 2px dotted green;
`

const NewComponents = (props) => {
  const someJS = new Date().toDateString()
  return <MyStyledComponent>{props.text} And the time is {someJS}</MyStyledComponent>
}

export default function Home() {
  const { theme } = useOutletContext();

  const text = 'hey yo i\'m learning react'

  return <div>yo I'm home {theme}
    <NewComponents text={"boyyyyyy I'm a turtle"} />
  </div>;
}
