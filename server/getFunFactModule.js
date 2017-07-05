
const dataSource = require('./data.json');

module.exports.getFunFact = () =>{
  console.log('Retrieveing fun fact for you!');
  return new Promise((resolve) => {
    const factIdx = Math.floor((Math.random() * dataSource.length) + 0);
    resolve(dataSource[factIdx]);
  });
};
