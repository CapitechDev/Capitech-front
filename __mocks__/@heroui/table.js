const React = require('react');

const mockComponent = (name) => {
  return React.forwardRef((props, ref) => React.createElement('div', { ...props, ref }, props.children));
};

module.exports = {
  Table: mockComponent('Table'),
  TableHeader: mockComponent('TableHeader'),
  TableColumn: mockComponent('TableColumn'),
  TableBody: mockComponent('TableBody'),
  TableRow: mockComponent('TableRow'),
  TableCell: mockComponent('TableCell'),
};