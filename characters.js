const CHARACTER = {
  toString() {
    return this.default
  },
  repeat() {
    return String.prototype.repeat.apply(this, arguments);
  }
}


const line = Object.create(CHARACTER, {
  default: {
    value: '─',
    enumerable: true
  },
  bold: {
    value: '━',
    enumerable: true
  },
  rounded: {
    value: '─',
    enumerable: true
  },

});

const pipe = Object.create(CHARACTER, {
  default: {
    value: '│',
    enumerable: true
  },
  bold: {
    value: '┃',
    enumerable: true
  },
  rounded: {
    value: '│',
    enumerable: true
  },
});

const topLeft = Object.create(CHARACTER, {
  default: {
    value: '┌',
    enumerable: true
  },
  bold: {
    value: '┏',
    enumerable: true
  },
  rounded: {
    value: '╭',
    enumerable: true
  }
});

const topRight = Object.create(CHARACTER, {
  default: {
    value: '┐',
    enumerable: true
  },
  bold: {
    value: '┓',
    enumerable: true
  },
  rounded: {
    value: '╮',
    enumerable: true
  }
});

const bottomLeft = Object.create(CHARACTER, {
  default: {
    value: '└',
    enumerable: true
  },
  bold: {
    value: '┗',
    enumerable: true
  },
  rounded: {
    value: '╰',
    enumerable: true
  }
});

const bottomRight = Object.create(CHARACTER, {
  default: {
    value: '┘',
    enumerable: true
  },
  bold: {
    value: '┛',
    enumerable: true
  },
  rounded: {
    value: '╯',
    enumerable: true
  }
});

module.exports = {
  line,
  pipe,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
}
