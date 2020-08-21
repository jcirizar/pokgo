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
  return modified.map((arrays) => arrays.join('')).join('\n')+ '\n';
}

module.exports = {
  boxString,
  addStringsHorizontally
}
