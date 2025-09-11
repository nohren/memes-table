import React from 'react';

export function debugDidMount(name) {
  React.useEffect(() => {
    console.log(`${name} Archive component mounted`);
    return () => {
      console.log(`${name} Archive component unmounted`);
    };
  }, []);
}

export function parseTime(timeString) {
  const reHour = /(?:\d+\s*)?(?:h|hr|hrs|hour|hours)\b/i;
  const reMin = /(?:\d+\s*)?(?:m|min|mins|minute|minutes)\b/i;
  const reNum = /\d+(?:\.\d+)?/;

  //iterate over each token, if its purely a number push to the numStack
  //if we have both number and unit, calculate
  // if its a unit pop off the most recent number and calculate
  let total = 0;
  const numStack = [];
  const tokens = timeString.split(' ');
  for (let token of tokens) {
    const num = parseFloat(token.match(reNum)?.[0]) || null;
    const isMin = reMin.test(token);
    const isHour = reHour.test(token);

    // console.log(token, 'num: ', num, 'isMin: ', isMin, 'isHour: ', isHour)
    if (!isMin && !isHour) {
      numStack.push(num);
    } else if (!num) {
      total += isMin ? numStack.pop() : isHour ? numStack.pop() * 60 : NaN;
    } else {
      total += isMin ? num : isHour ? num * 60 : NaN;
    }
  }
  return total;
}

export function debugLog(...messages) {
  if (process.env.NODE_ENV === 'development') {
    console.log('DEBUG: ', ...messages);
  }
}

// higher order function
// term for this in javascript is a closure
// we keep the memory of the timeout variable
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
