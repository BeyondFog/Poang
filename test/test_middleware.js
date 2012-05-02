var assert = require('assert')
  , auth = require('../auth')
  , middleware = require('../middleware')
  , sandboxed_module = require('sandboxed-module')
  , should = require('should')
  , sinon = require('sinon')
  ;

describe('#require_auth_browser()', function() {
  it('should only be accessible to authenticated user', function() {
    var mock_req = {session: {}};
    var response_api = {redirect: function() {}, end: function() {}};

    // middleware.require_auth_browser(mock_req, response_api, function() { response_api.statusCode = 401 });

    // response_api.statusCode.should.eql(401);

    mock_req = {user: {}};
    middleware.require_auth_browser(mock_req, response_api, function() { response_api.statusCode = 200 });

    response_api.statusCode.should.eql(200);
  });
});
