const React = require('react');

const MDEditor = React.forwardRef((props, ref) => {
  const {
    textareaProps,
    value,
    onChange,
    hideToolbar,
    previewOptions,
    isLoading,
    ...restProps
  } = props;
  return React.createElement('div', { ...restProps, ref },
    React.createElement('textarea', {
      ...textareaProps,
      value: value || '',
      onChange: (e) => onChange && onChange(e.target.value),
    })
  );
});

module.exports = MDEditor;