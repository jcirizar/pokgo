#!/usr/bin/env node
const {removeEmptyLines} = require("./utils");
const {round} = require("./utils");
const {mergeDeep} = require("./utils");
let [_, __, ...pokemonTypes] = process.argv;


const {getChartOfType, types, typesArray} = require("./pokemon");
const {boxString, addStringsHorizontally} = require('./utils');

let typesLowerCase = pokemonTypes.map((type) => type.toLowerCase());

if (!typesLowerCase.every((typeIn) => typesArray.includes(typeIn))) {
  console.error('Invalid Pokemon Type(s)');
  console.log('Please enter one or multiple of the next')
  console.log(typesArray);
  console.log(
    addStringsHorizontally(
      ['Example:', boxString('pokgo dragon dark')],
      {
        align: 'center'
      }
    )
  );
  return process.exit(1);
}

let charts = typesLowerCase.map((t) => getChartOfType(types[t]))

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


let weakBoxes = [];
for (let type in weaknesses) {
  weakBoxes.push(boxString(`${type.toUpperCase()}: ${weaknesses[type]}`, 'bold'));
}

let resistanceBoxes = [];
for (let type in resistances) {
  resistanceBoxes.push(boxString(`${type.toUpperCase()}: ${resistances[type]}`, 'rounded'));
}

const pokemonTypesString = removeEmptyLines(typesLowerCase.map((t) => boxString(t.toUpperCase())).reduce((acc, cur) => acc + cur, ''));

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
