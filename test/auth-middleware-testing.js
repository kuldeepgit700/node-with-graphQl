const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

describe('auth middleware', function () {

  it('Should throw an error if no authorization header is passed', function () {

    const req = {

      get: function (headerName) {
        return null;
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw("Not authenticated.");

  });

  it('Should throw an error if string pass', function () {

    const req = {

      get: function (headerName) {
        return 'xyz';
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw("jwt must be provided");

  });

  it('Should yield a userId after decoding the token', function () {

    const req = {

      get: function (headerName) {
        return 'Bearer shdhsdsdsjdjsd';
      }
    };

    // jwt.verify = function () {
    //   return userId = 'abc';
    // };

    sinon.stub(jwt,'verify');
    jwt.verify.returns({userId:'abc'});
    authMiddleware(req, {}, () => { })
    expect(req).to.have.property("userId");
    jwt.verify.restore();

  });




});