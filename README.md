[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e344b9e77d4f4dbca92ca6300df3dce7)](https://www.codacy.com/app/antoine-stalin/tasty-core?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=stalina/tasty-core&amp;utm_campaign=Badge_Grade)

# tasty-core
Core of the tasty test framework : test made Natural

## Prerequiste

NodeJs is installed  (V5 +)

## Install

`cd tasty-code`

`npm install`

PhantomJs binary needs to be in your PATH, for this purpose, you can add symbolic link to the executable :
`ln -s <path to tasty-code>/node_modules/phantomjs-prebuilt/bin/phantomjs /usr/bin/pahntomjs`

OPTIONAL, you can do the same with the chrome driver (in case you want to run test in Chrome) :
`ln -s <path to tasty-code>/node_modules/chromedriver/bin/chromedriver /usr/bin/chromedriver`

## Run Tests

`gulp test`

## Run Integration Tests

`gulp it`

## Run everything

`gulp`