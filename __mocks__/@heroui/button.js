const React = require('react');

const Button = jest.fn((props) => React.createElement('button', props, props.children || 'Button'));

module.exports = { Button };