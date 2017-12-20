import moment from 'moment';

export default () => (input) => {
    let date = moment(input);
    return date.toDate();
  };
