

require('phantomjs-prebuilt');
const core = require('../../app/tasty-core.js'); 
  
describe("Tasty Core Engine", function() {
    beforeAll(function(done){
        //load asynchronous analyser, then launch tests
        core.loadAnalyser(done);  
    });
    
    it("will test a simple tasty script", function() {
        core.init('phantomjs');  
        core.execute('go to https://en.wikipedia.org/wiki/Selenium');
        core.execute('verify that firstHeading is Selenium');
        core.stop();
    });

});
