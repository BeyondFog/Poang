var assert = require('assert')
  , index = require('../routes')
  , should = require('should')
  , zombie = require('zombie')
  ;

describe('front page', function() {
  it('should load', function (done) {
    var browser = new zombie();
    browser.visit("http://localhost:3000/", function () {
      assert.ok(browser.success);
      if (browser.error) {
        console.dir("errors reported:", browser.errors);
      }
    done();
    });
  });
  
  it('should have the page title Poang', function(done) {
    var browser = new zombie();
    browser.visit("http://localhost:3000/", function () {
      assert.equal(browser.text("title"), "Poang");      
      if (browser.error) {
        console.dir("errors reported:", browser.errors);
      }
      done();
    });
  });
  
  it('should successfully register', function (done) {
    var browser = new zombie();
    browser.visit("http://localhost:3000/register", function () {
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