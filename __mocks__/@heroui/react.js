const React = require('react');

const mockComponent = (name) => {
  return React.forwardRef((props, ref) => React.createElement('div', { ...props, ref }, props.children));
};

module.exports = {
  Button: mockComponent('Button'),
  Dropdown: mockComponent('Dropdown'),
  DropdownItem: mockComponent('DropdownItem'),
  DropdownMenu: mockComponent('DropdownMenu'),
  DropdownTrigger: mockComponent('DropdownTrigger'),
  Link: mockComponent('Link'),
  Popover: mockComponent('Popover'),
  PopoverTrigger: mockComponent('PopoverTrigger'),
  PopoverContent: mockComponent('PopoverContent'),
  // Add other components as needed
};