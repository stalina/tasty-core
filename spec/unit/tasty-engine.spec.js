var mock = require('mock-require');

var engine;

var buildCalled = false;
var stopCalled = false;
       
describe("Tasty Engine", function() {
    beforeAll(function() {
        mock('selenium-webdriver', "./mock/mockSeleniumDriver.js");
        engine = require('../../app/tasty-engine.js');
    });
    
    beforeEach(function() {
        engine.init(function(method){
            buildCalled = (method === 'forBrowser');
            stopCalled = (method === 'quit');
        });
    });
    
    afterAll(function() {
       mock.stopAll();
    });

    it(" inits selenium driver", function() {
        expect(buildCalled).toBe(true);
    });
    
    it(" stops selenium driver", function() {
        engine.stop();
        expect(stopCalled).toBe(true);
    });
    
    it(" executes code", function() {
        engine.execute('expect(true).toBe(true);');
    });

});