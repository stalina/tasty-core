// fs is to manage file from the fileSystem
var fs = require("fs");
/**
 * Tasty code will contains a map of instructions with their parameters and corresponding code line.
 * its is mapped by the full instruction line
 * example :
 *{
 *     "my instructions with $oneParame or $moreParameters" : {
 *        parameters : [ "$oneParame", "$moreParameters"],
 *        regexMatcher : "my instructions with (.*) or (.*)"
 *        codeLines : [
 *            "driver.doSomething(),
 *            "myOtherCustom instruction $oneParam",
 *            "driver.doSomethingElse($moreParameters)"
 *        ]
 *    }
 *  }
 */
var tastyCode = [];

exports.addPluginFile = function addPluginFile (filePath, callback) {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (!err) {
        tastyCode = _extractTastyCode(data.split("\n"));
      }
      if (callback){
        return callback();
      }
    });
};

exports.getTastyCode = function getTastyCode () {
    return tastyCode;
};

exports.toSeleniumCode = function toSeleniumCode (tastyScriptLinesArray) {
    var seleniumCode = [];
    for (var i=0;i<tastyScriptLinesArray.length;i++) {
        var tastyLine = tastyScriptLinesArray[i].trim();
        seleniumCode = seleniumCode.concat( _getSeleniumCodeFrom(tastyLine));
    }
    return seleniumCode.join("\n");
};

function _getSeleniumCodeFrom (tastyLine) {
    for (var instruction in tastyCode) {
        if (tastyCode.hasOwnProperty(instruction)) {
            var isMatching = tastyLine.match(new RegExp(tastyCode[instruction].regexMatcher));
            if (isMatching) {
                var seleniumCode = [];
                var codeLines = tastyCode[instruction].codeLines;
                for (var i=0;i<codeLines.length;i++) {
                var codeLine = _replaceTastyParameters(codeLines[i], tastyCode[instruction].parameters ,isMatching);
                seleniumCode.push(codeLine);
                }
                return seleniumCode;
            }
        }
    }
};

function _replaceTastyParameters (codeLine, parametersArray, matcherArray) {
    for (var i=0;i<parametersArray.length;i++) {
        codeLine = codeLine.replace(parametersArray[i], "'"+matcherArray[i+1]+"'");
    }
    return codeLine;
};

function _extractTastyCode (fileLinesArray){
    var instructions = [];

    var currentInstruction;
    var currentParameters;
    var currentCodeLines = [];
    var currentRegexMatcher;

    for (var i=0;i<fileLinesArray.length;i++) {
        var line = fileLinesArray[i].trim();

        if (line.endsWith("*{")) {
            currentInstruction = line.substring(0, line.length-2).trim();
            currentParameters = currentInstruction.match(/\$\w*/gi);
            currentRegexMatcher = "^" + currentInstruction.replace(new RegExp("\\"+currentParameters.join("|\\"), "g"), "(.*)");
            currentCodeLines = [];
        } else if (line.startsWith("}*")) {
            instructions[currentInstruction] = {
                "parameters" : currentParameters,
                "codeLines"  : currentCodeLines,
                "regexMatcher"  : currentRegexMatcher
            };
        } else if (line) {
            currentCodeLines.push(line);
        }
    }
    return instructions;
};
