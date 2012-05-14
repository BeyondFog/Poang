var assert = require('assert')
  , auth = require('../auth')
  , middleware = require('../middleware')
  , should = require('should')
  , sinon = require('sinon')
  ;

describe('#require_auth_browser()', function() {
  it('should only be accessible to authenticated user', function() {
    
    // this mock_req has NO user object which means the user is not logged in
    var mock_req = {session: {}};
    var response_api = {redirect: function() {}, end: function() {}};
    
    sinon.spy(response_api,"redirect");

    middleware.require_auth_browser(mock_req, response_api, function() { response_api.statusCode = 200 });

    response_api.statusCode.should.eql(401);
    response_api.redirect.getCall(0).args[0].should.equal("/login");

    // this mock_req has a user object which means the user is logged in
    mock_req = {user: {}};
    middleware.require_auth_browser(mock_req, response_api, function() { response_api.statusCode = 200 });

    response_api.statusCode.should.eql(200);
  });
});
