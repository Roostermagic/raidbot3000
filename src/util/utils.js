const path = require('path');

const voca = require('voca');

const migrateLatest = knex => {
  return knex.migrate.latest({
    directory: path.resolve(__dirname, '../migrations')
  });
};

const isInArray = (array, string) => {
  return array.indexOf(string.toLowerCase()) > -1;
};

const getDate = str => {
  const regexp = /\[(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](20)?\d\d\]/;

  if (voca.search(str, regexp) !== -1) {
    const date = regexp.exec(str);
    return voca.trim(date[0], '[]');
  } else {
    return false;
  }
};

module.exports = { migrateLatest, isInArray, getDate };
