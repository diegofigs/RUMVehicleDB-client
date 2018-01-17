export default class NotificationService {
  constructor($http, $log, AuthService, API) {
    this.$http = $http;
    this.$log = $log;
    this.authService = AuthService;
    this.API = API;
    this.resource = '/api/v1/dashboard/notifications/';
  }

  getNotifications() {
    return this.$http.get(this.API + this.resource)
      .then((response) => {
        this.$log.log(response);
        this.notifications = response.data.notifications;
        if(this.authService.getUser().user_type_name === 'admin'){
          this.justified_notifications_count = response.data.justified_notifications_count;
        }
        else{
          this.unread_notifications_count = response.data.unread_notifications_count;
        }
        return this.notifications;
      });
  }

  justifyNotification(notification) {
    return this.$http.put(this.API + this.resource + notification.id, notification)
      .then((response) => {
        this.$log.log(response);
      })
  }
}
