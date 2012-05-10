var assert = require('assert')
  , config = require('../test-config')
  , app = require('../app')
  , index = require('../routes')
  , should = require('should')
  , zombie = require('zombie')
  , mongoose = require('mongoose')
  ;

var TEST_PORT = Math.floor(Math.random()*64511 + 1024);
var base_url = "http://localhost:" + TEST_PORT + "/";
var test_email = "testuser-" + Math.floor(Math.random()*1000000) + "@example.com";

before(function() {
   var server = app.init(config);
   server.listen(TEST_PORT);
   console.log("Server is listening on port %s", TEST_PORT);
 });

after(function(done) {

  var db_uri = process.env.MONGOLAB_URI || process.env.MONGODB_URI || config.default_db_uri;
  console.log("db_uri: " + db_uri);
  
  mongoose.connect(db_uri);

  mongoose.connection.collections['users'].drop( function(err) {
    if (err) throw err;
    console.log("dropped users collection");
    done();
  });
  
})

describe('front page', function() {
  it('should load', function (done) {
    this.timeout(3000);
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
    this.timeout(3000);
    var browser = new zombie();
    browser.visit(base_url, function () {
      assert.equal(browser.text("title"), "Poang");      
      if (browser.error) {
        console.dir("errors reported:", browser.errors);
      }
      done();
    });
  });
});

describe('registration', function () {
  it('should successfully register', function (done) {
    this.timeout(3000);
    var browser = new zombie();
    browser.visit(base_url + "register", function () {
      assert.ok(browser.query("#register"));
      // Fill email, password and submit form
      browser.
        fill("email", test_email).
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