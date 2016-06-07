"use strict";

var engine = require("./tasty-engine.js");
var analyser = require("./tasty-analyser.js");

module.exports = {
    //initialise common instruction once for all
    loadAnalyser(onAnalyserReady){
        analyser.addPluginFile("./plugin/common-instructions.conf.tty", onAnalyserReady);
    },
    
    init(browser) {
        engine.init(browser);
    },
    stop() {
        engine.stop();
    },
    execute(tastyCode) {
        try {
            var seleniumCode = analyser.toSeleniumCode(tastyCode.split("\n"));
            
            engine.execute(seleniumCode);
        }
        catch (exception) {
            console.error(exception.message);
        }
    }
};