# Aspectos [![Build Status](https://secure.travis-ci.org/lawrencec/aspectos.png)](http://travis-ci.org/lawrencec/aspectos)


A simple library to provide basic AOP (Aspect Oriented Programming) functionality to your scripts. It allows one to decorate
methods and functions with behaviours that are run either before, after or around (before and after) the decorated
method or function.

## Cloning

The Jasmine testing framework is used for the tests and is added as a submodule.

You can either clone this repo with the submodules in one command like so:

    git clone REPO_URL --recursive

or separately

    git clone REPO_URL
    <cd clonedrepo>
    git submodule update --init --recursive

## Usage

Aspectos provides three methods to provide the basic aspects to your objects:
 <code>before()</code>, <code>after()</code>, <code>around()</code>. These allow
 you to run other function before, after or around any method respectively.


### before


    var testObject = {
        write: function() {
            testValue += ' 2';
        }
    };
    testObject.write = aspectos.before(testObject, 'write', function() {
        testValue += '1';
    });
    testObject.write();
    // should write out '1 2'

## after

    var testObject = {
        write: function() {
            testValue += '1';
        }
    };
    testObject.write = aspectos.after(testObject, 'write', function() {
        testValue += ' 2';
    });
    testObject.write();
    // should write out '1 2'

## around
    var testObject = {
        write: function() {
            testValue += ' ';
        }
    };
    testObject.write = aspectos.around(
        testObject,
        'write',
        [
            function() {
                testValue += '1';
            },
            function() {
                testValue += '2';
            }
        ]
    );
    testObject.write();
    //should write '1 2'

## Tests

See the index.html file in the tests directory

If you have testem installed run it from the root directory of the repo.

    testem

or


    testem ci -b Chrome

Mocha tests can be run with phantomjs (note the ci hash parameter):

    phantomjs ./lib/test-helpers/run-mocha.js file://localhost/$(pwd)/aspectos/src/tests/index.html#ci