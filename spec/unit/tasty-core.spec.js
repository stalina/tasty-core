var mock = require('mock-require');
mock('../../app/tasty-analyser.js', { addPluginFile: function(file) {
  console.log('http.request called : '+file);
}});
mock('../../app/tasty-engine.js', { init: function(browser) {
  console.log('http.request called : '+browser);
}});

var engine = require('../../app/tasty-engine.js');
var analyser = require('../../app/tasty-analyser.js');
var core; 
describe("Tasty Core Engine", function() {

    beforeEach(function() {
       spyOn(analyser, 'addPluginFile');
       spyOn(engine, 'init');

       core = require('../../app/tasty-core.js');
    });

    afterAll(function() {
        mock.stopAll();
    });
    
    it("will load plugin at construction", function() {
        var callback = function(){};
        core.loadAnalyser(callback);
        expect(analyser.addPluginFile).toHaveBeenCalledWith('./plugin/common-instructions.conf.tty', callback);
    });
    
    it(" call init to init browser", function() {
        core.init('firefox');
        
        expect(engine.init).toHaveBeenCalledWith('firefox');
    });
});