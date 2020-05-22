/* Test Suits for parser testing */
import TestUtil from "./TestUtil";
let expect = require('chai').expect;
let assert = require('chai').assert;

export interface TestInput {
    title: string;
    input: any;
    isInputValid: boolean;
    result: any;
    filename: string;
}

describe('Parsing Tests', function() {

    it("Basic test", function() {
        let a = 4;
        assert.equal(5, a);
    });

    let testFiles: TestInput[] = [];

    // load files into list of TestInput objects
    beforeAll(function () {
        try {
            testFiles = TestUtil.readTestFiles();
        } catch (err) {
            expect.fail("", "", `Failed to read test files. ${err}`);
        }
    });

    // loop through TestInput objects, run main and compare
    // it("Run Test Cases", function () {
    //     for (const test of testFiles) {
    //         it(`[${test.filename}] ${test.title}`, function (done) {
    //             const resultChecker = TestUtil.getResultChecker(test, done);
    //             // call main here
    //                 .then(resultChecker)
    //                 .catch(resultChecker);
    //         });
    //     }
    // });
});