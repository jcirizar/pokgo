const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']
const [normal, fighting, flying, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric, psychic, ice, dragon, dark, fairy] = types;

const damage = {
  [normal]: {
    '0.5': [rock, steel],
    '0': [ghost],
    '2': []
  },
  [fighting]: {
    '0.5': [flying, poison, bug, psychic, fairy],
    '0': [ghost],
    '2': [normal, rock, steel, ice, dark]
  },
  [flying]: {
    '0.5': [rock, steel, electric],
    '0': [],
    '2': [fighting, bug, grass]
  },
  [poison]: {
    '0.5': [poison, ground, rock, ghost],
    '0': [steel],
    '2': [grass, fairy]
  },
  [ground]: {
    '0.5': [bug, grass],
    '0': [flying],
    '2': [poison, rock, steel, fire, electric]
  },
  [rock]: {
    '0.5': [fighting, ground, steel],
    '0': [],
    '2': [flying, bug, fire, ice]
  },
  [bug]: {
    '0.5': [fighting, flying, poison, ghost, steel, fire, fairy],
    '0': [],
    '2': [grass, psychic, dark]
  },
  [ghost]: {
    '0.5': [dark],
    '0': [normal],
    '2': [ghost, psychic]
  },
  [steel]: {
    '0.5': [steel, fire, water, electric],
    '0': [],
    '2': [rock, ice, fairy]
  },
  [fire]: {
    '0.5': [rock, fire, water, dragon],
    '0': [],
    '2': [bug, steel, grass, ice]
  },
  [water]: {
    '0.5': [water, grass, dragon],
    '0': [],
    '2': [ground, rock, fire]
  },
  [grass]: {
    '0.5': [flying, poison, bug, steel, fire, grass, dragon],
    '0': [],
    '2': [ground, rock, water]
  },
  [electric]: {
    '0.5': [grass, electric, dragon],
    '0': [ground],
    '2': [flying, water]
  },
  [psychic]: {
    '0.5': [steel, psychic],
    '0': [dark],
    '2': [fighting, poison]
  },
  [ice]: {
    '0.5': [steel, fire, water, ice],
    '0': [],
    '2': [flying, ground, grass, dragon]
  },
  [dragon]: {
    '0.5': [steel],
    '0': [fairy],
    '2': [dragon]
  },
  [dark]: {
    '0.5': [fighting, dark, fairy],
    '0': [],
    '2': [ghost, psychic]
  },
  [fairy]: {
    '0.5': [poison, steel, fire],
    '0': [],
    '2': [fighting, dragon, dark]
  }
}

function getChartOfType(type1) {

  const effective = damage[type1]['2'];
  const ineffective = damage[type1]['0.5'];
  const noDamage = damage[type1]['0'];

  // Attacking
  // console.log('Attacking:')
  // console.log('Effective against  ', effective)
  // console.log('Ineffective against', ineffective)
  // if (noDamage.length) {
  //   console.log('Useless against    ', noDamage)
  // }


  let weakAgainst = Object.entries(damage).filter(entry => {
    let effectiveness = entry[1];
    return effectiveness['2'].includes(type1);

  });


  let resistantAgainst = Object.entries(damage).filter(entry => {
    let effectiveness = entry[1];
    return effectiveness['0.5'].includes(type1);

  });

  let godlyAgainst = Object.entries(damage).filter(entry => {
    let effectiveness = entry[1];
    return effectiveness['0'].includes(type1);

  });


  let chart = {};
  for (let entry of [...weakAgainst, ...resistantAgainst, ...godlyAgainst]) {
    const type = entry[0];
    const value = Object.entries(entry[1]).filter((arr) => {
      return arr[1].includes(type1);
    })[0][0];
    if (chart[type]) {
      chart[type].push(value);
    } else {
      chart[type] = [value];
    }
  }
  return chart;

}

module.exports = {
  getChartOfType,
  typesArray: types,
  types: {
    normal,
    fighting,
    flying,
    poison,
    ground,
    rock,
    bug,
    ghost,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    ice,
    dragon,
    dark,
    fairy
  }
}
