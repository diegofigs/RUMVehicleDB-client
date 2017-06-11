import moment from 'moment';
/**
 * Created by diegofigs on 2/26/17.
 */
export default () => (input) => {
    let date = moment(input);
    return date.toDate();
  };
