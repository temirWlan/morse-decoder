const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

// const expression = '00000010111110101010111111111111101010101111111110001010111010101010101111111111';

// разделить массивами

function decode(expr) {
  const grouppedArr = [];

  function groupArr(arr, n) {
    let someArr = [];
    
    for (let i = 0; i < n; i++) {
        someArr.push(arr[i]);
    }
    
    grouppedArr.push(someArr);
    arr.splice(0, n)
    
    if (arr.length > 0) {
      groupArr(arr, n);
    }
    
    return grouppedArr;
  }

  const arr = expr.split('');
  const strArr = groupArr(arr, 10).map(arr => arr.join(''));
  const cleanArr = strArr.map(str => str.replace(/\*{10}/g, ' ').replace(/00/g, ''));
  const morseArr = cleanArr.map(str => str.replace(/10/g, '.').replace(/11/g, '-'));
  const morseTable = Object.keys(MORSE_TABLE);
  const letterArr = [];
  
  for (let i = 0; i < morseArr.length; i++) {
    if (morseArr[i] === ' ') {
      letterArr.push(' ');
    }
     
    for (let k = 0; k < morseTable.length; k++) {
      if (morseArr[i] === morseTable[k]) {
        letterArr.push(MORSE_TABLE[morseTable[k]]);
      }    
    }
  } 
  
  return letterArr.reduce((a, b) => a + b, '');
}

module.exports = {
  decode
};