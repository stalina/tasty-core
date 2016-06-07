"use strict";

exports.Builder = class Builder {
    
    constructor() { 
        this.jasmineCallback = null;
    }
    
    forBrowser(callback) {
        this.jasmineCallback = callback;
        this.jasmineCallback('forBrowser');
        return this;
    }
    
    build() {
        return this;
    }
    
    quit() {
        this.jasmineCallback('quit');
        return this;
    }
};

exports.By = '';

