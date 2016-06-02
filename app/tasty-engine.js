//assert for assertions in the tests
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
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