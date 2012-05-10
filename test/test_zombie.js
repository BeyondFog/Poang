var assert = require('assert')
  , app = require('../app')
  , index = require('../routes')
  , should = require('should')
  , zombie = require('zombie')
  ;

var TEST_PORT = Math.floor(Math.random()*65535)
var base_url = "http://localhost:" + TEST_PORT + "/";


before(function() {
   var server = app.init();
   server.listen(TEST_PORT);
   console.log("Server is listening on port %s", TEST_PORT);
 });

describe('front page', function() {
  it('should load', function (done) {
    var browser = new zombie();
    browser.visit(base_url, function () {
      assert.ok(browser.success);
      if (browser.error) {
        console.dir("errors reported:", browser.errors);
      }
    done();
    });
  });
  
  it('should have the page title Poang', function(done) {
    var browser = new zombie();
    browser.visit(base_url, function () {
      assert.equal(browser.text("title"), "Poang");      
      if (browser.error) {
        console.dir("errors reported:", browser.errors);
      }
      done();
    });
  });
  
  it('should successfully register', function (done) {
    var browser = new zombie();
    browser.visit(base_url + "register", function () {
      assert.ok(browser.query("#register"));
      // Fill email, password and submit form
      browser.
        fill("email", "test@example.com").
        fill("password", "secret").
        pressButton("register", function() {

          // Form submitted, new page loaded.
          assert.ok(browser.success);
          assert.equal(browser.location.pathname, "/");
          done();
        });    

    });
  });

});