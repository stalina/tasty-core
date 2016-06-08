var mock = require('mock-require');

var engine;
var analyser;
var core; 
describe("Tasty Core Engine", function() {
    
    beforeAll(function() {
        mock('../../app/tasty-analyser.js', { 
            addPluginFile: function(file) { },
            addParamFile: function(file) { },
            toSeleniumCode: function(tastyCode) { }
        });
        mock('../../app/tasty-engine.js', { 
            init: function(browser) { },
            stop: function() { },
            execute: function(seleniumCode) { }
        });

        engine = require('../../app/tasty-engine.js');
        analyser = require('../../app/tasty-analyser.js');
        core = require('../../app/tasty-core.js');
    });

    beforeEach(function() {
       spyOn(analyser, 'addPluginFile');
       spyOn(analyser, 'addParamFile');
       spyOn(analyser, "toSeleniumCode").and.returnValue('seleniumCode');
       spyOn(engine, 'init');
       spyOn(engine, 'stop');
       spyOn(engine, 'execute');
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
    
    it(" stops the engine", function() {
        core.stop();
        
        expect(engine.stop).toHaveBeenCalled();
    });
    
    it(" translate and execute", function() {
        core.execute('tastyCode');
        
        expect(analyser.toSeleniumCode).toHaveBeenCalledWith(['tastyCode']);
        expect(engine.execute).toHaveBeenCalledWith('seleniumCode');
    });
    
     it(" adds param files", function() {
        core.addParamFile('aFile');
        
        expect(analyser.addParamFile).toHaveBeenCalledWith('aFile');
    });
});