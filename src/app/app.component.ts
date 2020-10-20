import { Component } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken, StatusBarStyle } from '@capacitor/core';
import { Router } from '@angular/router';
import { PushService } from './push.service';
const { StatusBar, SplashScreen, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private _pushService: PushService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: StatusBarStyle.Light });
      SplashScreen.hide();
      this.initPushNotifications();
    });
  }

  async initPushNotifications() {
    const result = await PushNotifications.requestPermission();
    if (result.granted) {
      PushNotifications.register()
    } else {
      // Show error message
    }

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log(token.value);
        alert('Push registration success, token: ' + token.value);
      });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      alert('Push received: ' + JSON.stringify(notification));
      // When app was opend
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      // When app has been opend by notification
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
}
