"use strict";

// assert for assertions in the tasty tests script
const assert = require("assert"),
    webdriver = require("selenium-webdriver");

    
let driver;

module.exports = {
    init (browser) {
        
        driver = new webdriver.Builder().forBrowser(browser).build();
    },
    getDriver () {
        
        return driver;
    },
    stop () {
        
        driver.quit();
    },
    execute (codeToExecute) {
        
        // By for selectors in the tasty tests script
        let By = webdriver.By;   
        
        eval(codeToExecute);
    }
};
