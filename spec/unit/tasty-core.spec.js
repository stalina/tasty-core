var mock = require('mock-require');
mock('tasty-analyser.js', { addPluginFile: function(file) {
  console.log('http.request called : '+file);
}});
mock('tasty-engine.js', { init: function(browser) {
  console.log('http.request called : '+browser);
}});

var engine = require('tasty-engine.js');
var analyser = require('tasty-analyser.js');
var core; 
describe("Tasty Core Engine", function() {

    beforeEach(function() {
       spyOn(analyser, 'addPluginFile');
       spyOn(engine, 'init');

       core = require('../../app/tasty-core.js');
    });
    
    it("will load plugin at construction", function() {
        expect(analyser.addPluginFile).toHaveBeenCalledWith('./plugin/common-instructions.conf.tty');
    });
    
    it(" call init to init browser", function() {
        core.init('firefox');
        
        expect(engine.init).toHaveBeenCalledWith('firefox');
    });
});