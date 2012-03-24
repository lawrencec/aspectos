# Aspectos

A simple library to provide basic AOP (Aspect Oriented Programming) functionality to your scripts.

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