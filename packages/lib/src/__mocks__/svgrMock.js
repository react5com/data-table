const React = require('react');

module.exports = 'svg-mock';
module.exports.ReactComponent = () => React.createElement('svg', { 'data-testid': 'mock-svg' });