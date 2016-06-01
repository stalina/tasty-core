//fs is to manage file from the fileSystem
var fs = require('fs');
/*
Tasty code will contains a map of instructions with their parameters and corresponding code line.
its is mapped by the full instruction line
example :
 {
    'my instructions with $oneParame or $moreParameters' : {
        parameters : [ '$oneParame', '$moreParameters'],
        codeLines : [
            'driver.doSomething(),
            'myOtherCustom instruction $oneParam',
            'driver.doSomethingElse($moreParameters)'
        ]
    }
  }
*/
var tastyCode = [];

exports.addPluginFile=function(filePath, callback){
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      }else {
        tastyCode = _extractTastyCode(data.split('\n'));
      }
      callback();
    });
};

exports.getTastyCode=function(){
    return tastyCode;
};

exports.toSeleniumCode=function(tastyScriptLinesArray){
    var seleniumCode = [];
    for(var i=0;i<tastyScriptLinesArray.length;i++){
        var tastyLine = tastyScriptLinesArray[i].trim();
        seleniumCode = seleniumCode.concat( _getSeleniumCodeFrom(tastyLine));
    }
    return seleniumCode.join('\n');
};

_getSeleniumCodeFrom=function(tastyLine){
    for (var instruction in tastyCode) {
        var isMatching = tastyLine.match(new RegExp(tastyCode[instruction].regexMatcher));
        if(isMatching){
            var seleniumCode = [];
            var codeLines = tastyCode[instruction].codeLines;
            for(var i=0;i<codeLines.length;i++){
               var codeLine = _replaceTastyParameters(codeLines[i], tastyCode[instruction].parameters ,isMatching);
               seleniumCode.push(codeLine);
            }
            return seleniumCode;
        }
    }
};

_replaceTastyParameters=function(codeLine, parametersArray, matcherArray){
    for(var i=0;i<parametersArray.length;i++){
        codeLine = codeLine.replace(parametersArray[i], "'"+matcherArray[i+1]+"'");
    }
    return codeLine;
};

_extractTastyCode=function(fileLinesArray){
    var instructions = [];

    var currentInstruction;
    var currentParameters;
    var currentCodeLines = [];
    var currentRegexMatcher;
    var instructionStarted

    for(var i=0;i<fileLinesArray.length;i++){
        var line = fileLinesArray[i].trim();

        if(line.endsWith('*{')){
            currentInstruction = line.substring(0, line.length-2).trim();
            currentParameters = currentInstruction.match(/\$\w*/gi);
            currentRegexMatcher = '^' + currentInstruction.replace(new RegExp('\\'+currentParameters.join('|\\'), 'g'), '(.*)');
            currentCodeLines = [];
        }else if(line.startsWith('}*')){
            instructions[currentInstruction] = {
                'parameters' : currentParameters,
                'codeLines'  : currentCodeLines,
                'regexMatcher'  : currentRegexMatcher
            };
        }else if(line){
            currentCodeLines.push(line);
        }
    }
    return instructions;

};

//    console.log("instructions ->"+ instructions[currentInstruction].parameters);
//    instructions[currentInstruction].codeLines.map(function(value){
//                console.log("value ->"+value);
//        });
//        for (var key in instructions) {
//        console.log("key ->"+key);
//        }