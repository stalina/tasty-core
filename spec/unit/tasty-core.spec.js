var mock = require('mock-require');

var engine;
var analyser;
var core; 
describe("Tasty Core Engine", function() {
    
    beforeAll(function() {
        mock('../../app/tasty-analyser.js', { addPluginFile: function(file) { }});
        mock('../../app/tasty-engine.js', { init: function(browser) { }});

        engine = require('../../app/tasty-engine.js');
        analyser = require('../../app/tasty-analyser.js');
        core = require('../../app/tasty-core.js');
    });

    beforeEach(function() {
       spyOn(analyser, 'addPluginFile');
       spyOn(engine, 'init');

    });

    afterAll(function() {
        mock.stopAll();
        mock.stop('../../app/tasty-engine.js');
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