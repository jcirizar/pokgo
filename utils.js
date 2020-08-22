const {bottomLeft, bottomRight, line, pipe, topLeft, topRight} = require("./characters");

const boxString = (str, modifier = 'default') => {
  return `\n${topLeft[modifier] + line[modifier].repeat(str.length + 2) + topRight[modifier]}\n${pipe[modifier] + ' ' + str + ' ' + pipe[modifier]}\n${bottomLeft[modifier] + line[modifier].repeat(str.length + 2) + bottomRight[modifier]}\n`
}

const addStringsHorizontally = (args, options = {
  align: 'top'
}) => {
  const tallestBox = args.reduce((acc, curr) => {
    const currentLength = curr.split('\n').length;
    return acc > currentLength ? acc : currentLength
  }, 0)


  const modified = [...new Array(tallestBox)].map((_, i) => {
    return args.map((box) => {
      const lines = box.split('\n');
      const boxHeight = lines.length;

      let boxShouldStartAtOffset;
      switch (options.align) {
        case 'center':
          //Removing +1 because we working with indexes.
          boxShouldStartAtOffset = Math.floor((tallestBox - boxHeight) / 2)// + 1;
          break;
        case 'bottom':
          boxShouldStartAtOffset = tallestBox - boxHeight;
          break;
        default:
          boxShouldStartAtOffset = 0;
      }

      const line = lines[i - boxShouldStartAtOffset];
      const lengths = lines.map((l) => l.length)
      const longestLineLength = Math.max(...lengths);
      return line ? line.padEnd(longestLineLength, ' ') : ' '.repeat(longestLineLength);
    })
  })
  return modified.map((arrays) => arrays.join('')).join('\n') + '\n';
}

function mergeDeep(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function removeConsecutiveRepeatedString(array) {
  return array.filter((item, pos, arr) => {
    return pos === 0 || item !== arr[pos - 1];
  })
}


function removeEmptyLines(str) {
  return str.split('\n').filter((v) => v.trim() !== '').join('\n');
}

module.exports = {
  addStringsHorizontally,
  boxString,
  mergeDeep,
  removeEmptyLines,
  removeConsecutiveRepeatedString,
  round
}
