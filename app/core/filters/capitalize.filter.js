

export default () => (input) =>
  (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
