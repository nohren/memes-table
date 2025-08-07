import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

// Styled component for encapsulation
// Write native css here
const MyStyledComponent = styled.div`
  border: 2px dotted green;
  margin-top: 20px;
`;

const Encapsulation = (props) => {
  console.log(props);
  const someJS = new Date().toDateString();
  return (
    <MyStyledComponent>
      {props.text}. The time is {someJS} calculated from inside the encapsulated
      component.
    </MyStyledComponent>
  );
};

export default function Chat() {
  const { theme } = useOutletContext();

  return <div>This is the chat page.</div>;
}
