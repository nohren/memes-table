import React from 'react';

export function debugDidMount(name) {
  React.useEffect(() => {
    console.log(`${name} Archive component mounted`);
    return () => {
      console.log(`${name} Archive component unmounted`);
    };
  }, []);
}

// Parse "H:MM:SS" (e.g., "0:10:00"). Also accepts "MM:SS" as 0:MM:SS.
function parseHMS(s) {
  s = (s || '').trim();
  if (!s) return null;

  // H:MM:SS  or  MM:SS
  const parts = s.split(':').map((v) => v.trim());
  if (parts.length === 3) {
    const [h, m, sec] = parts.map((n) => Number(n));
    if (Number.isFinite(h) && m >= 0 && m < 60 && sec >= 0 && sec < 60) {
      return {
        hours: h,
        minutes: m,
        seconds: sec,
        totalSeconds: h * 3600 + m * 60 + sec,
      };
    }
    return null;
  }
  if (parts.length === 2) {
    const [m, sec] = parts.map((n) => Number(n));
    if (m >= 0 && m < 60 && sec >= 0 && sec < 60) {
      return { hours: 0, minutes: m, seconds: sec, totalSeconds: m * 60 + sec };
    }
    return null;
  }
  return null;
}
// returns total minutes
export function parseTime(timeString) {
  const reHour = /(?:\d+\s*)?(?:h|hr|hrs|hour|hours)\b/i;
  const reMin = /(?:\d+\s*)?(?:m|min|mins|minute|minutes)\b/i;
  const reNum = /\d+(?:\.\d+)?/;

  const hms = parseHMS(timeString);
  if (hms) return hms.totalSeconds / 60;

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

export function formatSelectedCategory(selectedCategory, selectedHoliday) {
  if (selectedHoliday !== 'all_holidays') {
    return selectedHoliday.replace('_', ' ');
  } else {
    return selectedCategory.replace('_', ' ');
  }
}
