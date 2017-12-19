import moment from 'moment';

/**
 * Angular filter that converts date to JS Date object.
 * @return {function: Date}
 */
export default () => (input) => {
    let date = moment(input);
    return date.toDate();
  };
