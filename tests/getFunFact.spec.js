global.__base = require('app-root-dir').get();

const request = require('supertest-as-promised');
const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
chai.use(chaiAsPromised);
const expect = chai.expect;

const getFunFactModule = require(`${__base}/server/getFunFactModule`);

describe('Get fun fact endpoint unit test', () => {

  const agent = request.agent(require(`${__base}/server`));

  it('should return a random frase', function(){

    return agent.get('/api/getFunFact')
    .expect(200)
    .then((res) => {
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('text');
     })
    .catch((err) => { throw err; });

  });
});

describe('Get fun fact module unit test', () => {

  it('should return a random frase', function(){

    return expect(getFunFactModule.getFunFact()).to.be.fulfilled
    .then((response) => {
      expect(response).to.have.property('id');
      expect(response).to.have.property('text');
    });
  });
});
