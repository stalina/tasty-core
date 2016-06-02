var engine = require('tasty-engine.js');
var analyser = require('tasty-analyser.js');

//initialise common instruction once for all
analyser.addPluginFile('./plugin/common-instructions.conf.tty');
    
module.exports = {
    init(browser) {
        engine.init(browser);
    },
    stop() {
        engine.stop();
    },
    execute(tastyCode) {
        try {
            var seleniumCode = analyser.toSeleniumCode(tastyCode.split('\n'))
            engine.execute(seleniumCode);
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
};