export default class NotificationService {
  constructor($http, $log, API) {
    this.$http = $http;
    this.$log = $log;
    this.API = API;
    this.resource = '/api/v1/dashboard/notifications/';
  }

  getNotifications() {
    return this.$http.get(this.API + this.resource)
      .then((response) => {
        this.$log.log(response);
        this.notifications = response.data.notifications;
        this.unread_notifications_count = response.data.notifications.unread_notifications_count;
      });
  }

  justifyNotification(notification) {
    return this.$http.put(this.API + this.resource + notification.id, notification)
      .then((response) => {
        this.$log.log(response);
      })
  }
}
