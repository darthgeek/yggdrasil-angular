// Wrapper for all unit tests to measure test coverage.
var testsContext = require.context('..', true, /[.]spec[.]js$/);
testsContext.keys().forEach(testsContext);
