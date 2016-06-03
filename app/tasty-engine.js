var webdriver = require('selenium-webdriver');
//By for selectors in the tasty tests script
var By = webdriver.By;
//assert for assertions in the tasty tests script
var assert = require('assert');
var driver;

module.exports = {
    init(browser) {
        driver = new webdriver.Builder().forBrowser(browser).build();
    },
    getDriver () {
        return driver;
    },
    stop() {
        driver.quit();
    },
    execute(codeToExecute) {
        eval(codeToExecute);
    }
};