/*global describe, xdescribe, beforeEach, afterEach, it, xit, expect, spyOn, Cohere, require */
describe('Aspectos basic behaviour', function() {
    "use strict";

    var aspectos = require('aspectos'),
        testValue;

    beforeEach(function() {
        testValue = '';
    });

    afterEach(function() {
        testValue = '';
    });

    it('applies "before" aspect correctly', function() {
        var testObject = {
            write: function() {
                testValue += ' 2';
            }
        };
        testObject.write = aspectos.before(testObject, 'write', function() {
            testValue += '1';
        });
        testObject.write();
        expect(testValue).to.equal('1 2');
    });

    it('applies "after" aspect correctly', function() {
        var testObject = {
            write: function() {
                testValue += '1';
            }
        };
        testObject.write = aspectos.after(testObject, 'write', function() {
            testValue += ' 2';
        });
        testObject.write();
        expect(testValue).to.equal('1 2');
    });

    it('applies "around" aspect correctly', function() {
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
        expect(testValue).to.equal('1 2');
    });

    it('when "before" must pass through original arguments correctly', function() {
        var testObject = {
            write: function(value) {
                testValue += value;
            }
        };
        testObject.write = aspectos.before(
            testObject,
            'write',
            function(value) {
                testValue += value;
            }

        );
        testObject.write('text');
        expect(testValue).to.equal('texttext');
    });

    it('when "after" must pass through original arguments correctly', function() {
        var testObject = {
            write: function(value) {
                testValue += value;
            }
        };
        testObject.write = aspectos.after(
            testObject,
            'write',
            function(value) {
                testValue += value;
            }

        );
        testObject.write('text');
        expect(testValue).to.equal('texttext');
    });

    it('when "around" must pass through original arguments correctly', function() {
        var testObject = {
            write: function(value) {
                testValue += value;
            }
        };
        testObject.write = aspectos.around(
            testObject,
            'write',
            [
                function(value) {
                    testValue += value;
                },
                function(value) {
                    testValue += value;
                }
            ]
        );
        testObject.write('text');
        expect(testValue).to.equal('texttexttext');
    });

    it('"after" must receive original return values correctly', function() {
        var testObject = {
            write: function(value) {
                testValue += value;
                return value.toUpperCase();
            }
        };
        testObject.write = aspectos.after(
            testObject,
            'write',
            function(value, value2) {
                testValue += value;
                testValue += value2;
            }

        );
        testObject.write('text');
        expect(testValue).to.equal('texttextTEXT');
    });

    it('"around" must receive original return values correctly', function() {
        var testObject = {
            write: function(value) {
                testValue += value;
                return value.toUpperCase();
            }
        };
        testObject.write = aspectos.around(
            testObject,
            'write',
            [
                function(value) {
                    testValue += value;
                },
                function(value, value2) {
                    testValue += value;
                    testValue += value2;

                }
            ]
        );
        testObject.write('text');
        expect(testValue).to.equal('texttexttextTEXT');
    });
});