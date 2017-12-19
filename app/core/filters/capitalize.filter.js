/**
 * Angular filter for capitalizing first letter of strings.
 * @return {function: string}
 */
export default () => (input) =>
  (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
