#!/usr/bin/env node
let [_, __, ...pokemonTypes] = process.argv;

const {getChartOfType, types} = require("./pokemon");
const {boxString, addStringsHorizontally} = require('./utils');

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

let charts = pokemonTypes.map((t) => getChartOfType(types[t]))


function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}


const merged = charts.reduce((acc, cur) => mergeDeep(acc, cur), {})
const percentages = Object.entries(merged).map((entry) => {
  const values = {
    '0': 0.39,
    '0.5': 0.625,
    '2': 1.6
  }

  const withValuesMapped = entry[1].map((v) => values[v]);

  return {
    [entry[0]]: (withValuesMapped.reduce((acc, cur) => {
      return acc * cur
    }, 1) * 100)
  }

}).sort((a, b) => Object.entries(b)[0][1] - Object.entries(a)[0][1]);
const weaknesses = {};
const resistances = {};

let finalObject = Object.assign({}, ...percentages);
for (let type in Object.assign({}, ...percentages)) {
  let val = finalObject[type];
  if (val > 100) {
    weaknesses[type] = round(val, 2) + '%';
  }
  if (val < 100) {
    resistances[type] = round(val, 2) + '%';
  }
}

function removeConsecutiveRepitedString(array) {
  return array.filter((item, pos, arr) => {
    return pos === 0 || item !== arr[pos - 1];
  })
}

function removeEmptyLines(str) {
  return str.split('\n').filter((v) => v.trim() !== '').join('\n');
}

//==============================================================================================================


let weakBoxes = [];
for (let type in weaknesses) {
  weakBoxes.push(boxString(`${type.toUpperCase()}: ${weaknesses[type]}`, 'bold'));
}


let resistanceBoxes = [];
for (let type in resistances) {
  resistanceBoxes.push(boxString(`${type.toUpperCase()}: ${resistances[type]}`, 'rounded'));
}

const pokemonTypesString = removeEmptyLines(pokemonTypes.map((t) => boxString(t)).reduce((acc, cur) => acc + cur, ''));
// const weakNoLines = removeEmptyLines(weakBoxes);
// const resistanceNoLines = removeEmptyLines(resistanceBoxes);

let weakStrings = [];
let resistanceStrings = [];

for (let str of weakBoxes) {
  let lastArray = weakStrings[weakStrings.length - 1];
  if (!lastArray) {
    weakStrings.push([str]);
  } else {
    if (lastArray.length > 2) {
      weakStrings.push([str]);
    } else {
      lastArray.push(str);
    }
  }
}
for (let str of resistanceBoxes) {
  let lastArray = resistanceStrings[resistanceStrings.length - 1];
  if (!lastArray) {
    resistanceStrings.push([str]);
  } else {
    if (lastArray.length > 2) {
      resistanceStrings.push([str]);
    } else {
      lastArray.push(str);
    }
  }
}

function accumulate(arrays) {
  return arrays.map((arrOfStrings) => addStringsHorizontally(arrOfStrings)).reduce((acc, curr) => acc + '\n' + curr, '')
}

let weakness = accumulate(weakStrings);
let resistance = accumulate(resistanceStrings);


console.log(
  addStringsHorizontally(
    ['\nWeak to:\n' + removeEmptyLines(weakness) + '\n\n Resistant to:\n' + removeEmptyLines(resistance), `
  ╲
   ╲
    ╲
     =>  
    ╱
   ╱
  ╱
    `, pokemonTypesString],
    {
      align: 'center'
    }
  )
)
