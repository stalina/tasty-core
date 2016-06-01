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
        try {
            eval(codeToExecute);
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
};