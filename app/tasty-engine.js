"use strict";

let webdriver = require("selenium-webdriver"),


    driver;

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
        // By for selectors in the tasty tests script
        var By = webdriver.By,
        // assert for assertions in the tasty tests script
        assert = require("assert");
        
        eval(codeToExecute);
    }
};