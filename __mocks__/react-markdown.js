const React = require('react');

const ReactMarkdown = React.forwardRef((props, ref) => {
  // Extract text content from HTML-like strings
  const textContent = props.children ? props.children.replace(/<[^>]*>/g, '') : '';
  return React.createElement('div', { ...props, ref }, textContent);
});

module.exports = ReactMarkdown;