const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

const emojis = {
  '\u0031\u20E3': 1,
  '\u0032\u20E3': 2,
  '\u0033\u20E3': 3,
  '\u0034\u20E3': 4,
  '\u0035\u20E3': 5,
  '\u0036\u20E3': 6,
  '\u0037\u20E3': 7,
  '\u0038\u20E3': 8,
  '\u0039\u20E3': 9,
  '\u0030\u20E3': 0
};

module.exports = { getKeyByValue, emojis };
