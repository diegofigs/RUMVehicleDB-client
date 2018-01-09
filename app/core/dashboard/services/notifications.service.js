export default class NotificationService {
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
    this.baseDomain = 'http://dev.uprm.edu/rumvehicles/api/v1';
    this.resource = '/dashboard/notifications';
  }

  getNotifications() {
    return this.$http.get(this.baseDomain + this.resource)
      .then((response) => {
        this.$log.log(response);
        this.notifications = response.data.notifications;
        this.unread_notifications_count = response.data.notifications.unread_notifications_count;
      });
  }
}
