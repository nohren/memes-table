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
export const levenshteinInOrderSingle = (queryWord, text) => {
  const m = queryWord.length;
  const n = text.length;
  
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(Infinity));
  
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (queryWord[i - 1] === text[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i][j - 1] + 1,
          dp[i - 1][j] + 1
        );
      }
    }
  }
  
  let minDistance = Infinity;
  for (let j = 0; j <= n; j++) {
    minDistance = Math.min(minDistance, dp[m][j]);
  }
  
  return minDistance;
};

export const levenshteinInOrderMulti = (qWord, tWord) => {
  const m = qWord.length;
  const n = tWord.length;
  
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(Infinity));
  
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (qWord[i - 1] === tWord[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i][j - 1] + 1,
          dp[i - 1][j] + 1
        );
      }
    }
  }
  
  let minDistance = Infinity;
  for (let j = 0; j <= n; j++) {
    minDistance = Math.min(minDistance, dp[m][j]);
  }
  
  return minDistance;
};

// Enhanced fuzzy matching with word-level tolerance
export const fuzzyMatchWithWords = (query, text) => {
  // console.log('query', query, 'text', text);
  const queryWords = query.split(/\s+/).filter(word => word.length > 0);
  const textWords = text.split(/\s+/).filter(word => word.length > 0);
  const tolerance = 0.5;
  
  // If query has only one word, use character-level matching
  if (queryWords.length === 1) {
    
    const maxDistance = Math.floor(queryWords[0].length * tolerance);
    const distance = levenshteinInOrderSingle(queryWords[0], text);

    // console.log('distance', distance, 'maxDistance', maxDistance);
    return { pass:distance <= maxDistance, distance};
  }
  
  // For multiple words, check if query words appear in order with word-level gaps allowed
  let queryWordIndex = 0;
  let matchedWords = 0;
  
  for (let i = 0; i < textWords.length && queryWordIndex < queryWords.length; i++) {
    const queryWord = queryWords[queryWordIndex];
    const textWord = textWords[i];
    
    // Check if this text word matches the current query word (with character-level tolerance)
    
    
    
    const maxWordDistance = Math.floor(queryWord.length * tolerance);
    const wordDistance = levenshteinInOrderMulti(queryWord, textWord);
    
    if (wordDistance <= maxWordDistance) {
      matchedWords++;
      queryWordIndex++; // Move to next query word
    }
  }
  
  // Allow missing one word - if we matched all words or all but one
  return { pass:matchedWords >= queryWords.length - 1, distance:matchedWords };
};